import { FaDiscord, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import footerLettersImg from "../assets/footer_letters.png";
import footerCrestImg from "../assets/footer_lul_crest.png";

export default function SiteFooter() {
  // Paste your social links here.
  const LINKEDIN_URL = "";
  const INSTAGRAM_URL = "https://www.instagram.com/lul_ae/";

  return (
    <footer className="bg-brown text-white mt-5 position-relative overflow-hidden">
      <img
        src={footerLettersImg}
        alt=""
        aria-hidden="true"
        className="position-absolute top-50 start-50 translate-middle"
        style={{ width: "min(720px, 85vw)", opacity: 0.08 }}
      />

      <div className="container py-5 position-relative">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={footerCrestImg}
              alt="La Unidad Latina crest"
              style={{ width: 86, height: 86, objectFit: "contain" }}
            />
            <div className="ps-3" style={{ borderLeft: "2px solid var(--lul-gold)", maxWidth: 440 }}>
              <div className="text-uppercase fw-semibold" style={{ color: "var(--lul-gold)" }}>
                The Alpha Epsilon Chapter of
              </div>
              <div className="text-uppercase fw-semibold" style={{ color: "var(--lul-gold)" }}>
                La Unidad Latina, Lambda Upsilon Lambda Fraternity, Inc.
              </div>
              <div className="small" style={{ color: "var(--lul-gold)" }}>
                Providing access to higher education since December 10, 1999
              </div>
            </div>
          </div>

          <div className="text-lg-end">
            <div className="fw-semibold mb-2" style={{ color: "var(--lul-gold)" }}>
              Connect with us!
            </div>
            <div className="d-flex justify-content-lg-end gap-3 fs-3">
              <a href="#" className="text-decoration-none" style={{ color: "var(--lul-gold)" }} aria-label="Discord">
                <FaDiscord />
              </a>
              <a href="#" className="text-decoration-none" style={{ color: "var(--lul-gold)" }} aria-label="X">
                <FaXTwitter />
              </a>
              <a
                href={LINKEDIN_URL || "#"}
                className="text-decoration-none"
                style={{ color: "var(--lul-gold)" }}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={INSTAGRAM_URL || "#"}
                className="text-decoration-none"
                style={{ color: "var(--lul-gold)" }}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
