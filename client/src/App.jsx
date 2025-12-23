import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

import Home from "./pages/Home";
import AlphaEpsilon from "./pages/AlphaEpsilon";
import Philanthropy from "./pages/Philanthropy";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Hermanos from "./pages/Hermanos";

export default function App() {
  return (
    <BrowserRouter>
      <SiteNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alpha-epsilon" element={<AlphaEpsilon />} />
        <Route path="/philanthropy" element={<Philanthropy />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Hermanos" element={<Hermanos />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  );
}
