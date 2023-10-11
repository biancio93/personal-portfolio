import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(TextPlugin);

export default function PlanetInfoTitle(props){
    const planetNameTitle = useRef(null);

    useEffect(() => {
        gsap.from(planetNameTitle.current, {text: " ", duration: 0.2})
    }, [])

    return(
        <h3 ref={planetNameTitle} className="planet-info-name">{props.planetName}</h3>
    )
}