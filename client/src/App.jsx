import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

import Home from "./pages/Home";
import AlphaEpsilon from "./pages/AlphaEpsilon";
import Philanthropy from "./pages/Philanthropy";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Hermanos from "./pages/Hermanos";
import History from "./pages/History";
import Faq from "./pages/Faq";
import Mission from "./pages/Mission";
import AdminInquiries from "./pages/AdminInquiries";
import AdminLogin from "./pages/AdminLogin";
import AdminUploads from "./pages/AdminUploads";

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
        <Route path="/history" element={<History />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin/uploads" element={<AdminUploads />} />
        <Route path="/Hermanos" element={<Hermanos />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  );
}
