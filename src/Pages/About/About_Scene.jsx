import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment } from "@react-three/drei";
import { Sparkles } from "@react-three/drei";
import { DoubleSide } from "three";
import { useTexture } from "@react-three/drei";
import usePlanetPosition from "../../stores/galaxyStore";
import { Float } from "@react-three/drei";

export default function About_Scene() {
  const model = useLoader(GLTFLoader, "./Models/aboute-joey-3.gltf");
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
  const textureRing = useTexture("/Planet/Planet3/ring.jpg");

  const pointLightRef = useRef();

  useEffect(() => {
    gsap.from(pointLightRef.current, { intensity: 0, delay: 1, duration: 3 });
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
          "./Enviroment/nz.png",
          "./Enviroment/pz.png",
        ]}
      />

      <Sparkles count={10} scale={20} size={10} color={0x98378e} />
      <Sparkles count={10} scale={20} size={10} color={0xfea500} />
      <Sparkles count={10} scale={20} size={10} color={0xe74e6d} />
      <Sparkles count={10} scale={20} size={10} color={0xffffff} />

      <pointLight
        ref={pointLightRef}
        position={[1, 2, 3]}
        color={0xfcb8ff}
      />
      <ambientLight intensity={0.2} />

      <Float
        speed={0.8} // Animation speed, defaults to 1
        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <primitive
          object={model.scene}
          scale={4}
          position-x={-3}
          position-y={-1}
          rotation-y={Math.PI / 6}
        />

        <group scale={1.3} position-x={-4.1} position-y={-5} position-z={-3}>
          <mesh>
            <sphereGeometry args={[4, 16, 64]} />
            <meshStandardMaterial map={texture} color={0xa57617} />
          </mesh>
          <mesh>
            <sphereGeometry args={[4.2, 16, 16]} />
            <meshToonMaterial color={0xa57617} transparent opacity={0.1} />
          </mesh>
          <mesh rotation-x={Math.PI * 0.55}>
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
      </Float>
    </>
  );
}
