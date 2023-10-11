import { Canvas } from "@react-three/fiber";
import usePlanetPosition from "../../stores/galaxyStore";
import MainSceneMobile from "../../components/Main_scene/Main_Scene_Mobile";
import CameraStandard4 from "../../components/Canvas/Camera_4_standard";

export default function HomeMobile() {
  const starshipDistanceX = usePlanetPosition((state) => state.cameraPositionX);
  const starshipDistanceY = usePlanetPosition((state) => state.cameraPositionY);
  const starshipDistanceZ = usePlanetPosition((state) => state.cameraPositionZ);

  return (
    <>
          <CameraStandard4>
            <MainSceneMobile />
          </CameraStandard4>
    </>
  );
}
