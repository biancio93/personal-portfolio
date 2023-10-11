import gsap from "gsap";
import { useRef, useState } from "react";
import useMobileStore from "../../../stores/mobileStore";

export default function MovementButton() {
  const movementButtonContainer = useRef(null);
  const movementButtonPad = useRef(null);
  const setStarshipAngle = useMobileStore((state) => state.setStarshipAngle);
  const setStarshipMove = useMobileStore((state) => state.setStarshipMove);
  const [padOnMove, setPadOnMove] = useState(false);

  // =========================================================  Inizio Tocco
  const handleTouchStart = (event) => {
    event.preventDefault();
    const targetElement = event.target;
    const targetRect = targetElement.getBoundingClientRect();

    // Calcolo il centro dell'elemento
    const centerX = targetRect.left + targetRect.width / 2;
    const centerY = targetRect.top + targetRect.height / 2;

    var touchSingle = event.touches[0];

    // Calculate relative coordinates
    const relativeSingleX = touchSingle.clientX - centerX;
    const relativeSingleY = -touchSingle.clientY + centerY;

    // Posiziono il pad
    gsap.to(movementButtonPad.current, {
      x: relativeSingleX,
      y: -relativeSingleY,
    });

    // Calculate the angle between (0, 0) and the touch point
    const angleRadiansSingle = -Math.atan2(relativeSingleX, relativeSingleY);

    // Aggiorno l'angolo della navicella
    setStarshipAngle(angleRadiansSingle);
    setStarshipMove(true);

    // Triggero l'evento di movimento
    targetElement.addEventListener("touchmove", handleTouchMove, false);

    // =========================================================  Funzione di movimento
    function handleTouchMove(event) {
      var touch = event.touches[0];

      // Calculate relative coordinates
      const relativeX = touch.clientX - centerX;
      const relativeY = -touch.clientY + centerY;

      // Posiziono il pad
      gsap.to(movementButtonPad.current, {
        x: Math.max(Math.min(relativeX, 30), -30),
        y: Math.max(Math.min(-relativeY, 30), -30),
      });

      // Calculate the angle between (0, 0) and the touch point
      const angleRadians = -Math.atan2(relativeX, relativeY);

      // Aggiorno l'angolo della navicella
      setStarshipAngle(angleRadians);
    }
  };

  // =========================================================  Fine Tocco
  const handleTouchEnd = (event) => {
    event.preventDefault();
    setStarshipMove(false);
    // Riposiziono il pad
    gsap.to(movementButtonPad.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      delay: 0.2,
    });
  };

  return (
    <button
      ref={movementButtonContainer}
      className="movement-button-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span ref={movementButtonPad}></span>
    </button>
  );
}
