import CookiePolicyContent from "./Cookie_Policy_Content";
import { Helmet } from "react-helmet";

export default function CookiePolicy() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Cookie Policy</title>
        <meta name="description" content="Cookie Policy del sito" />
        <meta property="og:description" content="Cookie Policy del sito" />
      </Helmet>
      <CookiePolicyContent />
    </>
  );
}
