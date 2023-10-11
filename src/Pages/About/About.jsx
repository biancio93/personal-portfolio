import About_Desktop from "./About_Desktop";
import About_Mobile from "./About_Mobile";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function About() {
  const { width } = useViewport();
  const breakpoint = 801;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | About</title>
        <meta name="description" content="Mi chiamo Francesco Bianciardi, sono un Web Design e in questa pagina cerco di spiegarvi un pò chi sono" />
        <meta property="og:description" content="Mi chiamo Francesco Bianciardi, sono un Web Design e in questa pagina cerco di spiegarvi un pò chi sono" />
      </Helmet>
      {width > breakpoint ? <About_Desktop /> : <About_Mobile />}
    </>
  );
}
