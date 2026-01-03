import fratCrestImg from "../assets/Frat_Crest.png";

const inductionPaths = [
  {
    title: "Undergraduate induction",
    body:
      "Interested gentlemen may apply as undergraduate students in good standing at a fully accredited four-year college or university.",
  },
  {
    title: "Professional (Alumni) induction",
    body:
      "Interested gentlemen may apply for membership into an alumni chapter as graduates who have earned a degree from a fully accredited four-year college or university.",
  },
  {
    title: "Honorary induction",
    body:
      "Honorary inductees are selected by the legislative body at Lambda Upsilon Lambda's yearly National Conference.",
  },
];

const undergradRequirements = [
  "Matriculation in an accredited four-year, degree-granting institution of higher education.",
  "Attend at least two informationals.",
  "Meet GPA requirement: second semester freshman 3.0 / upper classman 2.8.",
  "Letter of recommendation from employer or university faculty.",
  "Sponsored by one active member.",
  "Complete the New Member Education application.",
  "Meet the institution's new member requirements.",
];

const professionalRequirements = [
  "Must have obtained a bachelor's degree from an accredited four-year institution.",
  "Obtain two letters of recommendation.",
  "Complete the New Member Education application.",
  "Sponsored by one active member.",
];

const faqItems = [
  {
    question: "Does La Unidad Latina have a sister sorority?",
    answer:
      "No. Although we have strong historic ties to some organizations, we are not constitutionally or otherwise affiliated with any other organization. La Unidad Latina is a non-partisan organization and respects all sororities regardless of Panhellenic affiliation.",
  },
  {
    question: "How long is the New Member Education process?",
    answer:
      "The length and duration varies upon several factors. The chapter of origin and pledge class are the prominent determinants of the process.",
  },
  {
    question: "Do you haze?",
    answer:
      "We do not physically or mentally abuse or degrade our Caballeros. Although our process is challenging, we do not believe brotherhood can be built upon humiliation or degradation. We adhere to strict anti-hazing policies.",
  },
  {
    question: "Are you Latino exclusive?",
    answer:
      "No. La Unidad Latina is a Latino and multicultural interest fraternity open to men of all races who share our values and mission.",
  },
  {
    question: "Who should I contact for more information?",
    answer:
      "Please contact your respective university chapter members. If no chapter exists at your college or university, contact us at expansion@launidadlatina.org.",
  },
];

export default function Faq() {
  return (
    <div className="faq-page page-with-fixed-nav bg-sand">
      <section className="faq-hero">
        <div className="container">
          <div
            className="faq-hero-card"
            style={{ backgroundImage: `url(${fratCrestImg})` }}
          >
            <div className="faq-hero-overlay" />
            <div className="faq-hero-content">
              <p className="faq-eyebrow">Eligibility & FAQs</p>
              <h1>Membership & Induction</h1>
              <p>
                Lambda Upsilon Lambda has three ways to be inducted: undergraduate,
                professional (alumni), and honorary. We are a Latino and multicultural
                interest fraternity and are not Latino exclusive.
              </p>
              <p>
                Honorary inductees are chosen by the legislative body at the yearly
                National Conference.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-section-header">
            <h2>Induction Paths</h2>
            <p>Choose the pathway that fits your current status and goals.</p>
          </div>
          <div className="faq-card-grid">
            {inductionPaths.map((path) => (
              <article key={path.title} className="faq-card">
                <h3>{path.title}</h3>
                <p>{path.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section faq-section-alt">
        <div className="container">
          <div className="faq-section-header">
            <h2>Requirements</h2>
            <p>Undergraduate and professional requirements are listed below.</p>
          </div>
          <div className="faq-req-grid">
            <article className="faq-req-card">
              <h3>Undergraduate</h3>
              <ul className="faq-list">
                {undergradRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="faq-req-card">
              <h3>Professional</h3>
              <ul className="faq-list">
                {professionalRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Get quick answers to the most common questions.</p>
          </div>
          <div className="faq-qa-grid">
            {faqItems.map((item) => (
              <article key={item.question} className="faq-qa-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
