import { gsap } from "gsap";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

export default function CurriculumCoverLeft(props) {
  const arrowContainer = useRef(null);
  const backToTop = useRef(null);
  const arrowCurriculum = useRef([]);
  const tl = useRef();
  const [lastSlide, setLastSlide] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        gsap.from(".curriculum-cover-left", {width: "80vw", duration: 2, ease: "power4.out", delay: 1});
      if(arrowContainer.current){
        gsap.from(arrowContainer.current, {x: "10vw", duration: 2, ease: "power4.out", delay: 1});
      };   
      if(backToTop.current){
        gsap.from(".back-to-top", {x: "10vw", duration: 2, ease: "power4.out", delay: 1});
      };   
    }); 
    
    return () => ctx.revert(); // cleanup
  }, []);
  
  useEffect(() => {
    const arrows = arrowCurriculum.current;

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({ repeat: -1, yoyo: false });

      arrows.forEach((arrow) => {
        tl.current
        .from(arrow, { duration: 0.2, opacity: 0.3, ease: 'power1.inOut',  }, "<")
        .from(arrow, { duration: 0.2, opacity: 1, ease: 'power1.inOut',  }, "<0.1")
      });
    }, arrowContainer.current);

    return () => ctx.revert();
  }, [lastSlide]);

  useEffect(() => {
    if(props.scrollPosition + 1 > (window.innerHeight * 4) && props.scrollPosition + 1 < (window.innerHeight * 5)){
      setLastSlide(true)
    } else {
      setLastSlide(false)
    }
  }, [props.scrollPosition])

  return (
    <>
      {lastSlide === false ? <div ref={arrowContainer} className="arrow-container">
        <span ref={(el) => (arrowCurriculum.current[0] = el)} className="arrow-curriculum"></span>
        <span ref={(el) => (arrowCurriculum.current[1] = el)} className="arrow-curriculum"></span>
        <span ref={(el) => (arrowCurriculum.current[2] = el)} className="arrow-curriculum"></span>
        <span ref={(el) => (arrowCurriculum.current[3] = el)} className="arrow-curriculum"></span>
        <span ref={(el) => (arrowCurriculum.current[4] = el)} className="arrow-curriculum"></span>
        <span ref={(el) => (arrowCurriculum.current[5] = el)} className="arrow-curriculum"></span>
      </div> : <a href="#biografia" ref={backToTop} className="back-to-top">back to top</a>}
      <div className="curriculum-cover-left">
        <span className="cover-border cover-border-line-3"></span>
        <span className="cover-border cover-border-triangle-left"></span>
        <span className="cover-border cover-border-line-4"></span>
      </div>
    </>
  );
}
