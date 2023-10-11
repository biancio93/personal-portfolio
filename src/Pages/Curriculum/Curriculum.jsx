import "./curriculum.css";
import CurriculumDesktop from "./Curriculum_Desktop";
import CurriculumMobile from "./Curriculum_Mobile";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function Curriculum() {
  const { width } = useViewport();
  const breakpoint = 801;

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Curriculum</title>
        <meta name="description" content="Francesco Bianciardi, Web Designer / Front End Developer Wanna Be" />
        <meta property="og:description" content="Francesco Bianciardi, Web Designer / Front End Developer Wanna Be" />
      </Helmet>
      {width > breakpoint ? <CurriculumDesktop /> : <CurriculumMobile />}
    </>
  );
}
