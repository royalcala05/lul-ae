export default function EventsPreview() {
  const items = [
    { date: "05/22", title: "Puppys on the lawn", icon: "⏱️" },
    { date: "05/28", title: "Brotherhood dinner", icon: "🍽️" },
    { date: "06/02", title: "Philanthropy meeting", icon: "📌" },
  ];

  return (
    <div className="row g-4 align-items-start">
      <div className="col-lg-6">
        <div className="lul-card p-4">
          <div className="fw-semibold mb-3">May 2023</div>
          <div className="text-muted small">(Calendar UI placeholder — we’ll wire Google Calendar next.)</div>
          <div className="mt-3" style={{height:260, borderRadius:16, background:"#fff"}} />
        </div>
      </div>

      <div className="col-lg-6">
        <h2 className="fw-bold mb-4">Upcoming Events</h2>
        <div className="d-flex flex-column gap-3">
          {items.map((e) => (
            <div key={e.title} className="d-flex align-items-center justify-content-between px-4 py-3"
                 style={{background:"var(--lul-gold)", borderRadius:999}}>
              <div className="small fw-semibold">{e.date} {e.title}</div>
              <div>{e.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
