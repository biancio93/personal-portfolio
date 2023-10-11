import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function SceneCover({setSceneCover}) {
  const sceneCover = useRef(null);
  const tl = useRef();

  const KillTheCover = (() => {
    setSceneCover(false);
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        onComplete: KillTheCover,
      });
      tl.current.to(sceneCover.current, {
        duration: 0.8,
        delay: 0.6,
        opacity: 0,
      });
    });
    return () => ctx.revert();
  }, []);

  return <span ref={sceneCover} className="scene-cover"></span>;
}
