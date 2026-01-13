import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fratCrestImg from "../assets/Frat_Crest.png";
import { apiUrl } from "../lib/api";

 export default function AdminUploads() {
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: "idle", message: "" });
    const [authStatus, setAuthStatus] = useState("loading");
    const [file, setFile] = useState(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const authCheck = await fetch(apiUrl("/api/admin/me"), { credentials: "include" });
                if (!authCheck.ok && alive) {
                    navigate("/admin/login");
                    return;
                }
                if (alive) setAuthStatus("ready");
            } catch {
                if (alive) {
                    setAuthStatus("error");
                    navigate("/admin/login");
                }
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

    const handleUpload = async (e) => {
        e.preventDefault();
        // Require a file before attempting to sign or upload.
        if (!file) {
            setStatus({ type: "error", message: "Please select a file first." });
            return;
        }
        //request a presigned upload URL from the API.
        setStatus({ type: "loading", message: "Uploading..." });
        try {
            const signRes = await fetch(apiUrl("/api/uploads/sign"), {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });
            if (!signRes.ok) {
                throw new Error("Upload failed.");
            }
            const { uploadUrl } = await signRes.json();
            // Step 2: upload the file directly to S3 using the presigned URL.
            const putRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });
            if (!putRes.ok) {
                throw new Error("Upload failed.");
            }
            setStatus({ type: "success", message: "Upload successful." });
        } catch (error) {
            setStatus({
                type: "error",
                message: error?.message || "Upload failed.",
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
                            <p className="admin-eyebrow">Admin</p>
                            <h1>Upload Headshot</h1>
                            <p>Choose an image and send it straight to S3.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="admin-section">
                <div className="container">
                    <div className="admin-panel">
                        <form className="admin-login-form" onSubmit={handleUpload}>
                            <label>
                                <span>Headshot Image</span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </label>
                            <div className="text-muted" style={{ fontSize: ".9rem" }}>
                                JPG, PNG, WEBP, or GIF. Max size depends on your S3 policy.
                            </div>
                            <button className="btn btn-lul" type="submit" disabled={status.type === "loading"}>
                                {status.type === "loading" ? "Uploading..." : "Upload"}
                            </button>
                            {file && (
                                <div className="text-muted" style={{ fontSize: ".9rem" }}>
                                    Selected: {file.name}
                                </div>
                            )}
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
