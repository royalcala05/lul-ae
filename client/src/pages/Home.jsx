import Pillars from "../components/Pillars";
import EventsPreview from "../components/EventsPreview";

import probateImg from "../assets/2025_Probate.png";
import lulLettersImg from "../assets/lul_letters 2.png";
import aeLogoImg from "../assets/AE logo.png";
import foundersFlagImg from "../assets/founders_flag.png";

export default function Home() {
  return (
    <div className="bg-sand">

      {/* HERO */}
      <section
        className="position-relative overflow-hidden"
        style={{ minHeight: "70vh" }}
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
        <div className="container py-5 text-white position-relative" style={{ zIndex: 3 }}>
          <div className="d-flex justify-content-center mb-3">
            {/* AE badge */}
            <img
              src={aeLogoImg}
              alt="AE Logo"
              style={{ width: 74, height: 74, objectFit: "contain" }}
            />
          </div>

          <h1 className="text-center fw-bold mb-1" style={{ letterSpacing: ".2em" }}>
            A.E.
          </h1>
          <div className="text-center small mb-3" style={{ opacity: 0.9 }}>
            Alpha Epsilon • University of Virginia
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <p className="small mb-0" style={{ opacity: 0.9 }}>
                Welcome copy / mission blurb goes here. Keep it ~2–3 sentences like your design.
              </p>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-lul-red">SALAAAAA</button>
          </div>
        </div>
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
                <img src={aeLogoImg} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
                <div className="text-muted small">Chartered on December 10th, 1999</div>
              </div>
              <h2 className="fw-bold" style={{ color: "var(--lul-brown)" }}>
                The Agonizing Alpha Epsilon Chapter at the University of Virginia
              </h2>
              <p className="text-muted small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.
              </p>
              <button className="btn btn-lul">Learn More</button>
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
