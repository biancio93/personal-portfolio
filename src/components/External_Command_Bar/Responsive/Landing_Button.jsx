import { useNavigate } from "react-router-dom";
import useMobileStore from "../../../stores/mobileStore";

export default function LandingButton() {
    let navigate = useNavigate();
    const planetToLanding = useMobileStore((state) => state.planetToLanding);
    const enableNavigationAlert = useMobileStore((state) => state.enableNavigationAlert);
    const setDenayNavigationAlert = useMobileStore((state) => state.setDenayNavigationAlert);

    const landingPlanet = () => {
      const planetPath = "/" + planetToLanding;
      enableNavigationAlert ? navigate(planetPath) : setDenayNavigationAlert(true);
    }

  return (
    <>
      <button className="movement-action" onClick={() => landingPlanet()}>
        <span>
          <strong>J</strong>
        </span>
      </button>
    </>
  );
}
