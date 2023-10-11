import "./back-to-space-css.css";
import { gsap } from "gsap";
import usePlanetInteraction from "../../../stores/planetInteraction";
import useInterfaceSetting from "../../../stores/interfaceStore";
import { useLayoutEffect, useRef } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

export default function BackToSpaceButton() {
  const backToSpaceButton = useRef(null);

  const setLandingManeuver = usePlanetInteraction((state) => state.setStartLandingManeuver);
  const setTargetPlanet = usePlanetInteraction((state) => state.setTargetPlanet);
  const setControlsEnabled = useInterfaceSetting(
    (state) => state.resetControlsEnabled
  );

  function planetClickController(){
      setLandingManeuver(true);
      setTargetPlanet("");
      setControlsEnabled();
  }

  useLayoutEffect(() => {
    gsap.from(backToSpaceButton.current, { duration: 0.4, x: -100, opacity: 0 });
  }, []);

  return (
    <div ref={backToSpaceButton} className="space-button" onClick={(e) => planetClickController()}>
      <BsFillRocketTakeoffFill />
      <span>Back to SPACE</span>
    </div>
  );
}
