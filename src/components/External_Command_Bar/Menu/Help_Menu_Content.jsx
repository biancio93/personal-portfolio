import "./menu.css";
import {
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
  createContext
} from "react";
import { gsap } from "gsap";
import HelpCard from "./Menu_Help_Card";
import HelpStartCard from "./Menu_Start_Card";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { HelpContext } from "../Menu_Button/Help_Button";

export const SlideContext = createContext();

export default function MenuContentHelp() {
  const [count, setCount] = useState(0);
  const [slide, setSlide] = useState(false);
  const [slideController, setSlideController] = useState(0);
  const [arrowPress, setArrowPress] = useState("");

  const [data, setData] = useState([]);
  const [listItems, setListItems] = useState([]);

  const [listItemsLenght, setListItemsLenght] = useState(0);

  const menuContent = useRef();
  const tl = useRef();

  // uso react context per passare un boolean dall'elemento parent menu button
  const [
    menuController,
    setMenuController,
    internMenuController,
    setInternMenuController,
    internMenuBackgroundController,
    setInternMenuBackgroundController,
  ] = useContext(HelpContext);

  useEffect(() => {
    fetch("/VideoHelp/video_instruction.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        const listItems = jsonData.map((singleData) => (
          <HelpCard
            key={singleData.id}
            title={singleData.title}
            description={singleData.description}
            video={singleData.video}
          />
        ));
        listItems.unshift(<HelpStartCard />);
        setListItems(listItems);
        setListItemsLenght(listItems.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Rimuovo il Content
  function killTheMenu() {
    setInternMenuController(!internMenuController);
  }

  // creo l'animazione di partenza ed il suo reverse
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        onReverseComplete: killTheMenu,
        delay: 0.5,
      });
      tl.current
        .from(".arrow-left", { opacity: 0, x: -50, duration: 0.4 })
        .from(".arrow-right", { opacity: 0, x: 50, duration: 0.4 }, "<")
        .from(menuContent.current, { opacity: 0, duration: 0.2 }, "<")
    }, menuContent);
    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setArrowPress("r");
    setSlide(!slide);
    setSlideController(slideController + 1);
  };
  const prevSlide = () => {
    setArrowPress("l");
    setSlide(!slide);
    setSlideController(slideController - 1);
  };

  useEffect(() => {
    tl.current.reversed(menuController);
  }, [menuController]);

  // RETURN
  return (
    <>
      <div ref={menuContent} className="help-instruction-container">
        <SlideContext.Provider value={[slide, setSlide, count, setCount, slideController, setSlideController, arrowPress, listItemsLenght]}>
          {listItems[count]}
        </SlideContext.Provider>
        <BsChevronCompactLeft
          className="slider-arrow arrow-left"
          onClick={prevSlide}
        />
        <BsChevronCompactRight
          className="slider-arrow arrow-right"
          onClick={nextSlide}
        />
        <h5 className="slide-counter">{count + 1} / {listItems.length}</h5>
      </div>
    </>
  );
}
