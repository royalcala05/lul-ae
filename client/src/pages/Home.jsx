import { NavLink } from "react-router-dom";
import Pillars from "../components/Pillars";
import EventsPreview from "../components/EventsPreview";

import probateImg from "../assets/2025_Probate.png";
import lulLettersImg from "../assets/lul_letters 2.png";
// import aeLogoImg from "../assets/AE logo.png";
import foundersFlagImg from "../assets/founders_flag.png";
import crest_LULImg from "../assets/Crest_and_LUL.png";
// import mg from  "../assets/tabling.png";
// Example: call this when you click a theme button

// setTheme("theme-classic")

export default function Home() {
  return (
   
    
    <div className="bg-sand theme-classic">


      {/* HERO */}
      <section
        id="hero"
        className="position-relative overflow-hidden"
        style={{ minHeight: "70vh", paddingTop: "120px" }}
      >
        {/* Background photo */}
        <img
          src={probateImg}
          alt="Chapter photo"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: 0 }}
        />

        {/* Greek letters overlay (your PNG) */}
        <img
          src={lulLettersImg}
          alt=""
          className="position-absolute top-50 start-50"
          style={{
            transform: "translate(-50%, -50%)",
            width: "120%",
            maxWidth: "1400px",
            opacity: 0.35,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />

        {/* Dark overlay for readability */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,.35)", zIndex: 2 }}
        />

        {/* Content */}
      </section>

      {/* ABOUT / FOUNDERS SECTION (uses founders_flag.png) */}
      <section className="section-pad">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="lul-card p-3">
                <img
                  src={foundersFlagImg}
                  alt="Founders / historical photo"
                  className="w-100"
                  style={{ borderRadius: 18, objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <img src={crest_LULImg} alt="" style={{ width: "auto", height: 200, objectFit: "contain", fontFamily: "Georgia, 'Times New Roman', Times, serif" }} />
                <div className="text-muted small" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: "1.2rem", textAlign: "right"}}>Chartered on December 10th, 1999</div>
              </div>
              <h2 className="fw-bold" style={{ color: "var(--lul-brown)", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                The Agonizing Alpha Epsilon Chapter at the University of Virginia
              </h2>
              <p className="text-muted small" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                Thirteen visionary men founded La Unidad Latina, Lambda Upsilon Lambda Fraternity, Incorporated on February 19, 1982 at Cornell University, Ithaca, 
                New York.  Their Hermandad takes a role in meeting the needs of the Latino community through cultural awareness, community service, and the
                promotion of Latino culture and its diverse peoples. La Unidad Latina maintains a firm commitment to empower and enrich every community wherein 
                one finds Latinidad. To this end, our Fraternidad addresses key areas of concern to the Latino community
              </p>
              <NavLink className="btn btn-lul" to="/mission">
                Learn More
              </NavLink>
            </div>
            
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section-pad pt-0">
        <div className="container">
          <Pillars />
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="section-pad pt-0">
        <div className="container">
          <EventsPreview />
        </div>
      </section>

    </div>
  );
}
