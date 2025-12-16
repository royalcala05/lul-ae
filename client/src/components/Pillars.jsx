import academicsImg from "../assets/academics.png";
import serviceImg from "../assets/middle_school_donation.png";
import brotherhoodImg from "../assets/tabling.png";
import cultureImg from "../assets/culture.png";

const pillars = [
  { title: "Service", body: "Short description of service pillar.", img: serviceImg },
  { title: "Academics", body: "Short description of academics pillar.", img: academicsImg },
  { title: "Brotherhood", body: "Short description of brotherhood pillar.", img: brotherhoodImg },
  { title: "Culture", body: "Short description of culture pillar.", img: cultureImg },
];

export default function Pillars() {
  return (
    <div className="row g-4 align-items-stretch">
      {pillars.map((p) => (
        <div key={p.title} className="col-12 col-md-6 col-lg-3">
          <div className="lul-card hover-lift h-100 p-0 overflow-hidden">
            {/* Top image area */}
            <div style={{ height: 180, background: "#e9e7e3" }}>
              <img
                src={p.img}
                alt={p.title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Gold bottom area */}
            <div style={{ background: "var(--lul-gold)" }} className="p-4">
              <div
                className="fw-bold text-uppercase"
                style={{ color: "#3a250f", letterSpacing: ".06em" }}
              >
                {p.title}
              </div>
              <div className="small mt-2" style={{ color: "#3a250f", opacity: 0.9 }}>
                {p.body}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
