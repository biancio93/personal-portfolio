import Works_Desktop_Content from "./Works_Desktop_Content";
// IMPORT SEGNAPOSTO
import CameraStandard2 from "../../components/Canvas/Camera_2_standard";
import Scene from "./Works_Scene";

export default function Works_Desktop() {
  return (
    <>
      <Works_Desktop_Content />
      <CameraStandard2>
        <Scene />
      </CameraStandard2>
    </>
  );
}
