import { useState, useRef, createContext, useEffect } from "react";
import { gsap } from "gsap";
import { BsExclamationDiamondFill, BsXLg } from "react-icons/bs";
import "./menu-button.css";
import MenuHelp from "../Menu/Menu_Help";
import useInterfaceSetting from "../../../stores/interfaceStore";

// Creo il context in react
export const HelpContext = createContext();

export default function HelpButton() {
  // Registro i tasti

  const setControlsEnabled = useInterfaceSetting(
    (state) => state.setControlsEnabled
  );
  const helpMenuController = useInterfaceSetting(
    (state) => state.helpMenuController
  );
  const setMainMenuController = useInterfaceSetting(
    (state) => state.setMainMenuController
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
      setMainMenuController();
    } else {
      setMenuController(!menuController);
      setMainMenuController();
    }

    setControlsEnabled();
  };

  // Trigger Animazione al clic su "H-key"
  const handleKeyDown = (event) => {
    if (event.key === "h" || event.key === "H") {
      handleClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const closingMain = () => {
    setMenuController(true);
    setInternMenuBackgroundController(false);
    handleClick();
  };

  useEffect(() => {
    helpMenuController && !menuController ? closingMain() : "";
  }, [helpMenuController]);

  useEffect(() => {
    gsap.from(menuButton.current, {duration: 0.4, x: 100, opacity: 0})
  }, []);

  // RETURN
  return (
    <>
      <button
        ref={menuButton}
        className="interface-button help-button"
        onClick={handleClick}
      >
        {menuController ? <BsExclamationDiamondFill /> : <BsXLg />}
        <span>
          {menuController ? "Click 'H' to HELP" : "Click 'H' to CLOSE"}
        </span>
      </button>
      {internMenuBackgroundController === false ? (
        <HelpContext.Provider
          value={[
            menuController,
            setMenuController,
            internMenuController,
            setInternMenuController,
            internMenuBackgroundController,
            setInternMenuBackgroundController,
          ]}
        >
          <MenuHelp />
        </HelpContext.Provider>
      ) : (
        ""
      )}
    </>
  );
}
