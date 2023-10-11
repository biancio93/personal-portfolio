import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment } from "@react-three/drei";
import { Sparkles } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { Text3D } from "@react-three/drei";
import usePlanetPosition from "../../stores/galaxyStore";
import NoPage_Alert from "./NoPage_Banner";

export default function NoPage_Scene() {
  const [messageReveal, setMessageReveal] = useState(false);

  const model = useLoader(GLTFLoader, "./Models/nopage-joey-1.gltf");
  model.scene.children[0].castShadow = true;
  model.scene.receiveShadow = true;

  /* POSITION REGISTRATION */
  const setPaPositionX = usePlanetPosition((state) => state.setPaPositionX);
  const setPaPositionZ = usePlanetPosition((state) => state.setPaPositionZ);
  const setPwPositionX = usePlanetPosition((state) => state.setPwPositionX);
  const setPwPositionZ = usePlanetPosition((state) => state.setPwPositionZ);
  const setPcPositionX = usePlanetPosition((state) => state.setPcPositionX);
  const setPcPositionZ = usePlanetPosition((state) => state.setPcPositionZ);
  const worksPositionInitial = usePlanetPosition(
    (state) => state.pwPositionInitial
  );
  const contactPositionInitial = usePlanetPosition(
    (state) => state.pcPositionInitial
  );
  const frameController = usePlanetPosition((state) => state.frameController);
  const timeController = usePlanetPosition((state) => state.timeController);
  let controllerPosition = 0;

  /* LOAD TEXTURE */
  const texture = useTexture("/Planet/Planet3/color-hd.png");

  const pointLightRef = useRef();

  const revealMessage = (() => {
    setMessageReveal(true)
  })

  useEffect(() => {
    gsap.from(pointLightRef.current, { intensity: 0, delay: 1, duration: 3, onComplete:revealMessage });
  }, []);

  /* ANIMAZIONE */
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    controllerPosition++;
    if (controllerPosition === 0 || controllerPosition === frameController) {
      setPaPositionX(96 * Math.cos((time + 22 + timeController) * 0.03));
      setPaPositionZ(96 * Math.sin((time + 22 + timeController) * 0.03));
      setPwPositionX(
        worksPositionInitial * Math.cos((time + 54 + timeController) * 0.04)
      );
      setPwPositionZ(
        worksPositionInitial * Math.sin((time + 54 + timeController) * 0.04)
      );
      setPcPositionX(
        contactPositionInitial * Math.cos((time + 0 + timeController) * 0.05)
      );
      setPcPositionZ(
        contactPositionInitial * Math.sin((time + 0 + timeController) * 0.05)
      );
      controllerPosition = 0;
    }
  });

  return (
    <>
      {/* ============================================== NEBBIA */}
      <fog attach="fog" args={["#280f36", 10, 20]} />

      <Environment
        background
        files={[
          "./Enviroment/px.png",
          "./Enviroment/nx.png",
          "./Enviroment/ny.png",
          "./Enviroment/py.png",
          "./Enviroment/pz.png",
          "./Enviroment/nz.png",
        ]}
      />

      <Sparkles count={10} scale={20} size={10} color={0x98378e} />
      <Sparkles count={10} scale={20} size={10} color={0xfea500} />
      <Sparkles count={10} scale={20} size={10} color={0xe74e6d} />
      <Sparkles count={10} scale={20} size={10} color={0xffffff} />

      <pointLight
        ref={pointLightRef}
        position={[0, 10, 3]}
        color={0xfcb8ff}
        castShadow
      />
      <ambientLight intensity={0.2} />

      <primitive
        object={model.scene}
        scale={4}
        position-x={0.3}
        position-y={-2}
        position-z={-3}
        rotation-y={-Math.PI / 4}
      />

      <Text3D
        letterSpacing={0.06}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        size={3.5}
        position-x={-12}
        position-y={-3}
        position-z={-5}
        font="/Fonts/Oswald_Bold.json"
      >
        PAGE
        <meshStandardMaterial metalness={0.8} color="white" />
      </Text3D>

      <Text3D
        letterSpacing={1}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        size={3.5}
        position-x={2.5}
        position-y={-3}
        position-z={-5}
        font="/Fonts/Oswald_Bold.json"
      >
        404
        <meshStandardMaterial metalness={0.8} color="white" />
      </Text3D>

      <group scale={1.3} position-x={0} position-y={-7} position-z={-3}>
        <mesh>
          <sphereGeometry args={[4, 16, 64]} />
          <meshStandardMaterial map={texture} color={0xa57617} />
        </mesh>
        <mesh>
          <sphereGeometry args={[4.2, 16, 16]} />
          <meshToonMaterial color={0xa57617} transparent opacity={0.1} />
        </mesh>
        {messageReveal ? <NoPage_Alert /> : ""}
      </group>
    </>
  );
}
