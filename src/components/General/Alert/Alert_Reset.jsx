import "./alert.css";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import usePlanetInteraction from "../../../stores/planetInteraction";
import usePlanetPosition from "../../../stores/galaxyStore";
import { BsExclamationTriangleFill } from "react-icons/bs";

export default function AlertReset(){
    const alertMessage = useRef(null);
    const tl = useRef();

    const setPlanetDistance = usePlanetInteraction((state) => state.setPlanetDistance);
    const setResetCamera = usePlanetPosition((state) => state.setResetCamera);

    useEffect(() => {
        let ctx = gsap.context(() => {
          tl.current && tl.current.progress(0).kill();
          tl.current = gsap.timeline({ onComplete: alertClosing });
          tl.current
            .from(alertMessage.current, {
                duration: 0.4,
                opacity: 0,
                y: 100,
            })
            .to(alertMessage.current, {
                duration: 2,
                opacity: 0,
            }, "<+=3")
        });
        return () => ctx.revert();
      }, []);

      const alertClosing = () => {
        setPlanetDistance(false);
        setResetCamera(true);
      };

    return(
        <p ref={alertMessage} className="message alert-message">
            <BsExclamationTriangleFill />
            <span>Attenzione Cosmonauta, ti stai allontanando troppo dalla Galassia, per evitare che tu ti perda nel vuoto siderale, avvieremo la procedura di riavvio</span>
        </p>
    )
}