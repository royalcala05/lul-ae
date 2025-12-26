import { useEffect, useState } from "react";

function formatEventDate(value) {
  if (!value) return "TBD";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";
  return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
}

export default function EventsPreview() {
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr("");
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (alive) setEvents(Array.isArray(data?.events) ? data.events : []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load events.");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="row g-4 align-items-start">
      <div className="col-lg-6">
        <div className="lul-card p-4">
          <div className="mt-3 ratio ratio-4x3" style={{ borderRadius: 16, overflow: "hidden" }}>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=e51b8157b7d5b09b2493c5a35c27365861cd0a419b9169920236a358220c89cf%40group.calendar.google.com&ctz=America%2FNew_York"
              title="Chapter Calendar"
              style={{ border: 0 }}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <h2 className="fw-bold mb-4">Upcoming Events</h2>
        <div className="d-flex flex-column gap-3">
          {events.map((e) => (
            <div key={e.title} className="d-flex align-items-center justify-content-between px-4 py-3"
                 style={{background:"var(--lul-gold)", borderRadius:999}}>
              <div className="small fw-semibold">
                {formatEventDate(e.start)} {e.title}
              </div>
              <div>📌</div>
            </div>
          ))}
          {!err && events.length === 0 && (
            <div className="text-muted small">No upcoming events found.</div>
          )}
          {err && <div className="text-muted small">{err}</div>}
        </div>
      </div>
    </div>
  );
}
