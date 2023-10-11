import { useRef, useEffect, useState} from "react";
import MovementLineStandard from "./Movement_Line_Standard";
import { useKeyboardControls } from "@react-three/drei";

export default function MovementLine() {
  const [turboController, setTurboController] = useState(false);
  const forward = useKeyboardControls((state) => state.forward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const turbo = useKeyboardControls((state) => state.turbo);

  let movmentRadiusMin = useRef(500); // 500 standard & 200 turbo
  let movmentRadiusMax = useRef(700);

  useEffect(() => {
    if (turbo === true) {
      if (turboController === true) {
        setTurboController((turboController) => !turboController);
        movmentRadiusMin.current = 500;
        movmentRadiusMax.current = 700;
      } else {
        setTurboController((turboController) => !turboController);
        movmentRadiusMin.current = 200;
        movmentRadiusMax.current = 300;
      }
    }
  }, [turbo]);

  return (
    <>{forward === true || leftward === true || rightward === true ? <MovementLineStandard movmentradiusmin={movmentRadiusMin.current} movmentradiusmax={movmentRadiusMax.current} /> : ""}</>
  );
}
