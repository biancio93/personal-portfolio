import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Sparkles } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Pixelation } from "@react-three/postprocessing";
import useMobileStore from "../../stores/mobileStore";
import PlanetAboutMobile from "./Planet_3_About/Planet_About_Mobile";
import PlanetWorksMobile from "./Planet_2_Works/Planet_Works_Mobile";
import PlanetContactMobile from "./Planet_1_Contact/Planet_Contact_Mobile";
import gsap from "gsap";

export default function MainSceneMobile() {
  const starShip = useRef();
  const starshipAngle = useMobileStore((state) => state.starshipAngle);
  const starshipMove = useMobileStore((state) => state.starshipMove);

  /* STARSHIP POSITION */
  const starshipPositionX = useMobileStore((state) => state.starshipPositionX);
  const starshipPositionY = useMobileStore((state) => state.starshipPositionY);
  const starshipPositionZ = useMobileStore((state) => state.starshipPositionZ);

  const setStarshipPositionX = useMobileStore(
    (state) => state.setStarshipPositionX
  );
  const setStarshipPositionZ = useMobileStore(
    (state) => state.setStarshipPositionZ
  );

  const mesh = useRef();

  /* ============================================== ANIMAZIONE */
  useFrame((state, clock) => {
    const time = state.clock.getElapsedTime();

    setStarshipPositionX(starShip.current.position.x);
    setStarshipPositionZ(starShip.current.position.z);

    /* CONTROLLO LA NAVETTA */
    starShip.current.rotation.z = starshipAngle;
    if (starshipMove === true) {
      const speed = 2;
      const deltaX = -Math.sin(starshipAngle) * speed;
      const deltaZ = -Math.cos(starshipAngle) * speed;

      // starShip.current.position.x += deltaX;
      // starShip.current.position.z += deltaZ;
      gsap.to(starShip.current.position, {x: "+=" + deltaX, z: "+=" + deltaZ })
    } else {
    }
  });

  return (
    <>
      <EffectComposer>
        <Pixelation granularity={5} />
      </EffectComposer>

      {/* ============================================== STELLE */}
      <Sparkles count={100} scale={200} size={25} color={0x98378e} />
      <Sparkles count={100} scale={200} size={20} color={0xfea500} />
      <Sparkles count={100} scale={200} size={25} color={0xe74e6d} />
      <Sparkles count={100} scale={200} size={20} color={0xffffff} />

      {/* ============================================== LIGHTS */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={200}
        decay={1}
        color={0xffe7c0}
      />
      <directionalLight
        position={[10, 10, 56]}
        intensity={0.5}
        color={0xf8780c}
      />
      <ambientLight intensity={0.3} />

      {/* ============================================== OBJECTS - SUN */}

      <mesh>
        <sphereGeometry args={[10, 16, 64]} />
        <MeshDistortMaterial
          color={0xf8780c}
          transparent={true}
          opacity={0.5}
          distort={0.5}
          speed={4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[8, 16, 16]} />
        <MeshDistortMaterial color={0xf8780c} distort={0.3} />
      </mesh>

      {/* ============================================== OBJECTS - PLANETS */}

      <PlanetAboutMobile />
      <PlanetWorksMobile />
      <PlanetContactMobile />

      {/* ============================================== OBJECTS - STARSHIP */}

      <group
        ref={starShip}
        position={[starshipPositionX, starshipPositionY, starshipPositionZ]}
        rotation-x={-Math.PI / 2}
      >
        <mesh>
          <coneGeometry args={[3, 6, 4]} />
          <meshToonMaterial color={0xf5a214} />
        </mesh>
        <mesh position={[0, -4, 0]}>
          <coneGeometry args={[3, -3, 4]} />
          <meshToonMaterial color={0xAC7311} />
        </mesh>
        <pointLight
          position={[0, -1, 0]}
          intensity={2}
          distance={25}
          decay={1}
          color={0xc162fe}
        />
      </group>

      {/* ============================================== OBJECTS - Plane */}
      <mesh position-y={-10} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[400, 32]} />
        <meshStandardMaterial color={0x220b31} />
      </mesh>
    </>
  );
}
