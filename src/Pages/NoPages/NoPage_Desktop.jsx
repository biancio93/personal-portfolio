import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
// IMPORT SEGNAPOSTO
import CameraStandard3 from "../../components/Canvas/Camera_3_standard";
import Scene from "./NoPage_Scene";

export default function NoPage_Desktop() {

  return (
    <>
      <CameraStandard3>
        <Scene />
      </CameraStandard3>
    </>
  );
}
