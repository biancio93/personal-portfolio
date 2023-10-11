import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DoubleSide } from "three";
import usePlanetPosition from "../../../stores/galaxyStore";
import usePlanetInteraction from "../../../stores/planetInteraction";
import { useTexture } from "@react-three/drei";
import PlanetInfo from "../Planet_Info/Planet_Info";
import { Vector3 } from "three";

/* DEFINITION */
export default function PlanetWorks() {
  const planetWorksGroup = useRef();
  const highlight = useRef();
  const planet = useRef();
  const [planetHover, setPlanetHover] = useState(false);

  /* POSITION REGISTRATION */
  const worksPositionInitial = usePlanetPosition(
    (state) => state.pwPositionInitial
  );
  const setPwPositionX = usePlanetPosition((state) => state.setPwPositionX);
  const setPwPositionZ = usePlanetPosition((state) => state.setPwPositionZ);
  const frameController = usePlanetPosition((state) => state.frameController);
  const timeController = usePlanetPosition((state) => state.timeController);

  const uploadPosition = () => {
    setPwPositionX(planetWorksGroup.current.position.x);
    setPwPositionZ(planetWorksGroup.current.position.z);
  };

  let controllerPosition = 0;

  /* ANIMAZIONE */
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetWorksGroup.current.position.x =
      worksPositionInitial * Math.cos((time + 54 + timeController) * 0.04);
    planetWorksGroup.current.position.z =
      worksPositionInitial * Math.sin((time + 54 + timeController) * 0.04);

    highlight.current.position.x =
      55.7 * Math.cos((time + 0 + timeController) * 2.4);
    highlight.current.position.z =
      55.7 * Math.sin((time + 0 + timeController) * 2.4);

    planet.current.rotation.y = time * 0.6;

    controllerPosition++;
    if (controllerPosition === 0 || controllerPosition === frameController) {
      uploadPosition(
        planetWorksGroup.current.position.x,
        planetWorksGroup.current.position.z
      );
      controllerPosition = 0;
    }
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet2/color.png");

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

  /* CHECK CLICK */
  function planetHoverController(e){
    const cameraPosition = new Vector3(cameraMapPositionX, cameraMapPositionY, cameraMapPositionZ);
    const planetPositionHover = new Vector3(planetWorksGroup.current.position.x, planetWorksGroup.current.position.y, planetWorksGroup.current.position.z);
    const distance = cameraPosition.distanceTo(planetPositionHover);
    distance < 200 ? setPlanetHover(true) : setPlanetHover(false);
    e.stopPropagation();
  }

  function planetClickController(e){
    if(planetHoveredController === true){
      setLandingManeuver(true);
      setTargetPlanet("/Works");
    } else {
      setPlanetDistance(true)
    }
  }

  /* RETURN */
  return (
    <>
      <group ref={planetWorksGroup}>
        {planetHover ? <PlanetInfo planetName={"Works"} planetCoord={[planetWorksGroup.current.position.x, planetWorksGroup.current.position.y, planetWorksGroup.current.position.z]}/> : ""}
        <mesh ref={planet}>
          <sphereGeometry args={[5, 16, 128]} />
          <meshToonMaterial color={0x48c0d6} map={texture} />
        </mesh>
        <mesh onPointerOver={(e) => planetHoverController(e)} onPointerOut={(e) => setPlanetHover(false)} onClick={(e) => planetClickController(e)}>
          <sphereGeometry args={[6.5, 16, 16]} />
          <meshToonMaterial color={0x48c0d6} transparent opacity={0.4} />
        </mesh>
      </group>
      <mesh position={[0, 0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[56.2, 56.4, 64]} />
        <meshToonMaterial color={0x804db4} side={DoubleSide} />
      </mesh>
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[56.1, 55.9, 64]} />
        <meshToonMaterial color={0xe74e6d} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[55.8, 55.6, 64]} />
        <meshToonMaterial color={0xfea500} side={DoubleSide} />
      </mesh>
      <pointLight
        ref={highlight}
        position={[55.7, 5, 0]}
        intensity={10}
        distance={13}
        decay={0.2}
      />
    </>
  );
}
