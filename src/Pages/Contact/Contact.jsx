import "./contact.css";
import Contact_Desktop from "./Contact_Desktop";
import Contact_Mobile from "./Contact_Mobile";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { Helmet } from "react-helmet";

export default function Contact() {
  const { width } = useViewport();
  const breakpoint = 801;

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Contact</title>
        <meta name="description" content="Come contattarmi, scrivi pure se vuoi fare due chiacchere" />
        <meta property="og:description" content="Come contattarmi, scrivi pure se vuoi fare due chiacchere" />
      </Helmet>
      {width > breakpoint ? <Contact_Desktop /> : <Contact_Mobile />}
    </>
  );
}
