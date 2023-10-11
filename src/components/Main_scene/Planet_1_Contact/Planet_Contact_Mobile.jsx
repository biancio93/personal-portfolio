import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import useMobileStore from "../../../stores/mobileStore";
import { DoubleSide } from "three";
import { useTexture } from "@react-three/drei";
import { Vector2 } from "three";

/* DEFINITION */
export default function PlanetContactMobile() {
  const planetContactGroup = useRef();
  const planetContactOrbit = useRef();
  const planetContactMoon = useRef();
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    planetContactGroup.current.position.x =
      28 * Math.cos((time + 0 + timeToPass) * 0.05);
    planetContactGroup.current.position.z =
      28 * Math.sin((time + 0 + timeToPass) * 0.05);

    planetContactMoon.current.position.x = 6 * Math.cos(time * 0.4);
    planetContactMoon.current.position.z = 6 * Math.sin(time * 0.4);

    highlight.current.position.x = 27.7 * Math.cos((time + 0 + timeToPass) * 2.8);
    highlight.current.position.z = 27.7 * Math.sin((time + 0 + timeToPass) * 2.8);

    const starshipPosition = new Vector2(starshipPositionX, starshipPositionZ);
    const planetContactPosition = new Vector2(planetContactGroup.current.position.x, planetContactGroup.current.position.z);
    setDistance(Math.round(planetContactPosition.distanceTo(starshipPosition)));
    distance < 10 ? setLandingState(true) : setLandingState(false);
  });

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet1/color-mobile.png");

  /* ATTERRAGGIO */
  function landingPlanet(){
    setEnableNavigationAlert(true);
    setPlanetToLanding("Contact");
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
      <group ref={planetContactGroup}> 
        <mesh ref={planet}>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshToonMaterial color={0xe74e6d} map={texture}/>
        </mesh>
        <mesh>
          <sphereGeometry args={[4.5, 16, 16]} />
          <meshToonMaterial color={0xe74e6d} transparent opacity={0.1} />
        </mesh>
        <mesh ref={planetContactMoon} position={[6, 0, 0]}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshToonMaterial color={0x32f6f3} />
        </mesh>
        
      </group>
      <mesh ref={planetContactOrbit} rotation-x={Math.PI * 0.5}>
        <ringGeometry args={[28.1, 27.9, 32]} />
        <meshToonMaterial color={0x534062} side={DoubleSide} />
      </mesh>
      <pointLight ref={highlight} position={[28.7, 5, 0]} intensity={10} distance={10} decay={0.2} />
    </>
  );
}
