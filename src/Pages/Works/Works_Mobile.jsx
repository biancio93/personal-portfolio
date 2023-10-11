import gsap from "gsap";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import BackToSpaceButtonMobile from "../../components/External_Command_Bar/Back_to_Space_Button/Back_to_Space_Button_Mobile";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import useMobileStore from "../../stores/mobileStore";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import worksData from "./Works.json";
import WorksCardMobile from "./Works_Card_Mobile";

export default function Works_Mobile() {
  const [cardVisible, setCardVisible] = useState(null);

  const planetName = "Works";
  const titleText = "Dai un occhiata ad alcuni dei miei lavori";
  const mobilePageHeader = useRef(null);
  const mobileContentContainer = useRef(null);
  const tl = useRef();

  const mobileContainer = useRef(null);
  const screenHeight = useMobileStore((state) => state.screenHeight);
  const setLazyTrick = useMobileStore((state) => state.setLazyTrick);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({ delay: 0.4 });

      tl.current
        .from(mobilePageHeader.current, { duration: 0.4, y: -100, opacity: 0 })
        .from(mobilePageHeader.current, {
          duration: 0.4,
          background:
            "linear-gradient( 0deg, rgba(247, 62, 162, 0.2) 0%, rgb(20, 4, 36) 0% )",
        })
        .from(
          mobileContentContainer.current,
          { duration: 0.4, y: 50, opacity: 0 },
          "<"
        );
    }, mobileContainer.current);

    return () => ctx.revert();
  });

  const mouseHoverIn = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      backgroundImage:
        "linear-gradient( 90deg, rgb(254, 165, 0, 0.18) 0%, rgba(254, 165, 0, 0) 51%, rgba(254, 165, 0, 0) 100% )",
      borderLeftColor: "#fea500",
      x: 10,
    });
  };

  const mouseHoverOut = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      backgroundImage:
        "linear-gradient( 90deg, rgb(254, 165, 0, 0.18) 0%, rgba(254, 165, 0, 0) 0%, rgba(254, 165, 0, 0) 0% )",
      borderLeftColor: "#ffffff7a",
      x: 0,
    });
  };

  const mouseClick = (item) => {
    setCardVisible(item);
    mobileContainer.current.style.overflowY = "hidden";
  };

  const mouseClickClosing = () => {
    setCardVisible(null);
    mobileContainer.current.style.overflowY = "auto";
  };

  useEffect(() => {
    mobileContainer.current.style.height = `${screenHeight}px`;
  }, [screenHeight]);

  useEffect(() => {
    setLazyTrick();
  }, []);


  return (
    <>
      <section ref={mobileContainer} className="mobile-page-container">
      {cardVisible ? (
        <WorksCardMobile
          title={cardVisible.title}
          type={cardVisible.type}
          year={cardVisible.year}
          description={cardVisible.description}
          link={cardVisible.link}
          image={cardVisible.image}
          altimage={cardVisible.altimage}
          closing={mouseClickClosing}
        />
      ) : (
        ""
      )}
        <div ref={mobilePageHeader} className="mobile-page-header">
          <BackToSpaceButtonMobile />
          <div className="title-container">
            <SubTitle planetName={planetName} />
            <MainTitle textTitle={titleText} />
          </div>
          <hr className="heading-container-line"></hr>
        </div>
        <div ref={mobileContentContainer} className="mobile-content-container">
          <div className="content-container-works">
            {worksData.map((item) => (
              <article
                key={item.id}
                className="card-container"
                onMouseEnter={mouseHoverIn}
                onMouseLeave={mouseHoverOut}
                onClick={() => mouseClick(item)}
              >
                <h3 className="card-info-title">{item.title}</h3>
                <div className="card-info-container">
                  <p>
                    <span>
                      Tipologia : <em>{item.type}</em>
                    </span>
                    <span>
                      Anno : <em>{item.year}</em>
                    </span>
                  </p>
                  <button className="discover-button">discover more _</button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <FooterMobile />
      </section>
    </>
  );
}
