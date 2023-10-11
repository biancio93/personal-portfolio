import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DoubleSide } from "three";
import usePlanetPosition from "../../../stores/galaxyStore";
import usePlanetInteraction from "../../../stores/planetInteraction";
import { useTexture } from "@react-three/drei";
import PlanetInfo from "../Planet_Info/Planet_Info";
import { Vector3 } from "three";

/* DEFINITION */
export default function PlanetAbout() {
  const planetAboutGroup = useRef();
  const highlight = useRef();
  const planet = useRef();
  const planetRing = useRef();
  const [planetHover, setPlanetHover] = useState(false);

  /* POSITION REGISTRATION */
  const aboutPositionInitial = usePlanetPosition(
    (state) => state.paPositionInitial
  );
  const setPaPositionX = usePlanetPosition((state) => state.setPaPositionX);
  const setPaPositionZ = usePlanetPosition((state) => state.setPaPositionZ);
  const frameController = usePlanetPosition((state) => state.frameController);
  const timeController = usePlanetPosition((state) => state.timeController);

  const uploadPosition = () => {
    setPaPositionX(planetAboutGroup.current.position.x);
    setPaPositionZ(planetAboutGroup.current.position.z);
  };

  let controllerPosition = 0;

  /* ANIMAZIONE */
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetAboutGroup.current.position.x =
      96 * Math.cos((time + 22 + timeController) * 0.03);
    planetAboutGroup.current.position.z =
      96 * Math.sin((time + 22 + timeController) * 0.03);

    highlight.current.position.x =
      95.7 * Math.cos((time + 0 + timeController) * 2);
    highlight.current.position.z =
      95.7 * Math.sin((time + 0 + timeController) * 2);

    planet.current.rotation.y = time * 0.5;
    planetRing.current.rotation.z = -time * 0.8;

    controllerPosition++;
    if (controllerPosition === 0 || controllerPosition === frameController) {
      uploadPosition(
        planetAboutGroup.current.position.x,
        planetAboutGroup.current.position.z
      );
      controllerPosition = 0;
    }
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet3/color.jpg");
  const textureRing = useTexture("/Planet/Planet3/ring.jpg");

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
    const planetPositionHover = new Vector3(planetAboutGroup.current.position.x, planetAboutGroup.current.position.y, planetAboutGroup.current.position.z);
    const distance = cameraPosition.distanceTo(planetPositionHover);
    distance < 200 ? setPlanetHover(true) : setPlanetHover(false);
    e.stopPropagation();
  }

  /* CHECK CLICK */
  function planetClickController(e){
    if(planetHoveredController === true){
      setLandingManeuver(true);
      setTargetPlanet("/About");
    } else {
      setPlanetDistance(true);
    }
  }

  /* RETURN */
  return (
    <>
      <group ref={planetAboutGroup}>
      {planetHover ? <PlanetInfo planetName={"About"} planetCoord={[planetAboutGroup.current.position.x, planetAboutGroup.current.position.y, planetAboutGroup.current.position.z]}/> : ""}
        <mesh ref={planet}>
          <sphereGeometry args={[4, 16, 128]} />
          <meshToonMaterial map={texture} color={0xa57617} />
        </mesh>
        <mesh onPointerOver={(e) => planetHoverController(e)} onPointerOut={(e) => setPlanetHover(false)} onClick={(e) => planetClickController(e)}>
          <sphereGeometry args={[5.5, 16, 16]} />
          <meshToonMaterial color={0xa57617} transparent opacity={0.2} />
        </mesh>
        <mesh ref={planetRing} rotation-x={Math.PI * 0.55}>
          <ringGeometry args={[10, 7, 32]} />
          <meshToonMaterial
            map={textureRing}
            color={0xfea500}
            side={DoubleSide}
            map-wrapS={THREE.RepeatWrapping}
            map-wrapT={THREE.RepeatWrapping}
            map-repeat-x={0.5}
            map-repeat-y={0.5}
            map-offset-x={0.25}
            map-offset-y={0.25}
          />
        </mesh>
      </group>
      <mesh position={[0, 0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[96.2, 96.4, 128]} />
        <meshToonMaterial color={0x804db4} side={DoubleSide} />
      </mesh>
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[96.1, 95.9, 128]} />
        <meshToonMaterial color={0xe74e6d} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[95.8, 95.6, 128]} />
        <meshToonMaterial color={0xfea500} side={DoubleSide} />
      </mesh>
      <pointLight
        ref={highlight}
        position={[95.7, 5, 0]}
        intensity={10}
        distance={15}
        decay={0.2}
      />
    </>
  );
}
