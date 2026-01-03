import fratCrestImg from "../assets/Frat_Crest.png";

const missionPillars = [
  "Provide Latino students with the academic, cultural, and social support necessary to excel in institutions of higher learning.",
  "Increase opportunities for Latino children and adolescents to achieve in elementary and secondary schools.",
  "Develop leaders that shall provide, develop, and implement the tools for community empowerment.",
  "Inspire ethnic pride and cultural awareness in the Latino community.",
  "Support the efforts to enhance the growth and well-being of the Latino community.",
  "Collaborate with individuals, organizations, and institutions that will join our efforts to improve the conditions of the Latino community.",
];

export default function Mission() {
  return (
    <div className="mission-page page-with-fixed-nav bg-sand">
      <section className="mission-hero">
        <div className="container">
          <div
            className="mission-hero-card"
            style={{ backgroundImage: `url(${fratCrestImg})` }}
          >
            <div className="mission-hero-overlay" />
            <div className="mission-hero-content">
              <p className="mission-eyebrow">Mission Statement</p>
              <h1>La Unidad Latina, Lambda Upsilon Lambda</h1>
              <p>
                La Unidad Latina, Lambda Upsilon Lambda Fraternity, Incorporated
                primarily seeks to take a leadership role in meeting the needs of
                the Latino community through academic achievement, cultural
                awareness, community service, and promotion of the Latino culture
                and people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-section-header">
            <h2>Positioning Statement</h2>
            <p>
              La Unidad Latina Lambda Upsilon Lambda Fraternity, Incorporated
              strives to become the premier Latino Fraternity in the country. More
              specifically, we strive to become a nationally recognized Latino
              fraternal organization comprised of the best and brightest leaders
              committed to excellence in service and education.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section mission-section-alt">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card mission-card-wide">
              <h2>Fulfilling Our Mission</h2>
              <p>
                Since its inception in 1982, La Unidad Latina has remained on the
                vanguard of political and community empowerment by developing
                influential leaders that strive to exert knowledge and power into
                its peers in order to attain mutual success. We commit ourselves
                to academic excellence, leadership development, and cultural
                enlightenment, enhanced by a diverse cognizant membership. La
                Hermandad strives to preserve and promote an inclusive intellectual
                environment for its members, in addition to the general community.
              </p>
            </div>
            <div className="mission-card">
              <h3>In the execution of its conceived mission, La Unidad Latina will:</h3>
              <ul className="mission-list">
                {missionPillars.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
