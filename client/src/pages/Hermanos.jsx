import defaultAvatar from "../assets/default-avatar.svg"; // or wherever yours lives
import headshotImage from "../assets/headshot.jpeg";
import leonImage from "../assets/leon.png";
import chrisImage from "../assets/chris.JPG";
const LINES = [
  {
    id: "alpha",
    line: "ALPHA LINE",
    term: "FALL 1999",
    motto: "Las Seis Caras de Solidaridad",
    hermanos: [
      "Hermano Elmer Orlando Campos",
      "Hermano Cameron Agyei DeBerry",
      "Hermano Muhammad Shoaib Khan Afridi",
      "Hermano Sakwa Sidney Bunyasi",
      "Hermano Eduardo Jose Gonzalez",
      "Hermano Fadi Bshara Shamma",
    ],
  },
  {
    id: "beta",
    line: "BETA LINE",
    term: "FALL 2000",
    motto: "El Orgullo de Fuerzas Unidas",
    hermanos: ["Hermano Carlos Augusto Williams"],
  },
  {
    id: "gamma",
    line: "GAMMA LINE",
    term: "SPRING 2001",
    motto: "Los Forjadores de Destinos",
    hermanos: [
      "Hermano Juan Carlos Lam",
      "Hermano John Christopher Villalobos",
      "Hermano Emmanuel Jeremy Smadja",
    ],
  },
  {
    id: "delta",
    line: "DELTA LINE",
    term: "SPRING 2004",
    motto: "El Soldado Determinado",
    hermanos: ["Hermano Tyrone Guy Jean"],
  },
  {
    id: "epsilon",
    line: "EPSILON LINE",
    term: "FALL 2004",
    motto: "El Guerrero Solitario",
    hermanos: ["Hermano Muhammad Sayeid Hassan Tahir"],
  },
  {
    id: "zeta",
    line: "ZETA LINE",
    term: "SPRING 2005",
    motto: "Los Soldados de Fe",
    hermanos: [
      "Hermano Carlos Ricardo Rodriguez",
      "Hermano Henry Jose Lopez",
      "Hermano Alejandro Carlos Vega",
      "Hermano Ernesto Javier Obando",
    ],
  },
  {
    id: "eta",
    line: "ETA LINE",
    term: "SPRING 2006",
    motto: "Los Cinco Elementos Ocultos de Dos Mundos",
    hermanos: [
      "Hermano Jeffrey Charles",
      "Hermano Andrew Stephen Robles",
      "Hermano Isaac Anthony Rodriguez",
      "Hermano Jason Nicklaus Puryear",
    ],
  },
  {
    id: "theta",
    line: "THETA LINE",
    term: "SPRING 2007",
    motto: "Los Libertadores Luminosos",
    hermanos: ["Hermano Patrick Anthony Martinez", "Hermano Gian Carlo Bustillo"],
  },
  {
    id: "iota",
    line: "IOTA LINE",
    term: "SPRING 2008",
    motto: "Os Sobreventes Valientes",
    hermanos: [
      "Hermano Andrius Ulices Guadamuz",
      "Hermano Alvaro Fountura Silva Neto",
    ],
  },
  {
    id: "kappa",
    line: "KAPPA LINE",
    term: "SPRING 2010",
    motto: "Los Triunfadores Inolvidables",
    hermanos: ["Hermano Wilson Christopher Ventura", "Hermano Ronald Bladhimir Hernandez"],
  },
  {
    id: "lambda",
    line: "LAMBDA LINE",
    term: "SPRING 2011",
    motto: "Las Voces Legendarias",
    hermanos: ["Hermano David Andre Tinta", "Hermano Kelvin Rafael Grullon"],
  },
  {
    id: "mu",
    line: "MU LINE",
    term: "SPRING 2013",
    motto: "El Gladiador Invencible",
    hermanos: ["Hermano Nicholas Jules Farias"],
  },
  {
    id: "nu",
    line: "NU LINE",
    term: "SPRING 2014",
    motto: "Las Caras del Sacrificio",
    hermanos: ["Hermano Cristian Jacobo Hernandez", "Hermano Andre Eduardo Sanabia"],
  },
  {
    id: "xi",
    line: "XI LINE",
    term: "SPRING 2015",
    motto: "El Castillo Impenetrable",
    hermanos: ["Hermano Jonathan Antonio Diaz"],
  },
  {
    id: "omicron",
    line: "OMICRON LINE",
    term: "SPRING 2019",
    motto: "Los Soles de Renacimiento",
    hermanos: ["Hermano Frank Lorenzo Valdez Leal", "Hermano Mauro Kevin Quiroga Claros"],
  },
  {
    id: "pi",
    line: "PI LINE",
    term: "SPRING 2021",
    motto: "Los Cuatro Pilares de Valor",
    hermanos: [
      "Hermano José Martín Sanchez",
      "Hermano Enmanuel José Baez Peña",
      "Hermano Rayness Ricardo Mollinedo-Rodriguez",
      "Hermano John Bryan Corado",
    ],
  },
  {
    id: "rho",
    line: "RHO LINE",
    term: "SPRING 2022",
    motto: "Los Hombres Renacentistas",
    hermanos: [
      "Hermano Bryan Osmar Contreras",
      "Hermano Daniel Ernesto Alvarenga Martinez",
      "Hermano Noel Ayala Gallo",
    ],
  },
  {
    id: "sigma",
    line: "SIGMA LINE",
    term: "FALL 2022",
    motto: "Los Guerreros de Raices Resilientes",
    hermanos: ["Hermano Irving Uriel Mendez Rivas", "Hermano Derek Jose Rodriguez Contreras"],
  },
  {
    id: "tau",
    line: "TAU LINE",
    term: "SPRING 2023",
    motto: "El Rostro del Futuro",
    hermanos: ["Hermano Sagar Kumar Dwivedy"],
  },
  {
    id: "upsilon",
    line: "UPSILON LINE",
    term: "SPRING 2024",
    motto: "Los Arquitectos del Destino",
    hermanos: [
        {
    name: "Roy Alcala",
    gradYear: "2027",
    major: "Computer Science",
    title: "Tech Consultant",
    company: "Ernst & Young",
    linkedin: "https://www.linkedin.com/in/roy-alcala/",
    headshot: headshotImage,
    bio: "sala",
  },
      {name: "Hermano Christopher Valencia Ventura", 
        gradYear: "2027",
        major: "Mechanical Engineering",
        title: "pito",
        company: "HEEHH",
        linkedin: "https://www.linkedin.com/in/christopher-ventura-9b4107244/",
        bio: "te voy a montar pija en la cara", 
        headshot: chrisImage
      },
      {name: "Hermano Leon Manuel Arceo", 
        headshot: leonImage, 
        bio: "i like taking pictures of people unconsentingly"
      },
      {name: "Hermano Brian Flores-Toribio"},
      {name: "Hermano Sebastián Andrés García-Colón"},
      {name: "Hermano Moisés Luna Tubbs"},
      {name: "Hermano César Antonio Martínez"},
      {name: "Hermano Hamdael Selim Eslaquit"},
    ],
  },
];

