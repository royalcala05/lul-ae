import fratCrestImg from "../assets/Frat_Crest.png";

const timeline = [
  {
    year: "1981",
    title: "La Unidad Latina begins",
    body:
      "Eleven Latino students at Cornell University organize to build brotherhood, unity, and cultural expression.",
  },
  {
    year: "1982",
    title: "Founding at Cornell",
    body:
      "On February 19, 1982, the Alpha line initiates the Alpha chapter at Cornell University in Ithaca, New York.",
  },
  {
    year: "1980s",
    title: "Early growth",
    body:
      "Expansion begins across New York, Pennsylvania, and Rhode Island, including SUNY campuses such as Buffalo and Binghamton.",
  },
  {
    year: "1986",
    title: "A pivotal moment",
    body:
      "The Beta chapter considers co-ed membership, inspiring the creation of a Latina sorority on campus.",
  },
  {
    year: "1988",
    title: "National milestone",
    body:
      "Lambda Upsilon Lambda becomes the first Latino interest fraternity incorporated at the national level.",
  },
  {
    year: "1990s",
    title: "35 new campuses",
    body:
      "The fraternity expands to 35 additional campuses across nine states and Washington, D.C.",
  },
  {
    year: "1999",
    title: "NALFO membership",
    body:
      "Lambda Upsilon Lambda joins the National Association of Latino Fraternal Organizations (NALFO).",
  },
  {
    year: "1999",
    title: "Alpha Epsilon founded",
    body:
      "The Alpha Epsilon Chapter of La Unidad Latina, Lambda Upsilon Lambda Fraternity, Inc. was founded here at the University of Virginia and at Virginia Commonwealth University on December 10th, 1999. Our chapter was begun by six young men that were seeking to build a unique space for themselves and others that they could call their own. They accomplished the goal of bridging the University, Latino, and other communities in the founding of a chapter of La Unidad Latina. The founding Hermanos of the Alpha Epsilon Chapter were Salvadoran, African-American, Pakistani, Kenyan, Panamanian, and Jordanian. Even though they were ethnically, nationally, and religiously diverse, or perhaps because of that, they came together to give birth to a chapter of La Unidad Latina that would not only seek to address the needs of the Latino community, but those of many different communities as well.",
  },
  {
    year: "2000s–2020s",
    title: "National reach",
    body:
      "The fraternity grows to more than 30 campuses in 11 states, strengthening presence in the Southeast, Mid-Atlantic, Texas, and California.",
  },
  {
    year: "2006",
    title: "Community voice",
    body:
      "James Madison University hosts educator Jaime Escalante as a guest speaker.",
  },
  {
    year: "2008",
    title: "Alpha Psi chartered",
    body:
      "Hermanos of Alpha Epsilon and Hermanos at VCU initiate the Beta line of Alpha Psi, creating a new charter for those at VCU.",
  },
  {
    year: "2020–2022",
    title: "Honoring founders",
    body:
      "Founding Fathers Edwin Rivera and James Otto “Jim” Ziebell pass away, remembered for their lasting legacy.",
  },
];

export default function History() {
  return (
    <div className="history-page page-with-fixed-nav bg-sand">
      <section className="history-hero">
        <div className="container">
          <div
            className="history-hero-card"
            style={{ backgroundImage: `url(${fratCrestImg})` }}
          >
            <div className="history-hero-overlay" />
            <div className="history-hero-content">
              <p className="history-eyebrow">Our History</p>
              <h1>La Unidad Latina, Lambda Upsilon Lambda</h1>
              <p>
                A Latino and multicultural interest fraternity founded at Cornell
                University on February 19, 1982. Today, LUL includes 81 active
                undergraduate chapters and 17 graduate/professional alumni
                chapters across the United States.
              </p>
              <p>
                LUL is the only Latino and multicultural interest Greek-lettered
                organization chartered at all eight Ivy League universities and
                remains open to men of all races since its inception. It is a
                member of NALFO and the third oldest fraternal member by founding
                date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="history-story">
        <div className="container">
          <div className="history-story-grid">
            <div>
              <h2>Origins</h2>
              <p>
                LUL was founded during the post-1975 wave of the Latino Greek
                Movement. In the 1980s, Latino students built organizations where
                their voices could be heard and where they could increase Latino
                enrollment nationwide.
              </p>
            </div>
            <div>
              <h2>Establishment</h2>
              <p>
                In fall 1981, the club “La Unidad Latina” was registered at
                Cornell. By January 1982, it became a fraternity, culminating in
                the February 19 initiation of thirteen Founding Fathers.
              </p>
              <p>
                Founders: William Barba, Dennis De Jesus, Hernando Londoño, Jesse
                Luis, Samuel Ramos, Tomas Rincon, Edwin Rivera, Mario Rivera,
                Victor Rodriguez, Victor Silva, Jose Torres, Henry Villareal, and
                James Otto “Jim” Ziebell. Angel Montañez was later named an
                honorary father.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="history-timeline">
        <div className="container">
          <h2 className="history-section-title">Chapters Through Time</h2>
          <div className="history-line">
            {timeline.map((item, index) => (
              <div
                key={`${item.year}-${item.title}`}
                className={`history-event ${index % 2 ? "is-right" : "is-left"}`}
              >
                <div className="history-dot" />
                <div className="history-card">
                  <div className="history-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
