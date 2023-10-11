import * as THREE from 'three'
import { useThree } from '@react-three/fiber';
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import useMobileStore from "../../stores/mobileStore";
import Alert_Mobile_Landing from '../General/Alert/Alert_Mobile_Landing';
import Alert_Mobile from '../General/Alert/Alert_Mobile';

export default function CameraStandard4(props) {
  const mobileContainer = useRef(null);
  const screenHeight = useMobileStore((state) => state.screenHeight);
  const setLazyTrick = useMobileStore((state) => state.setLazyTrick);

  const starshipPositionX = useMobileStore((state) => state.starshipPositionX);
  const starshipPositionZ = useMobileStore((state) => state.starshipPositionZ);

  const enableNavigationAlert = useMobileStore((state) => state.enableNavigationAlert);
  const denayNavigationAlert = useMobileStore((state) => state.denayNavigationAlert);

  useEffect(() => {
    mobileContainer.current.style.height = `${screenHeight}px`;
  }, [screenHeight]);

  useEffect(() => {
    setLazyTrick();
  }, []);

  /* ANIMAZIONE CAMERA */
  const CameraPositionUpdater = () => {
    const { camera } = useThree();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
      setIsFirstRender(false);
    }, []);

    useEffect(() => {
      if(isFirstRender === true){
        gsap.to(camera.position, {x: starshipPositionX, z: starshipPositionZ, duration: 1.5});
      } else {
        gsap.to(camera.position, {x: starshipPositionX, z: starshipPositionZ});
      }
    }, [starshipPositionX, starshipPositionZ])

    return null;
  };

  return (
    <>
      <div ref={mobileContainer} className="mobile-page-container canvas-mobile-container">
      {enableNavigationAlert ? <Alert_Mobile_Landing /> : ""}
      {denayNavigationAlert ? <Alert_Mobile /> : ""}
        <Canvas
          camera={{ fov: 50, near: 0.1, far: 250, position: [0, 100, 0] }}
        >
          <CameraPositionUpdater />
          {props.children}
        </Canvas>
      </div>
    </>
  );
}
