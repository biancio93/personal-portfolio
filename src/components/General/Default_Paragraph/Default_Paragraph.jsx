import "./default-paragraph.css";
import { gsap } from "gsap";
import {
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";

const DefaultParagraph = () => {
  const paragraphRef = useRef();
  const tl = useRef(gsap.timeline());
  const constTextController = useRef(false);

  const printText = ">: 4 8 15 42 25 47";
  const chars = [...printText];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current.progress(0).kill();
      chars.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = 0;
        span.style.position = "relative";
        span.style.bottom = "-10px";
        paragraphRef.current.appendChild(span);

        tl.current.fromTo(
          span,
          { opacity: 0, left: "-10px" },
          {
            opacity: 1,
            bottom: "0px",
            duration: 0.1,
            delay: index * 0.05,
          }
        );
      });
    }, paragraphRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    tl.current.reversed(constTextController.current);
  }, [constTextController.current]);

  return (
    <p ref={paragraphRef} className="dafault-paragraph">
    </p>
  );
};

export default DefaultParagraph;
