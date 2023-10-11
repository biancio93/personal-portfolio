import gsap from "gsap";
import logoSpacejoeyMobile from "./logo-spacejoey-mobile.svg";
import { useLocation } from "react-router-dom";
import Battery from "./Battery/Battery";
import { useEffect, useRef, useState } from "react";
import useMobileStore from "../../stores/mobileStore";
import NavbarMobile from "../Nav_Bar/Nav_Bar_Mobile";
import MovementButton from "./Responsive/Movement_Button";
import LandingButton from "./Responsive/Landing_Button";

export default function ExternalCommandBarMobile() {
  const mobileScreen = useRef(null);
  const setScreenHeight = useMobileStore((state) => state.setScreenHeight);
  const lazyTrick = useMobileStore((state) => state.lazyTrick);
  const [menuController, setMenuController] = useState(true);
  const [menuControllerRepo, setMenuControllerRepo] = useState(true);
  const [isFirstRender, setFirstRender] = useState(true);
  const buttonMobileContainer = useRef();

  /* LOCATION */
  const location = useLocation();

  /* DIMENSIONE SCHERMO */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setScreenHeight(mobileScreen.current.clientHeight);
      setFirstRender(false);
    }, 400);
  }, []);

  useEffect(() => {
    isFirstRender === false
      ? setScreenHeight(mobileScreen.current.clientHeight)
      : "";
  }, [lazyTrick]);

  const handleClick = () => {
    if (menuController) {
      setMenuController(!menuController);
      setMenuControllerRepo(false);
    } else {
      setMenuControllerRepo(true);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      const container = buttonMobileContainer.current;
      isFirstRender === false ? gsap.from(container, { opacity: 0, y: 50, duration: 0.4, delay: 0.8 }) : "";
    }
  }, [location.pathname === "/"])


  return (
    <>
      {menuController === false ? (
        <NavbarMobile
          setMenuController={setMenuController}
          menuController={menuController}
          menuControllerRepo={menuControllerRepo}
          setMenuControllerRepo={setMenuControllerRepo}
        />
      ) : (
        ""
      )}
      <header className="mobile-header-container">
        <Battery />
        <div className="mobile-screen-container">
          <div ref={mobileScreen} className="mobile-screen">
          </div>
        </div>
        <img
          className="logo-header"
          src={logoSpacejoeyMobile}
          alt="Logo Spacejoey"
        />
        {location.pathname === "/" && (
          <div ref={buttonMobileContainer} className="button-mobile-container">
            <MovementButton />
            <LandingButton />
          </div>
        )}
        <div className="mobile-menu-button-container">
          <span onClick={handleClick}>
            <button
              className={
                menuController === false
                  ? "active-menu mobile-menu-button"
                  : "mobile-menu-button"
              }
            ></button>
            <h4>{menuController === false ? "CLOSE MENU" : "OPEN MENU"}</h4>
          </span>
        </div>
      </header>
    </>
  );
}
