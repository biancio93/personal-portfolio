import PrivacyPolicyContent from "./Privacy_Policy_Content";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SpaceJoey | Privacy Policy</title>
        <meta name="description" content="Privacy Policy del sito" />
        <meta property="og:description" content="Privacy Policy del sito" />
      </Helmet>
      <PrivacyPolicyContent />
    </>
  );
}
