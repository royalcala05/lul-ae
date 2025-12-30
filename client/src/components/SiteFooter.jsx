import { FaDiscord, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import footerLettersImg from "../assets/footer_letters.png";
import footerCrestImg from "../assets/footer_lul_crest.png";

export default function SiteFooter() {
  // Paste your social links here.
  const LINKEDIN_URL = "";
  const INSTAGRAM_URL = "https://www.instagram.com/lul_ae/";

  return (
    <footer className="site-footer mt-5 position-relative overflow-hidden">
      <img
        src={footerLettersImg}
        alt=""
        aria-hidden="true"
        className="footer-letters position-absolute top-50 start-50 translate-middle"
      />

      <div className="container site-footer-inner position-relative">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <img src={footerCrestImg} alt="La Unidad Latina crest" className="site-footer-crest" />
            <div className="site-footer-brand-text">
              <div className="site-footer-name">La Unidad Latina</div>
              <div className="site-footer-name">Lambda Upsilon Lambda</div>
              <div className="site-footer-tagline">Alpha Epsilon Chapter</div>
            </div>
          </div>

          <div className="site-footer-columns">
            <div>
              <div className="site-footer-heading">About Us</div>
              <div className="site-footer-link">Mission</div>
              <div className="site-footer-link">History</div>
              <div className="site-footer-link">Newsletter</div>
            </div>
            <div>
              <div className="site-footer-heading">Support</div>
              <div className="site-footer-link">Contact</div>
              <div className="site-footer-link">Donate</div>
              <div className="site-footer-link">FAQs</div>
            </div>
            <div>
              <div className="site-footer-heading">Social</div>
              <div className="site-footer-link">Instagram</div>
              <div className="site-footer-link">LinkedIn</div>
              <div className="site-footer-link">YouTube</div>
            </div>
          </div>
        </div>

        <div className="site-footer-divider" />

        <div className="site-footer-bottom">
          <div>© {new Date().getFullYear()} La Unidad Latina, Lambda Upsilon Lambda</div>
          <div>Terms of Service</div>
          <button
            className="site-footer-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
