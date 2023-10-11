import "./cursor-planet-navigation.css";
import { useEffect, useState } from "react";

export default function MouseGalaxy2() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <>
    <div className="mouse-poisition">
      <p>
        Mouse positioned at:{" "}
        <b>
          ({coords.x}, {coords.y})
        </b>
      </p>
    </div>
    <span className="cursor" style={{top:coords.y, left: coords.x}}></span>
    <span className="cursor" style={{top:coords.y, left: coords.x}}></span>
    </>
  );
}
