import "./menu.css";
import { useRef, useLayoutEffect, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { SlideContext } from "./Help_Menu_Content";
import spaceGuy from "./guida-galattica-per-utenti-cosmonauti.png";
import usePlanetInteraction from "../../../stores/planetInteraction";

export default function HelpStartCard(props) {
  const helpCard = useRef(null);
  const tl = useRef();
  const tlBack = useRef();

  const setLandingManeuver = usePlanetInteraction((state) => state.setStartLandingManeuver);
  const setTargetPlanet = usePlanetInteraction((state) => state.setTargetPlanet);

  const [
    slide,
    setSlide,
    count,
    setCount,
    slideController,
    setSlideController,
    arrowPress,
    listItemsLenght,
  ] = useContext(SlideContext);

  function killTheCard() {
    if (arrowPress === "r") {
      setCount((count + 1) % listItemsLenght);
    } else if (arrowPress === "l") {
      setCount((count - 1 + listItemsLenght) % listItemsLenght);
    } else {
      setCount(count + 1);
    }
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tlBack.current = gsap.timeline();
      tlBack.current
        .from(helpCard.current, {
          duration: 0.6,
          opacity: 0,
        })
        .to(helpCard.current, {
          duration: 0.4,
          scale: 1,
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (slide === true) {
      setSlide(!slide);
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline({ onComplete: killTheCard });
        tl.current
          .to(helpCard.current, {
            duration: 0.4,
            scale: 0.8,
          })
          .to(helpCard.current, {
            duration: 0.6,
            y: -50,
            opacity: 0,
          });
      });

      return () => ctx.revert();
    }
  }, [slideController]);

  function planetClickController(){
    setLandingManeuver(true);
    setTargetPlanet("/Curriculum");
}

  // RETURN
  return (
    <>
      <div ref={helpCard} className="help-card">
        <img
          className="help-card-image"
          src={spaceGuy}
          alt="Space Guy - l'astronauta che dice ok"
        />
        ;<h4>Guida Galattica per Utenti</h4>
        <p>
          Le prossime slide cercheranno di formarti quanto più possibile sulla
          nobile arte del viaggio spaziale. <br /> --- <br />Se diventare un Cosmonauta esperto
          non ti interessa, o vuoi solo sapere chi sono senza dover affrontare il vuoto cosmico <span className="discover-button-card" onClick={() => planetClickController()}>visita il mio Curriculum Vitae</span>
        </p>
      </div>
    </>
  );
}
