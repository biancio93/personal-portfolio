import "./menu.css";
import {
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import { gsap } from "gsap";
import { SlideContext } from "./Help_Tutorial_Contentl";

export default function HelpCardTutorial(props) {
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
      tl.current = gsap.timeline();
      tl.current
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
        tlBack.current = gsap.timeline({ onComplete: killTheCard });
        tlBack.current
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

  // RETURN
  return (
    <>
      <div ref={helpCard} className="help-card">
        <video controls>
          <source src={props.video} type="video/webm" />
          Houston abbiamo un problema!
        </video>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </>
  );
}
