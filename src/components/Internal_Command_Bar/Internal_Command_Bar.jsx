import { useCookies } from "react-cookie";
import CommandBar from "./Keyboard/Keyboard";
import MovementLine from "./Movement_Line/Movement_Line";
import GalaxyMap from "./GalaxyMap/Galaxy_Map";
import ResetButton from "./Reset_Button/Reset_Button";
import cameraPointerLook from "./Movement_Line/camera_pointer_look.svg";
import SceneCover from "./Scene_Cover/Scene_Cover";
import Welcome_Message from "./Welcome_Message/Welcome_Message";
import { useState, useEffect } from "react";

export default function InternalCommandBar() {
  const [sceneCover, setSceneCover] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const [cookies, setCookie] = useCookies(['visited']);

  return (
    <>
      <CommandBar />
      <GalaxyMap />
      <MovementLine />
      <ResetButton />
      <img
        src={cameraPointerLook}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "2",
          opacity: "0.5",
        }}
      />
      {sceneCover ? <SceneCover setSceneCover={setSceneCover} /> : ""}
      {welcomeMessage && !cookies.visited ? <Welcome_Message setWelcomeMessage={setWelcomeMessage} setCookie={setCookie}/> : ""}
    </>
  );
}
