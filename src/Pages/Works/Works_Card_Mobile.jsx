import { BsXLg } from "react-icons/bs";
import { gsap } from "gsap";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function WorksCardMobile(props) {
  const [controllerCard, setControllerCard] = useState(false);
  const cardBackground = useRef(null);
  const cardContainer = useRef(null);
  const topBorder = useRef(null);
  const bottomBorder = useRef(null);
  const triangleBorder = useRef(null);
  const imageCover = useRef(null);
  const imageWork = useRef(null);
  const cardTitle = useRef(null);
  const cardSubTitle = useRef(null);
  const cardDescription = useRef(null);
  const colLeft = useRef(null);
  const closingButton = useRef(null);
  const tl = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({ onReverseComplete: cardClosing });
      tl.current
        .from(cardBackground.current, {
          duration: 0.4,
          opacity: 1,
        })
        .from(topBorder.current, {
          duration: 0.3,
          width: 0,
        })
        .from(triangleBorder.current, {
          duration: 0.3,
          scale: 0,
          transformOrigin: "right top",
        })
        .from(bottomBorder.current, {
          duration: 0.3,
          width: 0,
        })
        .from(cardContainer.current, {
          duration: 0.4,
          backgroundColor: "rgba(29, 17, 39, 0)",
          ease: "power4.out",
        })
        .from(colLeft.current, {
          duration: 0.4,
          opacity: 0,
          x: -50,
        })
        .to(
          imageCover.current,
          {
            duration: 0.6,
            scaleX: 0,
            transformOrigin: "center center",
          },
          "<"
        )
        .from(
          imageWork.current,
          {
            duration: 0.4,
            scale: 0.6,
          },
          "<"
        )
        .from(
          cardTitle.current,
          {
            duration: 0.4,
            opacity: 0,
            x: 50,
          },
          "<"
        )
        .from(
          cardSubTitle.current,
          {
            duration: 0.4,
            opacity: 0,
            x: 50,
          },
          "<+=0.2"
        )
        .from(
          cardDescription.current,
          {
            duration: 0.4,
            opacity: 0,
            x: 50,
          },
          "<+=0.2"
        )
        .from(closingButton.current, {
          duration: 0.4,
          opacity: 0,
          y: 100,
        });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (controllerCard === true) {
      tl.current.reversed(true);
    }
  }, [controllerCard]);

  const cardClosing = () => {
    props.closing();
  };

  return (
    <>
      <button
        ref={closingButton}
        className="single-card-closing"
        onClick={(e) => {e.preventDefault(); setControllerCard(true);}}
      >
        <BsXLg />
      </button>
      <div ref={colLeft} className="single-card-4">
        <div className="container-image">
          <span ref={imageCover} className="image-cover"></span>
          {props.image ? (
            <img
              ref={imageWork}
              className="work-image"
              src={props.image}
              alt={props.altimage}
            ></img>
          ) : (
            <p className="work-image-error">
              Non sono riuscito a recuperare l'immagine, potrebbe essere stata
              rimossa oppure rapita dagli alieni
            </p>
          )}
        </div>
      </div>
      <div ref={cardBackground} className="card-background">
        <div className="card-animation">
        <article ref={cardContainer} className="single-card-container">
          <span ref={topBorder} className="card-border top-border"></span>
          <span ref={bottomBorder} className="card-border bottom-border"></span>
          <span ref={triangleBorder} className="border-triangle"></span>
          <section className="single-card-row">
            <div className="single-card-8">
              <div className="card-heading-container">
                <h2 ref={cardTitle}>{props.title}</h2>
                <div
                  ref={cardSubTitle}
                  className="card-info-container inside-info"
                >
                  <p>
                    <span>
                      Tipologia : <em>{props.type}</em>
                    </span>
                    <span>
                      Anno : <em>{props.year}</em>
                    </span>
                  </p>
                </div>
              </div>
              <div ref={cardDescription} className="card-description-container">
                <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
                {props.link ? (
                    <a
                      className="discover-button discover-button-card"
                      href={props.link}
                      target="_blank"
                    >
                      go to project _
                    </a>
                  ) : (
                    <span class="link-disable">Link non presente</span>
                  )}
              </div>
            </div>
          </section>
        </article>
        </div>
      </div>
    </>
  );
}
