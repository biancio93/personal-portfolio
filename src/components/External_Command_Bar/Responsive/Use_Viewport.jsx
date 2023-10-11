import { useContext } from "react";
import { ViewportContext } from "./Viewport_Provider";

export default function useViewport(){
  const { width, height } = useContext(ViewportContext);
  return { width, height };
}