import "./keyboard.css";
import {
  BsChevronCompactUp,
  BsChevronCompactRight,
  BsChevronCompactLeft,
  BsChevronCompactDown,
} from "react-icons/bs";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function CommandBar() {
  const [turboController, setTurboController] = useState(false);
  const [scaleController, setScaleController] = useState(0.95);
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const turbo = useKeyboardControls((state) => state.turbo);

  const qKey = useRef();
  const qKeyTitle = useRef();

  const controllsContainer = useRef();


  forward || leftward || rightward ? gsap.to(controllsContainer.current, {scale: scaleController - (rightward ? 0.1 : 0), duration: 0.5}) : gsap.to(controllsContainer.current, {scale: 1, duration: 0.5});

  useEffect(() => {
    if(turbo === true){
      if(turboController === true){
        setTurboController((turboController) => !turboController);
        setScaleController(0.95);
        gsap.to(qKey.current, { duration: 0.4, backgroundColor: "#693E17", filter: "drop-shadow(0px 0px 8px rgba(245, 173, 49, 0))" });
        gsap.to(qKeyTitle.current, { duration: 0.4, color: "#fea500" });
      } else {
        setTurboController((turboController) => !turboController);
        setScaleController(0.90)
        gsap.to(qKey.current, { duration: 0.4, backgroundColor: "#fea500", filter: "drop-shadow(0px 0px 8px rgba(245, 173, 49, 1))" });
        gsap.to(qKeyTitle.current, { duration: 0.4, color: "white" });
      }
    }
  }, [turbo]);

  useEffect(() => {
    gsap.from(controllsContainer.current, {duration: 0.4, delay: 0.6, y: 100, opacity: 0})
  }, []);

  return (
    <>
      <div ref={controllsContainer} className="command-bar">
        <div className={ `key-container ${ forward ? 'active-key' : '' }` }>
          <div className="key w-key">
            <BsChevronCompactUp />
            <h4 className="command-key">W</h4>
          </div>
        </div>
        <div className={ `key-container ${ rightward ? 'active-key' : '' }` }>
          <div className="key d-key">
            <h4 className="command-key">D</h4>
            <BsChevronCompactRight />
          </div>
        </div>
        <div className={ `key-container ${ leftward ? 'active-key' : '' }` }>
          <div className="key a-key">
            <BsChevronCompactLeft />
            <h4 className="command-key">A</h4>
          </div>
        </div>
        <div className={ `key-container ${ backward ? 'active-key' : '' }` }>
          <div className="key s-key">
            <h4 className="command-key">S</h4>
            <BsChevronCompactDown />
          </div>
        </div>
        <div className="key-container turbo-key">
          <div ref={qKey} className="key q-key  soft-pulse">
            <h4 ref={qKeyTitle} className="command-key">Q</h4>
            <h6 className="turbo-title">
              TURBO
              <br />
              MODE
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
