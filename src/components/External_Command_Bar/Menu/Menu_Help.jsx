import "./menu.css";
import { useRef, useEffect, useContext, useLayoutEffect } from "react";
import { gsap } from "gsap";
import MenuContentHelp from "./Help_Menu_Content";
import { HelpContext } from "../Menu_Button/Help_Button";

export default function MenuHelp(props) {
  const navigationMenu = useRef(null);
  const isFirstRender = useRef(true);
  const tl = useRef();

  // Importo il context in react
  const [menuController, setMenuController, internMenuController, setInternMenuController, internMenuBackgroundController, setInternMenuBackgroundController] = useContext(HelpContext);

  // Rimuovo il Background
  function killTheBackground(){
    setInternMenuBackgroundController(!internMenuBackgroundController);
  }

  // Inserisco il Background
  function dropTheMenu(){
    setInternMenuController(!internMenuController)
  }

  // creo l'animazione di partenza ed il suo reverse
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({ onComplete: dropTheMenu, onReverseComplete: killTheBackground, delay: 0.2 });
      tl.current.from(navigationMenu.current, {
        duration: 0.4,
        y: "-300px",
        opacity: 0,
      });
    });
    return () => ctx.revert();
  }, []);

  // Innesco l'animazione di partenza ed il suo reverse
  useEffect(() => {
    if(internMenuController === true){
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      tl.current.reversed(internMenuController);
    }
  }, [internMenuController])

  return (
    <section ref={navigationMenu} className="navigation-menu">
     {internMenuController === false ? <MenuContentHelp /> : ""}
    </section>
  );
}
