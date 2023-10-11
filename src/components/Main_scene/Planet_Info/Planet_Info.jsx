import "./planet-info.css";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import usePlanetPosition from "../../../stores/galaxyStore";
import usePlanetInteraction from "../../../stores/planetInteraction";
import { Vector3 } from "three";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

export default function PlanetInfo(props) {
  const [planetDistance, setPlanetDistance] = useState("---");

  const cameraMapPositionX = usePlanetPosition(
    (state) => state.cameraPositionX
  );
  const cameraMapPositionY = usePlanetPosition(
    (state) => state.cameraPositionY
  );
  const cameraMapPositionZ = usePlanetPosition(
    (state) => state.cameraPositionZ
  );

  const setPlanetHover = usePlanetInteraction((state) => state.setPlanetHoveredIN);

  useEffect(() => {
      const cameraPosition = new Vector3(cameraMapPositionX, cameraMapPositionY, cameraMapPositionZ);
      const planetPositionHover = new Vector3(props.planetCoord[0], props.planetCoord[1], props.planetCoord[2]);
      const distance = cameraPosition.distanceTo(planetPositionHover);
      setPlanetDistance(Math.floor(distance));
      planetDistance < 40 ? setPlanetHover(true) : setPlanetHover(false);
  });

  useEffect(() => {
    return () => {
      setPlanetHover(false);
    };
  }, []);
  
  return (
    <Html className={`planet-info-container ${planetDistance > 70 ? "p-max" : "p-min"}`} center distanceFactor={planetDistance > 70 ? 100 : 40} pointerEvents="none" zIndexRange={[1, 0]}>
      {planetDistance < 40 ? <BsFillCheckCircleFill className="landing-icon-yes"/> : <BsFillXCircleFill className="landing-icon-not"/>}
      <h3 className="planet-info-name">{props.planetName}</h3>
      {planetDistance < 40 ? <p className="landing-invoice">clicca per atterrare</p> : <p className="planet-distance">distance : {planetDistance}</p>}
    </Html>
  );
}
