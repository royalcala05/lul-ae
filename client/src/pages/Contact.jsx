import { useState } from "react";
import fratCrestImg from "../assets/Frat_Crest.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to send your message.");
      }

      setStatus({ type: "success", message: "Thanks! We received your message." });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="contact-page page-with-fixed-nav bg-sand">
      <section className="contact-wrap">
        <div className="container">
          <div className="contact-card">
            <div
              className="contact-info"
              style={{ backgroundImage: `url(${fratCrestImg})` }}
            >
              <div className="contact-info-inner">
                <h2>Contact Us</h2>
                <p>
                  Reach out to the Alpha Epsilon Chapter. We’d love to hear from
                  you.
                </p>
                <div className="contact-detail">
                  <span className="contact-label">Address</span>
                  <span>University of Virginia, Charlottesville, VA</span>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Email</span>
                  <span>lambdas1982@gmail.com</span>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Phone</span>
                  <span>(571) 263-6521</span>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send Us A Message</h3>
              <form className="contact-form-grid" onSubmit={handleSubmit}>
                <label>
                  <span>Tell us your name</span>
                  <div className="contact-two">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <label>
                  <span>Enter your email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span>Enter phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(000) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Write us a message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button className="btn btn-lul" type="submit" disabled={status.type === "loading"}>
                  {status.type === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status.message && (
                  <div className={`contact-status is-${status.type}`} role="status" aria-live="polite">
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
