import NoPage_Desktop from "./NoPage_Desktop";
import NoPage_Mobile from "./NoPage_Mobile";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function NoPage() {
  const { width } = useViewport();
  const breakpoint = 801;

    return (
      <>
<Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | 404</title>
        <meta name="description" content="Non ho idea di dove diavolo siamo" />
        <meta property="og:description" content="Non ho idea di dove diavolo siamo" />
      </Helmet>
        {width > breakpoint ? <NoPage_Desktop /> : <NoPage_Mobile />}
      </>
    );
  }