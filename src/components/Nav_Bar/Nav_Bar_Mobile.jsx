import logoSpacejoeyMobileMenu from "./logo-spacejoey-mobile-menu.svg";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useLayoutEffect } from "react";
import useMobileStore from "../../stores/mobileStore";
import { BsXLg } from "react-icons/bs";

export default function NavbarMobile({setMenuController, menuController, menuControllerRepo, setMenuControllerRepo}) {
  const logoRef = useRef(null);
  const menuMobileContainer = useRef(null);
  const screenHeight = useMobileStore((state) => state.screenHeight);

  const linksRef = useRef([]);
  linksRef.current = [];

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const closingButton = useRef(null)
  const menuParagraphRef = useRef(null);
  const tl = useRef();

  useEffect(() => {
    menuMobileContainer.current.style.height = `${screenHeight}px`;
  }, [screenHeight]);

  function killTheMenu() {
    setMenuController(!menuController);
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        onReverseComplete: killTheMenu,
        delay: 0.5,
      });
      tl.current
        .from(menuMobileContainer.current, { transform: "scaleY(0)", opacity: 0, duration: 0.4 })
        .from(logoRef.current, { y: 50, opacity: 0, duration: 0.4 })
        .from(menuParagraphRef.current, { opacity: 0, duration: 0.4 }, "<")
        .to(linksRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.2,
        })
        .from(closingButton.current, {opacity: 0, y: 50, duration: 0.4}, "<");
    }, menuMobileContainer);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    menuControllerRepo ? tl.current.reversed(true) : "";
  }, [menuControllerRepo]);

  return (
    <div ref={menuMobileContainer} className="navbar-mobile-container">
      <button
            ref={closingButton}
            className="single-card-closing"
            onClick={() => setMenuControllerRepo(true)}
          ><BsXLg /></button>
      <img
        ref={logoRef}
        className="logo-menu"
        src={logoSpacejoeyMobileMenu}
        alt="Logo Spacejoey"
      />
      <p ref={menuParagraphRef} className="paragraph-light menu-intro">
        Teletrasportati su uno dei pianeti cliccando sui pulsanti sottostanti.
      </p>
      <nav className="navbar-mobile navbar">
        <NavLink
          ref={addToLinksRef}
          className={({ isActive }) =>
            isActive ? "active menu-link" : "inactive menu-link"
          }
          style={{ opacity: 0, transform: "translateX(-80px)" }}
          onClick={() => setMenuControllerRepo(true)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          ref={addToLinksRef}
          className={({ isActive }) =>
            isActive ? "active menu-link" : "inactive menu-link"
          }
          style={{ opacity: 0, transform: "translateX(-80px)" }}
          onClick={() => setMenuControllerRepo(true)}
          to="About"
        >
          About
        </NavLink>
        <NavLink
          ref={addToLinksRef}
          className={({ isActive }) =>
            isActive ? "active menu-link" : "inactive menu-link"
          }
          style={{ opacity: 0, transform: "translateX(-80px)" }}
          onClick={() => setMenuControllerRepo(true)}
          to="Works"
        >
          Works
        </NavLink>
        <NavLink
          ref={addToLinksRef}
          className={({ isActive }) =>
            isActive ? "active menu-link" : "inactive menu-link"
          }
          style={{ opacity: 0, transform: "translateX(-80px)" }}
          onClick={() => setMenuControllerRepo(true)}
          to="Contact"
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
}
