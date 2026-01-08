import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ellipseImg from "../assets/Ellipse 1.png";
import globeImg from "../assets/globe 1.png";
import crestBrandImg from "../assets/Crest_and_LUL.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function SiteNavbar() {
  
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
// Example: call this when you click a theme button


// setTheme("theme-classic")

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;

        // Always show near the very top
        if (y < 30) {
          setHidden(false);
        } else {
          // Add a small deadzone to prevent flicker
          if (dy > 8) setHidden(true);     // scrolling down -> hide
          else if (dy < -8) setHidden(false); // scrolling up -> show
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`lul-nav-wrap ${hidden ? "is-hidden" : ""}`}>
      <nav className="lul-nav-pill navbar navbar-expand-lg">
        <div className="container-fluid px-3 d-flex align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={crestBrandImg}
              alt="La Unidad Latina — Lambda Upsilon Lambda"
              style={{ height: 75, width: "auto", objectFit: "contain" }}
            />
          </NavLink>


          <button
            className="navbar-toggler border-0 ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#lulNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="lulNav">
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className = "nav-item"><NavLink className="nav-link" to="/hermanos">Hermanos</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/philanthropy">Philanthropy</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/history">Our History</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact us</NavLink></li>
            </ul>

            <div className="d-flex align-items-center gap-3 ms-lg-3" aria-hidden="true">
              <span className="border-0 bg-transparent p-0">
                <img src={ellipseImg} alt="" style={{ width: 34, height: 34 }} />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
