import { FirstPersonControls } from "@react-three/drei";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import usePlanetPosition from "../../stores/galaxyStore";
import { useFrame } from "@react-three/fiber";
import useInterfaceSetting from "../../stores/interfaceStore";
import PlanetContact from "./Planet_1_Contact/Planet_Contact";
import PlanetWorks from "./Planet_2_Works/Planet_Works";
import PlanetAbout from "./Planet_3_About/Planet_About";
import { MeshDistortMaterial } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Sparkles } from "@react-three/drei";

import { Perf } from "r3f-perf";

export default function MainScene() {
  const controlsEnabled = useInterfaceSetting((state) => state.controlsEnabled);
  const [turboMovementSpeed, setTurboMovementSpeed] = useState(false);
  const [standardMovementSpeed, setStandardMovementSpeed] = useState(6);
  const turbo = useKeyboardControls((state) => state.turbo);
  const setTime = usePlanetPosition((state) => state.setTimeController);
  const unmountTime = useRef(null);
  const controlsRef = useRef();

  const resetController = usePlanetPosition((state) => state.resetCamera);
  const setResetController = usePlanetPosition((state) => state.setResetCamera);

  useEffect(() => {
    if (turbo === true) {
      if (turboMovementSpeed === true) {
        setTurboMovementSpeed((turboMovementSpeed) => !turboMovementSpeed);
        setStandardMovementSpeed((standardMovementSpeed) => 6);
      } else {
        setTurboMovementSpeed((turboMovementSpeed) => !turboMovementSpeed);
        setStandardMovementSpeed((standardMovementSpeed) => 16);
      }
    }
  }, [turbo]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    unmountTime.current = time;
  });

  useEffect(() => {
    return () => {
      console.log("cleaning up -->" + unmountTime.current);
      setTime(unmountTime.current);
    };
  }, []);

  useEffect(() => {
    if (resetController === true){
      controlsRef.current.lookAt(0, 0, 0)
    }
  }, [resetController])

  return (
    <>

      {/* ============================================== PERFORMANCE
      <Perf /> */}

      <Environment
        background
        files={[
          "./Enviroment/px.png",
          "./Enviroment/nx.png",
          "./Enviroment/ny.png",
          "./Enviroment/py.png",
          "./Enviroment/nz.png",
          "./Enviroment/pz.png",
        ]}
      />

      {/* ============================================== NEBBIA */}
      <fog attach="fog" args={["#280f36", 150, 250]} />

      {/* ============================================== STELLE */}
      <Sparkles count={100} scale={300} size={50} color={0x98378e} />
      <Sparkles count={100} scale={300} size={50} color={0xfea500} />
      <Sparkles count={100} scale={300} size={50} color={0xe74e6d} />
      <Sparkles count={100} scale={300} size={50} color={0xffffff} />

      {/* ============================================== FIRST PERSON CONTROL */}
      <FirstPersonControls
        ref={controlsRef}
        makeDefault
        activeLook
        enabled={controlsEnabled}
        lookSpeed={0.02}
        movementSpeed={standardMovementSpeed}
      />

      {/* ============================================== LIGHTS */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1}
        distance={300}
        decay={1}
        castShadow={true}
      />
      <directionalLight
        position={[10, 10, 56]}
        intensity={0.5}
        color={0xf8780c}
      />
      <ambientLight intensity={0.2} />

      {/* ============================================== OBJECTS - SUN */}

      <mesh>
        <sphereGeometry args={[16, 16, 32]} />
        <MeshDistortMaterial
          color={0xf8780c}
          transparent={true}
          opacity={0.5}
          distort={0.4}
          speed={4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[14, 16, 32]} />
        <MeshDistortMaterial color={0xf8780c} distort={0.2} />
      </mesh>

      {/* ============================================== OBJECTS - PLANETS */}
      <PlanetContact />
      <PlanetWorks />
      <PlanetAbout />
    </>
  );
}
