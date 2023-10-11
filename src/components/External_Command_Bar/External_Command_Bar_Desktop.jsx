import { useLocation } from "react-router-dom";
import Header from "./Header/HeaderComponent";
import Footer from "./Footer/FooterComponent";
import MenuButton from "./Menu_Button/Menu_Button";
import BackToSpaceButton from "./Back_to_Space_Button/Back_to_Space_Button";
import MouseGalaxy1 from "../Cursors/Cursor_Planet_Navigation_1";
import HelpButton from "./Menu_Button/Help_Button";

export default function ExternalCommandBarDesktop() {
  const location = useLocation();

  return (
    <>
      <Header />
      <MenuButton />
      <MouseGalaxy1 />
      {location.pathname !== '/' && <BackToSpaceButton />}
      {location.pathname == '/' && <HelpButton />}
      <Footer />
    </>
  );
}
