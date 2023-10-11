import "./menu.css";
import {
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import MenuGalaxyMap from "../MenuGalaxyMap/MenuGalaxyMap";
import logoSpaceJoeyMenu from "./logo_spacejoey_menu.svg";
import { TestContext } from "../Menu_Button/Menu_Button";

export default function MenuContent() {
  const logoRef = useRef(null);
  const menuParagraphRef = useRef(null);
  const columnMapRef = useRef(null);

  // creo un array di ref per i pulsanti
  const linksRef = useRef([]);
  linksRef.current = [];

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // uso react context per passare un boolean dall'elemento parent menu button
  const [
    menuController,
    setMenuController,
    internMenuController,
    setInternMenuController,
    internMenuBackgroundController,
    setInternMenuBackgroundController,
  ] = useContext(TestContext);

  // definisco la timenline
  const menuContent = useRef();
  const tl = useRef();

  // Rimuovo il Content
  function killTheMenu() {
    setInternMenuController(!internMenuController);
  }

  // creo l'animazione di partenza ed il suo reverse
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        onReverseComplete: killTheMenu,
        delay: 0.5,
      });
      tl.current
        .from(logoRef.current, { y: 50, opacity: 0, duration: 0.4 })
        .from(menuParagraphRef.current, { opacity: 0, duration: 0.4 }, "<")
        .from(columnMapRef.current, { opacity: 0, duration: 0.8 })
        .from(".galaxy-map-container", { width: "1px", duration: 0.8 }, "<")
        .from(".galaxy-map-container", { height: "1px", duration: 0.8 })
        .to(linksRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.2,
        });
    }, menuContent);
    return () => ctx.revert();
  }, []);

  // Innesco l'animazione di partenza ed il suo reverse
  useEffect(() => {
    tl.current.reversed(menuController);
  }, [menuController]);

  // RETURN
  return (
    <div ref={menuContent} className="container">
      <div className="row">
        <div className="col-5">
          <img
            ref={logoRef}
            className="logo-menu"
            src={logoSpaceJoeyMenu}
            alt="Logo Spacejoey"
          />
          <p ref={menuParagraphRef} className="paragraph-light menu-intro">
            Teletrasportati su uno dei pianeti cliccando sui pulsanti
            sottostanti, oppure pianifica il tuo viaggio galattico esaminando la
            mappa a fianco.
          </p>
          <nav className="navbar">
            <NavLink
              ref={addToLinksRef}
              className={({ isActive }) =>
                isActive ? "active menu-link" : "inactive menu-link"
              }
              to="/"
              style={{ opacity: 0, transform: "translateX(-50px)" }}
              onClick={() => {
                setMenuController(!menuController);
              }}
            >
              Home
            </NavLink>
            <NavLink
              ref={addToLinksRef}
              className={({ isActive }) =>
                isActive ? "active menu-link" : "inactive menu-link"
              }
              to="About"
              style={{ opacity: 0, transform: "translateX(-50px)" }}
              onClick={() => {
                setMenuController(!menuController);
              }}
            >
              About
            </NavLink>
            <NavLink
              ref={addToLinksRef}
              className={({ isActive }) =>
                isActive ? "active menu-link" : "inactive menu-link"
              }
              to="Works"
              style={{ opacity: 0, transform: "translateX(-50px)" }}
              onClick={() => {
                setMenuController(!menuController);
              }}
            >
              Works
            </NavLink>
            <NavLink
              ref={addToLinksRef}
              className={({ isActive }) =>
                isActive ? "active menu-link" : "inactive menu-link"
              }
              to="Contact"
              style={{ opacity: 0, transform: "translateX(-50px)" }}
              onClick={() => {
                setMenuController(!menuController);
              }}
            >
              Contact
            </NavLink>
          </nav>
        </div>
        <div ref={columnMapRef} className="col-7 separator-map">
          <MenuGalaxyMap />
        </div>
      </div>
    </div>
  );
}
