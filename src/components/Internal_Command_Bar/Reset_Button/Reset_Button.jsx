import "../Keyboard/keyboard.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import usePlanetPosition from "../../../stores/galaxyStore";

export default function ResetButton() {
  const setResetCamera = usePlanetPosition((state) => state.setResetCamera);
  const resetButton = useRef(null);

  // Trigger Animazione al clic su "H-key"
  const resetPosition = () => {
    setResetCamera(true);
  };

  const handleKeyDown = (e) => {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      resetPosition();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    gsap.from(resetButton.current, {duration: 0.4, delay: 0.6, opacity: 0})
  }, []);

  return <h3 ref={resetButton} className="reset-button">PRESS SPACEBAR TO RESET POSITION</h3>;
}
