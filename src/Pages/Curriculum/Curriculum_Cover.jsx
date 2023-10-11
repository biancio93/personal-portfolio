import ProfileImage from "./profilo.jpg";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function CurriculumCover(props) {
  const decorationContainer = useRef(null);
  const decorationSmall = useRef(null);
  const menuTimelineRef = useRef(null);
  const menuTimelineArrow = useRef(null);
  const menuElements = useRef([]);

  const decorationItemGeneration = (() => {
    menuElements.current = document.querySelectorAll('.curriculum-menu-link');

    const decorationContainerHeight = decorationContainer.current.offsetHeight;
    const decorationSegment = (((decorationContainerHeight / 2) / (((decorationContainerHeight / 2)/100*5)+(((decorationContainerHeight / 2)/100*5)/100)*5)-1)/2)-4;
    for (let i = 0; i < decorationSegment; i++){
      const clone = decorationSmall.current.cloneNode(true);
      decorationContainer.current.appendChild(clone);
    }
  })

  useEffect(() => {
    return(decorationItemGeneration());
  }, []);

  useEffect(() => {
    const arrowMove = Math.round((menuTimelineRef.current.offsetHeight / (window.innerHeight * 5)) * props.scrollPosition);
    gsap.to(menuTimelineArrow.current, {duration: 0.2, y: arrowMove});

    for(let i = 0; i < menuElements.current.length; i++){
      if((props.scrollPosition + 1) > window.innerHeight * i && (props.scrollPosition + 1) < window.innerHeight * (i + 1)){
        menuElements.current[i].classList.add("active");
      } else {
        menuElements.current[i].classList.remove("active");
      }
    }
  }, [props.scrollPosition]);

  return (
    <>
      <section className="curriculum-cover">
        <span className="cover-border cover-border-line-1"></span>
        <span className="cover-border cover-border-triangle"></span>
        <span className="cover-border cover-border-line-2"></span>
        <div className="cover-menu-container">
          <div className="top-section">
            <div className="curriculum-image">
              <img src={ProfileImage} alt="Profile Pictures" />
            </div>
            <h1>Francesco Bianciardi</h1>
            <p><span className="web-curriculum">Web Designer</span><span className="underline-curriculum"></span></p>
          </div>
          <span ref={decorationContainer} className="decoration-container"><span className="decoration-big"></span><span ref={decorationSmall} className="decoration-small"></span></span>
          <div className="bottom-section">
          <span className="menu-timeline-border">
            <ul ref={menuTimelineRef}>
              <span ref={menuTimelineArrow} className="menu-timeline-arrow"></span>
            <li className="curriculum-menu-link"><a href="#biografia">Biografia</a></li>
            <li className="curriculum-menu-link"><a href="#formazione">Formazione</a></li>
            <li className="curriculum-menu-link"><a href="#esperienze">Esperienze</a></li>
            <li className="curriculum-menu-link"><a href="#skills">Skills</a></li>
            <li className="curriculum-menu-link"><a href="#contatti">Contatti</a></li>
            </ul>
            </span>
            <span className="button-container"><a className="download-button" href="/Francesco-Bianciardi-Curriculum-Vitae.pdf" download rel="noopener noreferrer" target="_blank">Download</a></span>
          </div>
        </div>
      </section>
    </>
  );
}
