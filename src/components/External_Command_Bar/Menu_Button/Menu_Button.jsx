import { useState, useRef, createContext, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { BsSliders, BsXLg } from "react-icons/bs";
import "./menu-button.css";
import Menu from "../Menu/Menu";
import useInterfaceSetting from "../../../stores/interfaceStore";

// Creo il context in react
export const TestContext = createContext();

export default function MenuButton() {
  // Registro i tasti

  const setControlsEnabled = useInterfaceSetting(
    (state) => state.setControlsEnabled
  );
  const mainMenuController = useInterfaceSetting(
    (state) => state.mainMenuController
  );
  const setHelpMenuController = useInterfaceSetting(
    (state) => state.setHelpMenuController
  );

  const [menuController, setMenuController] = useState(true);
  const [internMenuController, setInternMenuController] = useState(true);
  const [internMenuBackgroundController, setInternMenuBackgroundController] =
    useState(true);
  const menuButton = useRef(null);
  const isFirstRender = useRef(true);

  // Animazione Pulsante
  useEffect(() => {
    // Non eseguire il primo rendering
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Animazione
    let ctx = gsap.context(() => {
      const newBottomPosition = menuController === false ? "-300px" : "0px";
      const newMenuTextColor = menuController === false ? "var(--background-color)" : "var(--light-color)";
      const newMenuButtonColor =
        menuController === false
          ? "#ffffff"
          : "var(--background-control-color)";
      const newMenuButtonRotation = menuController === false ? 360 : 0;
      gsap.to(menuButton.current, {
        duration: 1,
        color: newMenuTextColor,
        y: newBottomPosition,
        backgroundColor: newMenuButtonColor,
        rotation: newMenuButtonRotation,
        transformOrigin: "center center",
        opacity: 1,
      });
    });
  }, [menuController]);

  // Trigger Animazione al clic
  const handleClick = () => {
    // Se sto aprendo
    if (menuController === true) {
      setMenuController(!menuController);
      setInternMenuBackgroundController(!internMenuBackgroundController);
      setHelpMenuController();
    } else {
      setMenuController(!menuController);
      setHelpMenuController();
    }

    setControlsEnabled();
  };

  // Trigger Animazione al clic su "E-key"
  const handleKeyDown = (event) => {
    if(event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA"){
      if (event.key === "e" || event.key === "E") {
        handleClick();
    }}
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const closingHelp = () => {
    setMenuController(true);
    setInternMenuBackgroundController(false);
    handleClick();
  };

  useEffect(() => {
    mainMenuController && !menuController ? closingHelp() : "";
  }, [mainMenuController]);

  useLayoutEffect(() => {
    gsap.from(menuButton.current, { duration: 0.4, x: -100, opacity: 0 });
  }, []);

  // RETURN
  return (
    <>
      <button
        ref={menuButton}
        className="interface-button menu-button"
        onClick={handleClick}
      >
        {menuController ? <BsSliders /> : <BsXLg />}
        <span>
          {menuController ? "Click 'E' to MENU" : "Click 'E' to CLOSE"}
        </span>
      </button>
      {internMenuBackgroundController === false ? (
        <TestContext.Provider
          value={[
            menuController,
            setMenuController,
            internMenuController,
            setInternMenuController,
            internMenuBackgroundController,
            setInternMenuBackgroundController,
          ]}
        >
          <Menu />
        </TestContext.Provider>
      ) : (
        ""
      )}
    </>
  );
}
