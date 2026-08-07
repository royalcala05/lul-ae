import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fratCrestImg from "../assets/Frat_Crest.png";
import { apiUrl } from "../lib/api";

const TAGS = ["Brotherhood", "Community", "Hermano Spotlight", "Volunteer"];
const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const CURRENT_YEAR = new Date().getFullYear();

const initialForm = {
  title: "",
  excerpt: "",
  body: "",
  tag: TAGS[0],
  season: SEASONS[0],
  year: String(CURRENT_YEAR),
  author: "",
};

export default function WritePost() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("loading");
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const authCheck = await fetch(apiUrl("/api/admin/me"), { credentials: "include" });
        if (!authCheck.ok) {
          if (alive) navigate("/admin/login?next=/brothers/write");
          return;
        }
        if (alive) setAuthStatus("ready");
      } catch {
        if (alive) navigate("/admin/login?next=/brothers/write");
      }
    })();
    return () => {
      alive = false;
    };
  }, [navigate]);

  if (authStatus === "loading") {
    return (
      <div className="admin-page page-with-fixed-nav bg-sand">
        <section className="admin-section">
          <div className="container">
            <div className="admin-panel">Checking session...</div>
          </div>
        </section>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus({ type: "error", message: "Please choose an image first." });
      return;
    }

    setStatus({ type: "loading", message: "Uploading image..." });

    try {
      const signRes = await fetch(apiUrl("/api/uploads/sign"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          folder: "blog",
        }),
      });
      if (!signRes.ok) {
        const data = await signRes.json().catch(() => ({}));
        throw new Error(data?.error || "Image upload failed.");
      }
      const { uploadUrl, publicUrl } = await signRes.json();

      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) {
        throw new Error("Image upload failed.");
      }

      if (!publicUrl) {
        throw new Error("Image uploaded, but the site isn't configured with a public image URL yet.");
      }

      setStatus({ type: "loading", message: "Publishing post..." });

      const postRes = await fetch(apiUrl("/api/blog-posts"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: publicUrl }),
      });

      if (!postRes.ok) {
        const data = await postRes.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to publish post.");
      }

      const { post } = await postRes.json();
      setStatus({ type: "success", message: "Published!" });
      navigate(`/blog/${post.slug}`);
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="admin-page page-with-fixed-nav bg-sand">
      <section className="admin-hero">
        <div className="container">
          <div
            className="admin-hero-card"
            style={{ backgroundImage: `url(${fratCrestImg})` }}
          >
            <div className="admin-hero-overlay" />
            <div className="admin-hero-content">
              <p className="admin-eyebrow">Hermanos Only</p>
              <h1>Write a Post</h1>
              <p>Share what your line or chapter has been up to — it publishes right to the blog.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="container">
          <div className="admin-panel">
            <form className="admin-login-form is-wide" onSubmit={handleSubmit}>
              <label>
                <span>Title</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={160}
                  required
                />
              </label>

              <label>
                <span>Excerpt (short teaser shown on the blog list)</span>
                <input
                  type="text"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  maxLength={280}
                  required
                />
              </label>

              <label>
                <span>Article (separate paragraphs with a blank line)</span>
                <textarea
                  name="body"
                  value={form.body}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="admin-form-row">
                <label>
                  <span>Tag</span>
                  <select name="tag" value={form.tag} onChange={handleChange}>
                    {TAGS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Author (optional)</span>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    maxLength={120}
                    placeholder="Your name or line"
                  />
                </label>
              </div>

              <div className="admin-form-row">
                <label>
                  <span>Season</span>
                  <select name="season" value={form.season} onChange={handleChange}>
                    {SEASONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Year</span>
                  <input
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    min={CURRENT_YEAR - 1}
                    max={CURRENT_YEAR + 1}
                    required
                  />
                </label>
              </div>

              <label>
                <span>Header Image</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </label>
              {file && (
                <div className="text-muted" style={{ fontSize: ".9rem" }}>
                  Selected: {file.name}
                </div>
              )}

              <button className="btn btn-lul" type="submit" disabled={status.type === "loading"}>
                {status.type === "loading" ? "Publishing..." : "Publish Post"}
              </button>
              {status.message && (
                <div className={`contact-status is-${status.type}`} role="status" aria-live="polite">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
