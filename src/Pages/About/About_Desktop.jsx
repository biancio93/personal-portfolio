import "./about.css";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import PlanetBadge from "../../components/General/Planet_Order_Bedge/Planet_Order_Badge";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import DefaultParagraph2 from "../../components/General/Default_Paragraph/Default_Paragraph_2";
// IMPORT SEGNAPOSTO
import CameraStandard2 from "../../components/Canvas/Camera_2_standard";
import Scene from "./About_Scene";

export default function About_Desktop() {
  const planetNumber = "01";
  const planetName = "About";
  const titleText = "Mi Chiamo Francesco Bianciardi e sono un Web Designer / Web Developer, benvenuto!";

  const pageContainer = useRef();

  useLayoutEffect(() => {
    gsap.from(pageContainer.current, { opacity: 0, x: 500, backdropFilter: 'blur(0px)', delay: 1, duration: 2 });
  },[])

  return (
    <>
      <div ref={pageContainer} className="page-container">
        <div className="page-row col-right">
          <div className="page-col-6 col-interface">
            <div className="page-header">
              <div className="title-container">
                <SubTitle planetName={planetName} />
                <MainTitle textTitle={titleText} />
              </div>
              <div className="planet-order-container">
                <PlanetBadge pageNumber={planetNumber} />
              </div>
            </div>
            <hr className="heading-container-line"></hr>
            <div className="content-container">
              <DefaultParagraph2 />
            </div>
          </div>
        </div>
      </div>
      <CameraStandard2>
        <Scene />
      </CameraStandard2>
    </>
  );
}
