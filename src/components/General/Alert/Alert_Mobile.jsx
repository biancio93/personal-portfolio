import { BsFillXCircleFill } from "react-icons/bs";
import useMobileStore from "../../../stores/mobileStore";
import { useEffect } from "react";

export default function Alert_Mobile() {
  const setDenayNavigationAlert = useMobileStore((state) => state.setDenayNavigationAlert);
  const enableNavigationAlert = useMobileStore((state) => state.enableNavigationAlert);

  const autoclose = setTimeout(() => {
    setDenayNavigationAlert(false);
  }, 4500);

  useEffect(() => {
    enableNavigationAlert ? setDenayNavigationAlert(false) : "";
  }, [enableNavigationAlert]);

  return (
    <>
      <div className="message alert-message">
        <BsFillXCircleFill className="landing-icon-not" />
        <p>
          Sei ancora troppo lontano per poter effettuare un atterraggio. Avvicinati ancora un pò al pianeta e ritenta Cosmonauta!
        </p>
      </div>
    </>
  );
}