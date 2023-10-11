import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Works from "./Pages/Works/Works.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Curriculum from "./Pages/Curriculum/Curriculum.jsx";
import PrivacyPolicy from "./Pages/Privacy_Cookie_Policy/Privacy_Policy.jsx";
import CookiePolicy from "./Pages/Privacy_Cookie_Policy/Cookie_Policy.jsx";
import NoPage from "./Pages/NoPages/NoPage.jsx";
import ExternalCommandBar from "./components/External_Command_Bar/External_Command_Bar";

import ViewportProvider from "./components/External_Command_Bar/Responsive/Viewport_Provider.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ViewportProvider>
        <ExternalCommandBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="works" element={<Works />} />
          <Route path="contact" element={<Contact />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </ViewportProvider>
    </BrowserRouter>
  );
}
