import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import PlanetBadge from "../../components/General/Planet_Order_Bedge/Planet_Order_Badge";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import Contact_Form from "../../components/Contact_Form/Contact_Form";
import { BsMailbox, BsTelephoneFill, BsWhatsapp, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
// IMPORT SEGNAPOSTO
import CameraStandard2 from "../../components/Canvas/Camera_2_standard";
import Scene from "./Contact_Scene";

export default function Contact_Desktop() {
  const planetNumber = "03";
  const planetName = "Contact";
  const titleText = "Benvenuto alla postazione di contatto Utente!";

  const pageContainer = useRef();

  useLayoutEffect(() => {
    gsap.from(pageContainer.current, { opacity: 0, x: 500, backdropFilter: 'blur(0px)', delay: 1, duration: 2 });
  },[])

  return (
    <>
      <div ref={pageContainer} className="page-container">
        <div className="page-row col-right">
          <div className="page-col-7 col-interface">
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
            <div className="page-row">
              <div className="page-col-8">
                <Contact_Form />
              </div>
              <div className="page-col-4">
                <div className="contact-link-container">
                  <a href="https://wa.me/+393483676237" target="_blank" className="about-link">
                    <BsWhatsapp /> <span>+39 3483676237</span>
                  </a>
                  <a href="tel:+393483676237" target="_blank" className="about-link">
                    <BsTelephoneFill /> <span>+39 3483676237</span>
                  </a>
                  <a href="mailto:francesco.bianciardi.93@gmail.com" target="_blank" className="about-link">
                    <BsMailbox /> <span>francesco.bianciardi.93@gmail.com</span>
                  </a>
                </div>
                <div className="contact-social-container">
                  <span className="social-separator"></span>
                  <a href="https://www.instagram.com/joey_the_astronaut/" target="_blank"><BsInstagram /></a>
                  <a href="https://github.com/biancio93" target="_blank"><BsGithub /></a>
                  <a href="https://www.linkedin.com/in/francescobianciardi/" target="_blank"><BsLinkedin /></a>
                </div>
              </div>
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
