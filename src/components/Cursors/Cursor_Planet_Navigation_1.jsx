import "./cursor-planet-navigation.css";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import usePlanetInteraction from "../../stores/planetInteraction";

export default function MouseGalaxy1() {
  const [coords, setCoords] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const cursorSub1 = useRef(null);
  const cursorSub2 = useRef(null);
  const cursorSubMain = useRef(null);
  const tl = useRef();
  let navigate = useNavigate();

  const setLandingManeuver = usePlanetInteraction(
    (state) => state.setStartLandingManeuver
  );

  const planetHoveredController = usePlanetInteraction(
    (state) => state.planetHovered
  );
  const landingManeuver = usePlanetInteraction(
    (state) => state.startLandingManeuver
  );
  const targetPlanet = usePlanetInteraction((state) => state.targetPlanet);

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.to(cursorSub1.current, {
      duration: 0.4,
      top: coords.y,
      left: coords.x,
    });
    gsap.to(cursorSub2.current, {
      duration: 0.8,
      top: coords.y,
      left: coords.x,
    });
  });

  useEffect(() => {
    if (planetHoveredController === true) {
      gsap.to(cursorSubMain.current, {
        duration: 0.4,
        scale: 4.5,
      });
    } else {
      gsap.to(cursorSubMain.current, {
        duration: 0.4,
        scale: 1,
      });
    }
  }, [planetHoveredController]);

  useEffect(() => {
    if (landingManeuver === true) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline({
          onComplete: function () {
            navigate(targetPlanet);
            tl.current.reverse();
          },
          onReverseComplete: function () {
            setLandingManeuver(false);
          },
        });
        tl.current
          .to(cursorSub1.current, {
            duration: 0,
            zIndex: 12,
          })
          .to(cursorSub2.current, {
            duration: 0,
            zIndex: 11,
          }, "<")
          .to(cursorSub2.current, {
            duration: 0.4,
            backgroundColor: "rgb(0, 0, 0, 0.5)",
          })
          .to(
            cursorSub2.current,
            {
              duration: 0.8,
              ease: "power4.inOut",
              borderRadius: "110vw",
              width: "220vw",
              height: "220vw",
            },
            "<"
          )
          .to(
            cursorSub1.current,
            {
              duration: 0.4,
              backgroundColor: "rgba(245, 173, 49, 1)",
            },
            "<0.4"
          )
          .to(
            cursorSub1.current,
            {
              duration: 0.8,
              ease: "power4.inOut",
              borderRadius: "110vw",
              width: "220vw",
              height: "220vw",
            },
            "<"
          );
      });
      return () => ctx.revert();
    }
  }, [landingManeuver]);

  return (
    <>
      <span
        ref={cursorSubMain}
        className="cursor"
        style={{ top: coords.y, left: coords.x }}
      ></span>
      <span ref={cursorSub1} className="cursor-sub" style={{ top: coords.y, left: coords.x }}></span>
      <span ref={cursorSub2} className="cursor-sub-dark" style={{ top: coords.y, left: coords.x }}></span>
    </>
  );
}
