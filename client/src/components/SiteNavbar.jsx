import { NavLink } from "react-router-dom";

import aeLogoImg from "../assets/AE logo.png";
import ellipseImg from "../assets/Ellipse 1.png";
import globeImg from "../assets/globe 1.png";

export default function SiteNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container py-2 d-flex align-items-center">

        {/* LEFT: Logo + name */}
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src={aeLogoImg}
            alt="AE Logo"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
          <div className="small">
            <div className="fw-bold" style={{ lineHeight: 1.1 }}>
              LA UNIDAD LATINA
            </div>
            <div className="text-muted" style={{ fontSize: 12, lineHeight: 1.1 }}>
              Lambda Upsilon Lambda
            </div>
          </div>
        </NavLink>

        {/* MOBILE TOGGLER (hidden on desktop) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#lulNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER: Nav links */}
        <div className="collapse navbar-collapse" id="lulNav">
          <ul className="navbar-nav mx-auto gap-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/alpha-epsilon">Alpha Epsilon</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/philanthropy">Philanthropy</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events">Events</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact us</NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT: Icons */}
        <div className="d-flex align-items-center gap-3">

          {/* Ellipse icon */}
          <button
            className="border-0 bg-transparent p-0"
            aria-label="Menu"
          >
            <img
              src={ellipseImg}
              alt=""
              style={{ width: 36, height: 36 }}
            />
          </button>

          {/* Globe icon */}
          <button
            className="border-0 bg-transparent p-0"
            aria-label="Language"
          >
            <img
              src={globeImg}
              alt="Language"
              style={{ width: 36, height: 36 }}
            />
          </button>

        </div>
      </div>
    </nav>
  );
}
