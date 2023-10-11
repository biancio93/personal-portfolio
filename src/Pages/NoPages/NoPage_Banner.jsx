import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Html } from "@react-three/drei";
import usePlanetInteraction from "../../stores/planetInteraction";
import useInterfaceSetting from "../../stores/interfaceStore";
import { BsStars } from "react-icons/bs";

export default function NoPage_Alert() {
  const backToSpaceButton = useRef(null);
  const pageTextRef = useRef();

  const setLandingManeuver = usePlanetInteraction(
    (state) => state.setStartLandingManeuver
  );
  const setTargetPlanet = usePlanetInteraction(
    (state) => state.setTargetPlanet
  );
  const setControlsEnabled = useInterfaceSetting(
    (state) => state.resetControlsEnabled
  );

  function planetClickController() {
    setLandingManeuver(true);
    setTargetPlanet("");
    setControlsEnabled();
  }

  useEffect(() => {
    gsap.from(pageTextRef.current, {
        duration: 1,
        opacity: 0,
      });
    gsap.from(backToSpaceButton.current, {
      duration: 1,
      delay: 0.5, 
      opacity: 0,
    });
  }, []);

  return (
    <>
      <Html className="not-found-container" position-y={2} center style={{textAlign: "center"}} zIndexRange={[1, 0]}>
        <p ref={pageTextRef} className="not-found-message">
          E' facile perdersi nelle vastità dell'universo
        </p>
        <button
          ref={backToSpaceButton}
          className="space-button-not-found"
          onClick={(e) => planetClickController()}
        >
          <BsStars style={{marginRight: "0.5em"}} />
          <span>Segui una stella e torna sulla via</span>
        </button>
      </Html>
    </>
  );
}
