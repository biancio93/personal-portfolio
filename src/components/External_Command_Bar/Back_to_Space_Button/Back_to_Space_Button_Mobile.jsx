import { gsap } from "gsap";
import { Timeline } from "gsap/gsap-core";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function BackToSpaceButtonMobile() {
  const backToSpaceButton = useRef(null);
  const tl = useRef();
  const [reversed, setReversed] = useState(false);
  const navigate = useNavigate();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.timeline({
      onReverseComplete: () => navigate("/"),
    });

    tl.current = ctx;
    tl.current.from(".mobile-page-container", { duration: 0.4, opacity: 0, scale: 0.9, ease: "power4.out" });

    setIsFirstRender(false); // Move it here
    return () => ctx.kill();
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      tl.current.reversed(reversed);
    }
  }, [reversed, isFirstRender]);

  function exitAnimation() {
    setReversed(true);
  }

  return (
    <button ref={backToSpaceButton} className="space-button-mobile" onTouchStart={(e) => {e.preventDefault(); exitAnimation();}}>
      <span className="back-to-space"><BsFillArrowLeftCircleFill className="back-to-space-icon" />Back to SPACE</span>
      <span className="back-to-space-line"></span>
    </button>
  );
}