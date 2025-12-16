const pillars = [
  { title: "Service", body: "Short description of service pillar." },
  { title: "Academics", body: "Short description of academics pillar." },
  { title: "Brotherhood", body: "Short description of brotherhood pillar." },
  { title: "Culture", body: "Short description of culture pillar." },
];

export default function Pillars() {
  return (
    <div className="row g-4 align-items-stretch">
      {pillars.map((p) => (
        <div key={p.title} className="col-12 col-md-6 col-lg-3">
          <div className="lul-card hover-lift h-100 p-0 overflow-hidden">
            <div className="p-4" style={{minHeight:140}} />
            <div style={{background:"var(--lul-gold)"}} className="p-4">
              <div className="fw-bold text-uppercase" style={{color:"#3a250f", letterSpacing:".06em"}}>
                {p.title}
              </div>
              <div className="small mt-2" style={{color:"#3a250f", opacity:.9}}>
                {p.body}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
