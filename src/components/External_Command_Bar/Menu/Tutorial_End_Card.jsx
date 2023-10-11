import "./menu.css";
import { useRef, useLayoutEffect, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { SlideContext } from "./Help_Tutorial_Contentl";
import spaceGuyEnd from "./guida-galattica-per-utenti-cosmonauti-fine.png";

export default function TutorialEndCard({setHelpCardState, setCookie}) {
  const helpCard = useRef(null);
  const tl = useRef();
  const tlBack = useRef();

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
          y: 50,
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

  const navigationStart = (() => {
    setHelpCardState(true);
    setCookie('visited', true, { maxAge: 3600 })
  });

  // RETURN
  return (
    <>
      <div ref={helpCard} className="help-card">
        <img
          className="help-card-image"
          src={spaceGuyEnd}
          alt="Space Guy - diplomato all'accademia di volo"
        />
        <h4>Sei pronto!</h4>
        <p>
          Ottimo lavoro utente, il tuo viaggio può cominciare! Ti auguro una buona navigazione, <strong>ricorda che se vuoi abbreviare il tragitto puoi utilizzare il menu di navigazione per spostarti</strong>. <br/>Per tutto il resto la risposta è 42!
        </p>
        <button className="menu-link" onClick={() => navigationStart()}>
            COMINCIA LA NAVIGAZIONE
          </button>
      </div>
    </>
  );
}
