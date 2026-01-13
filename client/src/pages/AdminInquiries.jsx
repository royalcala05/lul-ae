import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fratCrestImg from "../assets/Frat_Crest.png";
import { apiUrl } from "../lib/api";

export default function AdminInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState({ type: "loading", message: "" });

  useEffect(() => {
    let isMounted = true;

    const loadInquiries = async () => {
      try {
        const authCheck = await fetch(apiUrl("/api/admin/me"), { credentials: "include" });
        if (!authCheck.ok) {
          if (isMounted) {
            navigate("/admin/login");
          }
          return;
        }
        const response = await fetch(apiUrl("/api/inquiries"), { credentials: "include" });
        if (!response.ok) {
          throw new Error("Unable to load inquiries.");
        }
        const data = await response.json();
        if (isMounted) {
          setInquiries(Array.isArray(data.inquiries) ? data.inquiries : []);
          setStatus({ type: "success", message: "" });
        }
      } catch (error) {
        if (isMounted) {
          setStatus({
            type: "error",
            message: error?.message || "Unable to load inquiries.",
          });
        }
      }
    };

    loadInquiries(); //this loads inquiries on component mount
    return () => {
      isMounted = false;
    };
  }, [navigate]);

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
              <p className="admin-eyebrow">Admin</p>
              <h1>Contact Inquiries</h1>
              <p>View recent contact submissions from the website form.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="container">
          <div className="admin-panel">
            {status.type === "loading" && <p>Loading inquiries...</p>}
            {status.type === "error" && <p>{status.message}</p>}
            {status.type === "success" && inquiries.length === 0 && (
              <p>No inquiries yet.</p>
            )}
            {inquiries.length > 0 && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((item) => (
                      <tr key={item.id}>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>
                          {[item.firstName, item.lastName].filter(Boolean).join(" ") || "N/A"}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone || "N/A"}</td>
                        <td className="admin-message">{item.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
