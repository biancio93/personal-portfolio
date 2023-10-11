import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function CameraStandard3(props) {
  const cameraRef = useRef();

  
  const CameraPositionUpdater = () => {
    const { camera } = useThree();

    useEffect(() => {
      gsap.from(camera.position, { z: 30, y: 30, duration: 3 });
    }, [])

    return null;
  };

  return (
    <>
      <Canvas ref={cameraRef} camera={{ fov: 50, near: 0.1, far: 250, position: [0, 3, 10] }}>
      <CameraPositionUpdater />
        {props.children}
      </Canvas>
    </>
  );
}
