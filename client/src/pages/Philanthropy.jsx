import { NavLink } from "react-router-dom";
import fratCrestImg from "../assets/Frat_Crest.png";
import supplyDriveImg from "../assets/supply_drive.jpeg";
import patheWorkshopImg from "../assets/pathe_workshop.jpeg";
import ssp from "../assets/ssp_workshop.png";
const patheEvents = [
  {
    title: "College Day Event with the SSP Coalition",
    date: "4/15/25",
    description:
      "La Unidad Latina, Lambda Upsilon Lambda Fraternity Inc. partnered with local organizations to support students from Charlottesville high schools.",
    image: ssp,
  },
  {
    title: "Career Workshop at Monticello High School",
    date: "10/21/24",
    description:
      "Brothers hosted a career workshop with students, sharing practical advice and mentorship.",
    image: patheWorkshopImg,
  },
  {
    title: "School Supply Drive",
    date: "10/15/24",
    description:
      "We fundraised and donated school supplies for middle school students in need.",
    image: supplyDriveImg,
  },
];

export default function Philanthropy() {
  return (
    <div className="pathe-page page-with-fixed-nav">
      <section className="pathe-hero">
        <div className="container">
          <img className="pathe-crest" src={fratCrestImg} alt="Pathe crest" />
          <h1 className="pathe-title">Pathe</h1>
          <p className="pathe-lede">
            The P.A.T.H.E. initiative (Providing Access to Higher Education) is a college focused initiative that is tailored to support Middle School/ High school 
            students in their quest to graduate from a four year college. Our program will support local schools and organizations
            by mentoring future scholars, facilitating college/university tours, providing P.A.T.H.E. initiative workshops and
            advocating for the improvement of our educational system. Hermanos participating in the P.A.T.H.E. will play a key role
            by providing scholars with the social,
            educational and emotional support needed to reach these goals.
          </p>
          <NavLink className="btn btn-lul-red mt-3" to="/contact">
            Interested in supporting?
          </NavLink>
        </div>
      </section>

      <section className="pathe-events">
        <div className="container">
          <h2 className="pathe-section-title">Recent Pathe Events</h2>
          <div className="row g-4 mt-2">
            {patheEvents.map((event) => (
              <div key={event.title} className="col-md-6 col-lg-4 d-flex">
                <article className="pathe-event-card">
                  {event.image ? (
                    <img className="pathe-event-image" src={event.image} alt={event.title} />
                  ) : (
                    <div className="pathe-event-placeholder" aria-hidden="true" />
                  )}
                  <div className="pathe-event-body">
                    <div className="pathe-event-meta">{event.date}</div>
                    <h3 className="pathe-event-title">{event.title}</h3>
                    <p className="pathe-event-desc">{event.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
          </div>
        </div>
      </section>

      <section className="pathe-mission">
        <div className="container">
          <h2 className="pathe-section-title text-light">Our Mission</h2>
          <p className="pathe-mission-text">
            Latino men and women remain significantly underrepresented in higher education. Despite being one of the 
            fastest-growing demographics in the United States, Latino students often face barriers such as limited access 
            to college resources, lack of mentorship, financial hardships, and cultural or familial pressures. 
            These challenges contribute to lower enrollment and graduation rates at four-year institutions. Our P.A.T.H.E. 
            initiative was created to help close this gap by equipping middle and high school students with the knowledge, 
            tools, and mentorship they need to navigate the path to college and beyond.
          </p>
          <div className="row g-4 mt-4">
            <div className="col-6 col-md-4">
              <div className="pathe-stat">20.9%</div>
              <div className="pathe-stat-label">of U.S. adults are Latino</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="pathe-stat">19%</div>
              <div className="pathe-stat-label">of undergraduates are Latino</div>
            </div>
            <div className="col-6 col-md-4">
              <div className="pathe-stat">6.89%</div>
              <div className="pathe-stat-label">of Latinos hold a PhD</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
