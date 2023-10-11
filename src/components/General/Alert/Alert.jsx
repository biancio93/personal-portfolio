import "./alert.css";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import usePlanetInteraction from "../../../stores/planetInteraction";
import { BsFillXCircleFill } from "react-icons/bs";

export default function Alert(){
    const alertMessage = useRef(null);
    const tl = useRef();

    const setPlanetDistance = usePlanetInteraction((state) => state.setPlanetDistance);

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
        setPlanetDistance(false)
      };

    return(
        <p ref={alertMessage} className="message alert-message">
            <BsFillXCircleFill />
            <span>Sei ancora troppo lontano per poter effettuare un atterraggio. Avvicinati ancora un pò al pianeta e ritenta Cosmonauta!</span>
        </p>
    )
}