import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import useMobileStore from "../../../stores/mobileStore";
import { useTexture } from "@react-three/drei";
import { Vector2 } from "three";

/* DEFINITION */
export default function PlanetAboutMobile(props) {
  const planetAboutGroup = useRef();
  const highlight = useRef();
  const planet = useRef();
  const planetRing = useRef();

  /* POSITION REGISTRATION */
  const timeController = useMobileStore((state) => state.timeController);
  const setTimeController = useMobileStore((state) => state.setTimeController);
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
    setTimeController(time);
    planetAboutGroup.current.position.x =
      70 * Math.cos((time + 22 + timeToPass) * 0.03);
    planetAboutGroup.current.position.z =
      70 * Math.sin((time + 22 + timeToPass) * 0.03);

    highlight.current.position.x =
      69.7 * Math.cos((time + 0 + timeToPass) * 2);
    highlight.current.position.z =
      69.7 * Math.sin((time + 0 + timeToPass) * 2);

    planet.current.rotation.y = time * 0.5;
    planetRing.current.rotation.z = -time * 0.8;

    const planetAboutPosition = new Vector2(starshipPositionX, starshipPositionZ);
    const starshipPosition = new Vector2(planetAboutGroup.current.position.x, planetAboutGroup.current.position.z);
    setDistance(Math.round(planetAboutPosition.distanceTo(starshipPosition)));
    distance < 10 ? setLandingState(true) : setLandingState(false);
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet3/color-mobile.jpg");
  const textureRing = useTexture("/Planet/Planet3/ring-mobile.jpg");

  /* ATTERRAGGIO */
  function landingPlanet(){
    setEnableNavigationAlert(true);
    setPlanetToLanding("About");
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
      <group ref={planetAboutGroup}>
        <mesh ref={planet}>
          <sphereGeometry args={[4, 16, 32]} />
          <meshToonMaterial map={texture} color={0xa57617} />
        </mesh>
        <mesh>
          <sphereGeometry args={[5.5, 16, 16]} />
          <meshToonMaterial color={0xa57617} transparent opacity={0.1} />
        </mesh>
        <mesh ref={planetRing} rotation-x={Math.PI * 0.55}>
          <ringGeometry args={[10, 7, 16]} />
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
      <mesh rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[70.1, 69.9, 32]} />
        <meshToonMaterial color={0x534062} side={DoubleSide} />
      </mesh>
      <pointLight
        ref={highlight}
        position={[69.7, 5, 0]}
        intensity={10}
        distance={15}
        decay={0.2}
      />
    </>
  );
}
