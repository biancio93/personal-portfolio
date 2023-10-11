import gsap from "gsap";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import BackToSpaceButtonMobile from "../../components/External_Command_Bar/Back_to_Space_Button/Back_to_Space_Button_Mobile";
import Contact_Form from "../../components/Contact_Form/Contact_Form";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import useMobileStore from "../../stores/mobileStore";
import { useLayoutEffect, useEffect, useRef } from "react";
import { BsMailbox, BsTelephoneFill, BsWhatsapp, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

export default function Contact_Mobile() {
  const planetNumber = "03";
  const planetName = "Contact";
  const titleText = "Benvenuto alla postazione di contatto Utente!";
  const mobilePageHeader = useRef(null);
  const mobileContentContainer = useRef(null);
  const tl = useRef();

  const mobileContainer = useRef(null);
  const screenHeight = useMobileStore((state) => state.screenHeight);
  const setLazyTrick = useMobileStore((state) => state.setLazyTrick);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        tl.current = gsap.timeline({delay: 0.4});

        tl.current
          .from(mobilePageHeader.current, { duration: 0.4, y: -100, opacity: 0})
          .from(mobilePageHeader.current, { duration: 0.4, background: "linear-gradient( 0deg, rgba(247, 62, 162, 0.2) 0%, rgb(20, 4, 36) 0% )"})
          .from(mobileContentContainer.current, { duration: 0.4, y: 50, opacity: 0}, "<")
      }, mobileContainer.current);
  
      return () => ctx.revert();
  })

  useEffect(() => {
    mobileContainer.current.style.height = `${screenHeight}px`;
  }, [screenHeight]);

  useEffect(() => {
    setLazyTrick();
  }, []);

  return (
    <>
      <section ref={mobileContainer} className="mobile-page-container">
        <div ref={mobilePageHeader} className="mobile-page-header">
          <BackToSpaceButtonMobile />
          <div className="title-container">
            <SubTitle planetName={planetName} />
            <MainTitle textTitle={titleText} />
          </div>
          <hr className="heading-container-line"></hr>
        </div>
        <div ref={mobileContentContainer} className="mobile-content-container">
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
        <FooterMobile />
      </section>
    </>
  );
}
