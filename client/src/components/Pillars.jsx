import academicsImg from "../assets/academics.png";
import serviceImg from "../assets/middle_school_donation.png";
import brotherhoodImg from "../assets/tabling.png";
import cultureImg from "../assets/culture.png";

const pillars = [

  { title: "Service", body: "We  believe every individual should strive to positively affect society. La Fraternidad shall devote itself to serving the community. Our P.A.T.H.E. initiative is a college-focused initiative focused on empowering middle school/high school students from underserved backgrounds  in their quest to attending and graduating from four-year colleges", img: serviceImg },
  { title: "Academics", body: "We believe academic excellence is foundationally important for the advancement of our community. Meeting and exceeding GPA requirements can have a lasting impact when competing for career opportunities, applying to leading graduate schools, or when being considered for merit-based fellowships.", img: academicsImg },
  { title: "Brotherhood", body: "We believe brotherhood, the embodiment of unity, friendship, and spirit, is the ideal which should guide our actions both as an organization and as individuals.", img: brotherhoodImg },
  { title: "Culture", body: "We believe culture links us with our past, defines our present, and provides direction for our future. La Fraternidad shall encourage each Hermano to learn, maintain, and promote the richness of all our histories, languages, and traditions.", img: cultureImg },
];

export default function Pillars() {
  return (
    <div className="row g-4 align-items-stretch">
      {pillars.map((p) => (
        <div key={p.title} className="col-12 col-md-6 col-lg-3">
          {/* Added d-flex and flex-column so the gold section can grow */}
          <div className="lul-card hover-lift h-100 p-0 overflow-hidden d-flex flex-column border-0">
            
            {/* Top image area */}
            <div style={{ height: 220 }}> 
              <img
                src={p.img}
                alt={p.title}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Gold bottom area*/}
            <div 
              style={{ background: "var(--lul-gold)", flexGrow: 1 }} 
              className="p-4 d-flex flex-column"
            >
              <h3
                className="fw-bold text-uppercase mb-0"
                style={{ 
                  color: "#3a250f", 
                  letterSpacing: ".06em", 
                  fontSize: "1.2rem" 
                }}
              >
                {p.title}
              </h3>
              <p 
                className="mt-3" 
                style={{ 
                  color: "#211c16", 
                  lineHeight: "1.6",
                  fontSize: "0.95rem"
                }}
              >
                {p.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
