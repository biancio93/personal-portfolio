import { NavLink } from "react-router-dom";

export default function FooterMobile() {
  return (
    <>
      <footer className="mobile-footer">
        <p>
          Francesco Bianciardi <br /> P.IVA : 05484680482
        </p>
        <p>
          <NavLink
            to="/privacy-policy"
          >
            Privacy Policy
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/cookie-policy"
          >
            Cookie Policy
          </NavLink>
        </p>
      </footer>
    </>
  );
}