function HermanoCard({ hermano, badge }) {

const {
    name,
    gradYear,
    major,
    title,
    company,
    linkedin,
    email,
    headshot,
    bio,
} = hermano;
const safeName = typeof name === "string" ? name : "";

const parts = safeName
  .replace(/^Hermano\s+/i, "")
  .trim()
  .split(/\s+/)
  .filter(Boolean);

const initials =
  parts.length === 0 ? "H" :
  parts.length === 1 ? parts[0][0].toUpperCase() :
  (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();


  return (
    <div className="col-12 col-sm-6 col-lg-4">
      {/* flex column so button aligns */}
      <div className="alumni-card lul-card h-100 d-flex flex-column position-relative overflow-hidden">
        {/* badge */}
        <div className="alumni-badge position-absolute top-0 end-0 m-3">
          {badge}
        </div>

        <div className="p-4">
          {/* avatar */}
          <div className="d-flex justify-content-center mt-2">
            <div className="alumni-avatar">
            {headshot ? (
                <img className="alumni-avatar-img" src={headshot} alt={safeName} />
            ) : (
                <div className="alumni-avatar-fallback">{initials || "H"}</div>
            )}
            </div>
          </div>

          {/* name */}
          <h3 className="alumni-name text-center mt-3 mb-1">{safeName}</h3>

          {/* major / class */}
          {(major || gradYear) && (
            <div className="text-center alumni-sub">
              {major}
              {major && gradYear ? " • " : ""}
              {gradYear ? `Class of ${gradYear}` : ""}
            </div>
          )}

          {/* title + company */}
          {(title || company) && (
            <div className="text-center mt-3">
              {title && (
                <div className="fw-semibold" style={{ color: "var(--lul-gold)" }}>
                  {title}
                </div>
              )}
              {company && <div style={{ opacity: 0.95 }}>{company}</div>}
            </div>
          )}

          {/* bio */}
          {bio && (
            <p className="alumni-bio text-center mt-3 mb-0">
              {bio}
            </p>
          )}

          {/* icons */}
          {(linkedin || email) && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              {linkedin && (
                <a className="alumni-icon" href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
              )}
              {email && (
                <a className="alumni-icon" href={`mailto:${email}`} aria-label="Email">
                  <i className="bi bi-envelope-fill" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




export default function Hermanos() {
  return (
    <div className="theme-classic bg-sand">
      {/* HERO */}
      <section className="section-pad pt-5">
        <div className="container text-center">
          <h1 className="lul-h1 mb-3" style={{ color: "var(--lul-brown)" }}>
            Alumni by Line
          </h1>

          <p className="text-muted mx-auto" style={{ maxWidth: 760 }}>
            Our chapter’s history—organized by line. Click a line to jump.
          </p>

          {/* Jump chips */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {LINES.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="btn btn-sm btn-outline-lul"
              >
                {l.line.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LINES */}
      <section className="pb-5">
        <div className="container">
          {LINES.map((line, hermano_within_line) => (
            <div
              key={line.id}
              id={line.id}
              className={`py-5 ${hermano_within_line ? "border-top border-dark-subtle" : ""}`}
            >
              <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">
                <div>
                  <div
                    className="text-uppercase fw-bold"
                    style={{
                      color: "var(--lul-brown)",
                      letterSpacing: ".06em",
                    }}
                  >
                    {line.line} <span className="text-muted">({line.term})</span>
                  </div>
                  <div className="text-muted">{line.motto}</div>
                </div>

                <div
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: "var(--lul-gold)",
                    color: "#1a1a1a",
                    fontWeight: 700,
                  }}
                >
                  {line.line.split(" ")[0]}
                </div>
              </div>

              <div className="row g-4">
                {line.hermanos.map((h) => {
                    const hermanoObj = typeof h === "string" ? { name: h } : h;

                    return (
                    <HermanoCard
                        key={`${line.id}-${hermanoObj.name}`}
                        hermano={hermanoObj}
                        badge={line.line.split(" ")[0]}
                    />
                    );
                })}
                </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
