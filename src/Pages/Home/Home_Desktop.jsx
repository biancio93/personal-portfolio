import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import usePlanetInteraction from "../../stores/planetInteraction";
import usePlanetPosition from "../../stores/galaxyStore";
import MainScene from "../../components/Main_scene/Main_Scene";
import InternalCommandBar from "../../components/Internal_Command_Bar/Internal_Command_Bar";
import CameraStandard1 from "../../components/Canvas/Camera_1_standard";
import Alert from "../../components/General/Alert/Alert";
import AlertReset from "../../components/General/Alert/Alert_Reset";

export default function HomeDesktop() {
  const planetDistance = usePlanetInteraction((state) => state.planetDistance);
  const starshipDistanceX = usePlanetPosition((state) => state.cameraPositionX);
  const starshipDistanceY = usePlanetPosition((state) => state.cameraPositionY);
  const starshipDistanceZ = usePlanetPosition((state) => state.cameraPositionZ);

  return (
    <>
      {planetDistance ? <Alert /> : ""}
      {starshipDistanceX > 250 || starshipDistanceZ > 250 || starshipDistanceY > 150 ? <AlertReset /> : ""}
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "turbo", keys: ["KeyQ"] },
          ]}
        >
          <CameraStandard1>
            <MainScene />
          </CameraStandard1>
          <InternalCommandBar />
        </KeyboardControls>
    </>
  );
}
