import logoSpacejoey from "./logoSpacejoey.svg";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import useInitialization from "../../../stores/initialization";
import { NavLink } from "react-router-dom";

export default function Header() {
  const headerRef = useRef(null);
  const tl = useRef();

  const setInitilization = useInitialization((state) => state.setInitilization);

  const completeInitialization = (() => {
    setInitilization(true);
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        onComplete: completeInitialization,
      });
      tl.current
      .from(headerRef.current, {duration: 0.4, y: -100, opacity: 0})
    });
    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="header-container">
        <span className="header-arrow header-arrow-right"></span>
        <div className="main-header">
        <NavLink to="/">
          <img
            className="logo-header"
            src={logoSpacejoey}
            alt="Logo Spacejoey"
          />
        </NavLink>
        </div>
        <span className="header-arrow header-arrow-left"></span>
    </header>
  );
}
