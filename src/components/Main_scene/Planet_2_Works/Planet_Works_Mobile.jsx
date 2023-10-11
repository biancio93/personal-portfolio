import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { DoubleSide } from "three";
import useMobileStore from "../../../stores/mobileStore";
import { useTexture } from "@react-three/drei";
import { Vector2 } from "three";

/* DEFINITION */
export default function PlanetWorksMobile() {
  const planetWorksGroup = useRef();
  const highlight = useRef();
  const planet = useRef();

  /* POSITION REGISTRATION */
  const timeController = useMobileStore((state) => state.timeController);
  const [timeToPass, setTimeToPass] = useState(timeController);

  /* CONTROLLER ATTERRAGGIO */
  const setEnableNavigationAlert = useMobileStore((state) => state.setEnableNavigationAlert);
  const setPlanetToLanding = useMobileStore((state) => state.setPlanetToLanding);

  /* POSIZIONE DELLA navicella */
  const starshipPositionX = useMobileStore((state) => state.starshipPositionX);
  const starshipPositionZ = useMobileStore((state) => state.starshipPositionZ);

  /* DISTANZA */
  const [distance, setDistance] = useState(100);
  const [landingState, setLandingState] = useState(false);

  /* ANIMAZIONE */
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetWorksGroup.current.position.x =
      46 * Math.cos((time + 54 + timeToPass) * 0.04);
    planetWorksGroup.current.position.z =
      46 * Math.sin((time + 54 + timeToPass) * 0.04);

    highlight.current.position.x =
      45.7 * Math.cos((time + 0 + timeToPass) * 2.4);
    highlight.current.position.z =
      45.7 * Math.sin((time + 0 + timeToPass) * 2.4);

    planet.current.rotation.y = time * 0.6;

    const planetWorksPosition = new Vector2(starshipPositionX, starshipPositionZ);
    const starshipPosition = new Vector2(planetWorksGroup.current.position.x, planetWorksGroup.current.position.z);
    setDistance(Math.round(planetWorksPosition.distanceTo(starshipPosition)));
    distance < 10 ? setLandingState(true) : setLandingState(false);
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet2/color-mobile.png");

  /* ATTERRAGGIO */
  function landingPlanet(){
    setEnableNavigationAlert(true);
    setPlanetToLanding("Works");
  }

  function leavingPlanet(){
    setEnableNavigationAlert(false);
    setPlanetToLanding("none");
  }

  useEffect(() => {
    landingState === true ? landingPlanet() : leavingPlanet();
  }, [landingState])

  /* RETURN */
  return (
    <>
      <group ref={planetWorksGroup}>
        <mesh ref={planet}>
          <sphereGeometry args={[5, 16, 32]} />
          <meshToonMaterial color={0x48c0d6} map={texture} />
        </mesh>
        <mesh>
          <sphereGeometry args={[6.5, 16, 8]} />
          <meshToonMaterial color={0x48c0d6} transparent opacity={0.1} />
        </mesh>
      </group>
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[46.1, 45.9, 32]} />
        <meshToonMaterial color={0x534062} side={DoubleSide} />
      </mesh>
      <pointLight
        ref={highlight}
        position={[45.7, 5, 0]}
        intensity={10}
        distance={13}
        decay={0.2}
      />
    </>
  );
}
