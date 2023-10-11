import "./works.css";
import { gsap } from "gsap";
import { useState, useRef, useLayoutEffect } from "react";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import PlanetBadge from "../../components/General/Planet_Order_Bedge/Planet_Order_Badge";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import worksData from "./Works.json";
import WorksCard from "./Works_Card";

export default function Works_Desktop_Content() {
  const [cardVisible, setCardVisible] = useState(null);

  const planetNumber = "02";
  const planetName = "Works";
  const titleText = "Dai un occhiata ad alcuni dei miei lavori";

  const pageContainer = useRef();

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
  };

  const mouseClickClosing = () => {
    setCardVisible(null);
  };

  useLayoutEffect(() => {
    gsap.from(pageContainer.current, { opacity: 0, x: 500, backdropFilter: 'blur(0px)', delay: 1, duration: 2 });
  },[])

  return (
    <>
      {cardVisible ? (
        <WorksCard
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
        </div>
      </div>
    </>
  );
}
