import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.from(footerRef.current, { duration: 0.4, y: 100, opacity: 0 });
  }, []);

  return (
    <footer ref={footerRef} className="footer-container">
      <span className="footer-arrow footer-arrow-right"></span>
      <div className="main-footer">
        <p> Francesco Bianciardi | P.IVA : 05484680482 </p>
        <p>
          <NavLink
            to="privacy-policy"
          >
            Privacy Policy
          </NavLink>{" "}
          <NavLink
            to="cookie-policy"
          >
            Cookie Policy
          </NavLink>
        </p>
      </div>
      <span className="footer-arrow footer-arrow-left"></span>
    </footer>
  );
}
