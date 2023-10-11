import { BsFillCheckCircleFill } from "react-icons/bs";
import useMobileStore from "../../../stores/mobileStore";

export default function Alert_Mobile_Landing() {
  const planetToLanding = useMobileStore((state) => state.planetToLanding);

  return (
    <>
      <div className="message alert-message">
        <BsFillCheckCircleFill className="landing-icon-yes" />
        <h3>Pianeta {planetToLanding}</h3>
        <p>
          Clicca su <span className="button-alert">J</span> per atterrare
        </p>
      </div>
    </>
  );
}
