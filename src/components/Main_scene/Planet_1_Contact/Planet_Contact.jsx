import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import usePlanetPosition from "../../../stores/galaxyStore";
import usePlanetInteraction from "../../../stores/planetInteraction";
import { DoubleSide } from "three";
import { useTexture } from "@react-three/drei";
import PlanetInfo from "../Planet_Info/Planet_Info";
import { Vector3 } from "three";

/* DEFINITION */
export default function PlanetContact() {
  const planetContactGroup = useRef();
  const planetContactOrbit = useRef();
  const planetContactMoon = useRef();
  const planetContactMoonOrbit1 = useRef();
  const planetContactMoonOrbit2 = useRef();
  const planetContactMoonOrbit3 = useRef();
  const highlight = useRef();
  const planet = useRef();
  const [planetHover, setPlanetHover] = useState(false);

  /* POSITION REGISTRATION */
  const contactPositionInitial = usePlanetPosition(
    (state) => state.pcPositionInitial
  );
  const setPcPositionX = usePlanetPosition((state) => state.setPcPositionX);
  const setPcPositionZ = usePlanetPosition((state) => state.setPcPositionZ);
  const frameController = usePlanetPosition((state) => state.frameController);
  const timeController = usePlanetPosition((state) => state.timeController);

  let controllerPosition = 0;

  /* ANIMAZIONE */
  const uploadPosition = () => {
    setPcPositionX(planetContactGroup.current.position.x);
    setPcPositionZ(planetContactGroup.current.position.z);
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetContactGroup.current.position.x =
      contactPositionInitial * Math.cos((time + 0 + timeController) * 0.05);
    planetContactGroup.current.position.z =
      contactPositionInitial * Math.sin((time + 0 + timeController) * 0.05);

    planetContactMoon.current.position.x = 6 * Math.cos(time * 0.4);
    planetContactMoon.current.position.z = 6 * Math.sin(time * 0.4);

    highlight.current.position.x = 33.7 * Math.cos((time + 0 + timeController) * 2.8);
    highlight.current.position.z = 33.7 * Math.sin((time + 0 + timeController) * 2.8);

    planet.current.rotation.y = time * 0.8;

    controllerPosition++;
    if (controllerPosition === 0 || controllerPosition === frameController) {
      uploadPosition(
        planetContactGroup.current.position.x,
        planetContactGroup.current.position.z
      );
      controllerPosition = 0;
    }
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet1/color.png");

  /* CHECK CAMERA POSITION */
  const cameraMapPositionX = usePlanetPosition(
    (state) => state.cameraPositionX
  );
  const cameraMapPositionY = usePlanetPosition(
    (state) => state.cameraPositionY
  );
  const cameraMapPositionZ = usePlanetPosition(
    (state) => state.cameraPositionZ
  );

  /* CHECK HOVER */
  const planetHoveredController = usePlanetInteraction(
    (state) => state.planetHovered
  );
  const setPlanetDistance = usePlanetInteraction((state) => state.setPlanetDistance);

  /* CHECK LANDING CONTROLLER */
  const setLandingManeuver = usePlanetInteraction((state) => state.setStartLandingManeuver);
  const setTargetPlanet = usePlanetInteraction((state) => state.setTargetPlanet);

  function planetHoverController(e){
    const cameraPosition = new Vector3(cameraMapPositionX, cameraMapPositionY, cameraMapPositionZ);
    const planetPositionHover = new Vector3(planetContactGroup.current.position.x, planetContactGroup.current.position.y, planetContactGroup.current.position.z);
    const distance = cameraPosition.distanceTo(planetPositionHover);
    distance < 200 ? setPlanetHover(true) : setPlanetHover(false);
    e.stopPropagation();
  }

  /* CHECK CLICK */
  function planetClickController(e){
    if(planetHoveredController === true){
      setLandingManeuver(true);
      setTargetPlanet("/Contact");
    } else {
      setPlanetDistance(true);
    }
  }

  /* RETURN */
  return (
    <>
      <group ref={planetContactGroup}> 
      {planetHover ? <PlanetInfo planetName={"Contact"} planetCoord={[planetContactGroup.current.position.x, planetContactGroup.current.position.y, planetContactGroup.current.position.z]}/> : ""}
        <mesh ref={planet}>
          <sphereGeometry args={[2.5, 16, 32]} />
          <meshToonMaterial color={0xe74e6d} map={texture}/>
        </mesh>
        <mesh onPointerOver={(e) => planetHoverController(e)} onPointerOut={(e) => setPlanetHover(false)} onClick={(e) => planetClickController(e)}>
          <sphereGeometry args={[4.5, 16, 16]} />
          <meshToonMaterial color={0xe74e6d} transparent opacity={0.2} />
        </mesh>
        <mesh ref={planetContactMoon} position={[6, 0, 0]}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshToonMaterial color={0x32f6f3} />
        </mesh>
        <mesh position={[0, 0.2, 0]} ref={planetContactMoonOrbit1} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[6.2, 6.4, 16]} />
        <meshToonMaterial color={0x804db4} side={DoubleSide} />
      </mesh>
      <mesh ref={planetContactMoonOrbit2} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[6.1, 5.9, 16]} />
        <meshToonMaterial color={0xE74E6D} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} ref={planetContactMoonOrbit3} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[5.8, 5.6, 16]} />
        <meshToonMaterial color={0xfea500} side={DoubleSide} />
      </mesh>
      </group>
      <mesh position={[0, 0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[34.2, 34.4, 64]} />
        <meshToonMaterial color={0x804DB4} side={DoubleSide} />
      </mesh>
      <mesh ref={planetContactOrbit} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[34.1, 33.9, 64]} />
        <meshToonMaterial color={0xE74E6D} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[33.8, 33.6, 64]} />
        <meshToonMaterial color={0xfea500} side={DoubleSide} />
      </mesh>
      <pointLight ref={highlight} position={[33.7, 5, 0]} intensity={10} distance={10} decay={0.2} />
    </>
  );
}
