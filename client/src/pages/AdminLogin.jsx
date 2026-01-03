import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fratCrestImg from "../assets/Frat_Crest.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Signing in..." });

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Login failed.");
      }

      setStatus({ type: "success", message: "Signed in." });
      navigate("/admin/inquiries");
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to sign in.",
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
              <p className="admin-eyebrow">Admin Access</p>
              <h1>Sign In</h1>
              <p>Use your admin credentials to view contact inquiries.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="container">
          <div className="admin-panel">
            <form className="admin-login-form" onSubmit={handleSubmit}>
              <label>
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </label>
              <button className="btn btn-lul" type="submit" disabled={status.type === "loading"}>
                {status.type === "loading" ? "Signing in..." : "Sign In"}
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
