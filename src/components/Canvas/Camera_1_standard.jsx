import { useFrame } from "@react-three/fiber";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import usePlanetPosition from "../../stores/galaxyStore";

export default function CameraStandard1(props) {
  /* POSITION REGISTRATION */
  const setcameraPositionX = usePlanetPosition(
    (state) => state.setcameraPositionX
  );
  const setcameraPositionY = usePlanetPosition(
    (state) => state.setcameraPositionY
  );
  const setcameraPositionZ = usePlanetPosition(
    (state) => state.setcameraPositionZ
  );
  const setcameraRotation = usePlanetPosition(
    (state) => state.setcameraRotation
  );
  const frameController = usePlanetPosition((state) => state.frameController);
  const resetController = usePlanetPosition((state) => state.resetCamera);
  const setResetController = usePlanetPosition((state) => state.setResetCamera);

  /* POSITION REGISTRATION */
  const cameraPositionX = usePlanetPosition((state) => state.cameraPositionX);
  const cameraPositionZ = usePlanetPosition((state) => state.cameraPositionZ);
  const cameraPositionY = usePlanetPosition((state) => state.cameraPositionY);

  let controllerPosition = 0;

  /* ANIMAZIONE MAPPA*/
  const CameraPositionUpdater = () => {
    const { camera } = useThree();

    useFrame(({ camera }) => {
      controllerPosition++;
      if (controllerPosition === 0 || controllerPosition === frameController) {
        setcameraPositionX({ camera }.camera.position.x);
        setcameraPositionY({ camera }.camera.position.y);
        setcameraPositionZ({ camera }.camera.position.z);
        camera.rotation.order = "YXZ";
        setcameraRotation({ camera }.camera.rotation.y);
        controllerPosition = 0;
      };
    });

    useEffect(() => {
      if (resetController === true){
        camera.position.x = 0;
        camera.position.z = 200;
        camera.position.y = 70;
        setResetController(false);
      }
    }, [resetController])

    return null;
  };

  return (
    <>
      <Canvas
        camera={{
          fov: 50,
          near: 0.1,
          far: 250,
          position: [cameraPositionX, cameraPositionY, cameraPositionZ],
        }}
      >
        <CameraPositionUpdater />
        {props.children}
      </Canvas>
    </>
  );
}
