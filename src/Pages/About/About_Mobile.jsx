import gsap from "gsap";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import DefaultParagraphMobile from "../../components/General/Default_Paragraph/Default_Paragraph_Mobile";
import BackToSpaceButtonMobile from "../../components/External_Command_Bar/Back_to_Space_Button/Back_to_Space_Button_Mobile";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import useMobileStore from "../../stores/mobileStore";
import { useLayoutEffect, useEffect, useRef } from "react";

export default function About_Mobile() {
  const planetName = "About";
  const titleText =
    "Mi Chiamo Francesco Bianciardi e sono un Web Designer / Web Developer, benvenuto!";
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
    //mobileContainer.current.style.height = `${screenHeight}px`;
    gsap.fromTo(mobileContainer.current, {height: "50vh"}, {duration: 0.4, height: screenHeight})
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
          <DefaultParagraphMobile />
        </div>
        <FooterMobile />
      </section>
    </>
  );
}
