import "./works.css";
import Works_Desktop from "./Works_Desktop";
import Works_Mobile from "./Works_Mobile";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function Works() {
  const { width } = useViewport();
  const breakpoint = 801;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Works</title>
        <meta name="description" content="Alcuni progetti che mi hanno aiutato a crescere" />
        <meta property="og:description" content="Alcuni progetti che mi hanno aiutato a crescere" />
      </Helmet>
      {width > breakpoint ? <Works_Desktop /> : <Works_Mobile />}
    </>
  );
}
