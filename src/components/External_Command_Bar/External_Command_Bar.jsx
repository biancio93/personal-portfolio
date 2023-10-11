import "./externalbar.css";
import ExternalCommandBarDesktop from "./External_Command_Bar_Desktop";
import useViewport from "./Responsive/Use_Viewport";
import ExternalCommandBarMobile from "./External_Command_Bar_Mobile";

export default function ExternalCommandBar() {
  const { width } = useViewport();
  const breakpoint = 801;

  return (
    <>
    {width > breakpoint ? <ExternalCommandBarDesktop /> : <ExternalCommandBarMobile />}
    </>
  );
}
