import { FaDiscord, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export default function SiteFooter() {
  return (
    <footer className="bg-brown text-white mt-5">
      <div className="container py-5 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
        <div className="d-flex align-items-center gap-3">
          {/* replace with crest */}
          <div style={{width:86,height:86,borderRadius:18,background:"#EEAA00"}} />
          <div style={{maxWidth:420}}>
            <div className="text-uppercase fw-semibold" style={{color:"#EEAA00"}}>The Alpha Epsilon Chapter of</div>
            <div className="text-uppercase fw-semibold" style={{color:"#EEAA00"}}>La Unidad Latina, Lambda Upsilon Lambda Fraternity, Inc.</div>
            <div className="small" style={{color:"#EEAA00"}}>Providing access to higher education since December 10, 1999</div>
          </div>
        </div>

        <div className="text-md-end">
          <div className="fw-semibold mb-2" style={{color:"#EEAA00"}}>Connect with us!</div>
          <div className="d-flex justify-content-md-end gap-3 fs-3">
            <a href="#" className="text-decoration-none" style={{color:"#EEAA00"}} aria-label="Discord"><FaDiscord/></a>
            <a href="#" className="text-decoration-none" style={{color:"#EEAA00"}} aria-label="X"><FaXTwitter/></a>
            <a href="#" className="text-decoration-none" style={{color:"#EEAA00"}} aria-label="LinkedIn"><FaLinkedinIn/></a>
            <a href="#" className="text-decoration-none" style={{color:"#EEAA00"}} aria-label="Instagram"><FaInstagram/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
