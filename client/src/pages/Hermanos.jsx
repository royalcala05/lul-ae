import { useEffect, useState } from "react";
import { apiUrl } from "../lib/api";

function HermanoCard({ hermano, badge }) {
  
  // allow either a string or an object (robust)
  const h = typeof hermano === "string" ? { name: hermano } : hermano;
  const {
    name = "",
    gradYear = "",
    major = "",
    title = "",
    company = "",
    linkedin = "",
    email = "",
    headshot = "",
    bio = "",
  } = h;

  const rawName = String(name || "").trim();
  const baseName = rawName.replace(/^(Hermano|H\.)\s*/i, "").trim();
  const displayName = /^(Hermano|H\.)\b/i.test(rawName)
    ? baseName
      ? `H. ${baseName}`
      : "H."
    : rawName;

  const parts = baseName.split(/\s+/).filter(Boolean);
  const initials =
    parts.length === 0
      ? "H"
      : parts.length === 1
        ? parts[0][0].toUpperCase()
        : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();

  return (
    <div className="col-12 col-sm-6 col-lg-4 d-flex">
      {/* d-flex on the column + h-100 + mt-auto pins button low */}
      <div className="lul-card h-100 w-100 d-flex flex-column position-relative overflow-hidden">
        <div className="position-absolute top-0 end-0 m-3 badge rounded-pill"
          style={{ background: "var(--lul-gold)", color: "#1a1a1a", fontWeight: 700 }}>
          {badge}
        </div>

        <div className="p-4">
          {/* avatar */}
          <div className="d-flex justify-content-center mt-2">
            <div className="alumni-avatar">
              {headshot ? (
                <img className="alumni-avatar-img" src={headshot} alt={displayName} />
              ) : (
                <div className="alumni-avatar-fallback">{initials || "H"}</div>
              )}
            </div>
          </div>

          <h3 className="text-center mt-3 mb-1">{displayName}</h3>

          {(major || gradYear) && (
            <div className="text-center text-muted">
              {major}
              {major && gradYear ? " • " : ""}
              {gradYear ? `Class of ${gradYear}` : ""}
            </div>
          )}

          {(title || company) && (
            <div className="text-center mt-3">
              {title && (
                <div className="fw-semibold" style={{ color: "var(--lul-gold)" }}>
                  {title}
                </div>
              )}
              {company && <div style={{ opacity: 0.95 }}>{company}</div>}
            </div>
          )}

          {bio && (
            <p className="text-center mt-3 mb-0" style={{ opacity: 0.85 }}>
              {bio}
            </p>
          )}

          {(linkedin || email) && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              {linkedin && (
                <a className="alumni-icon" href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
              )}
              {email && (
                <a className="alumni-icon" href={`mailto:${email}`} aria-label="Email">
                  <i className="bi bi-envelope-fill" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* pinned to bottom */}
        <div className="mt-auto px-4 pb-4">
          {email ? (
            <a className="btn btn-lul w-100 py-3" href={`mailto:${email}`}>
              Contact {baseName.split(" ")[0]}...
            </a>
          ) : (
            <button className="btn btn-lul w-100 py-3" disabled>
              Contact...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Hermanos() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
      
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(apiUrl("/api/alumni")); 
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        if (alive) setLines(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="theme-classic bg-sand page-with-fixed-nav">
      {/* HERO */}
      <section className="section-pad pt-5">
        <div className="container text-center">
          <h1 className="lul-h1 mb-3" style={{ color: "var(--lul-brown)" }}>
            Alumni by Line
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 760 }}>
            Our chapter’s history—organized by line. Click a line to jump.
          </p>

          {/* Jump chips */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {lines.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="btn btn-sm btn-outline-lul">
                {String(l.line || "").split(" ")[0]}
              </a>
            ))}
          </div>

          {loading && <div className="mt-4 text-muted">Loading alumni...</div>}
          {err && <div className="mt-4 alert alert-danger d-inline-block">{err}</div>}
        </div>
      </section>

      {/* LINES */}
      <section className="pb-5">
        <div className="container">
          {lines.map((l, idx) => (
            <div
              key={l.id}
              id={l.id}
              className={`py-5 ${idx ? "border-top border-dark-subtle" : ""}`}
            >
              <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">
                <div>
                  <div className="text-uppercase fw-bold"
                    style={{ color: "var(--lul-brown)", letterSpacing: ".06em" }}>
                    {l.line} <span className="text-muted">({l.term})</span>
                  </div>

                  {/* YOU SAID: motto -> lineName */}
                  <div className="text-muted">{l.lineName}</div>
                </div>

                <div className="badge rounded-pill px-3 py-2"
                  style={{ background: "var(--lul-gold)", color: "#1a1a1a", fontWeight: 700 }}>
                  {String(l.line || "").split(" ")[0]}
                </div>
              </div>

              <div className="row g-4 align-items-stretch">
                {(l.hermanos || []).map((h, i) => (
                  <HermanoCard
                    key={(typeof h === "string" ? h : h?.name) || `${l.id}-${i}`}
                    hermano={h}
                    badge={String(l.line || "").split(" ")[0]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
