import HomeDesktop from "./Home_Desktop";
import HomeMobile from "./Home_Mobile";
import useInitialization from "../../stores/initialization";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function Home() {
  const { width } = useViewport();
  const breakpoint = 801;

  const initilization = useInitialization((state) => state.initilization);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Home</title>
        <meta name="description" content="Un piccolo sistema solare, per raccontarti chi sono &#128584;" />
        <meta property="og:description" content="Una piccola galassia per raccontarti chi sono &#128584;" />
      </Helmet>
      {width > breakpoint ? (initilization ? <HomeDesktop /> : "") : <HomeMobile />}
    </>
  );
}
  