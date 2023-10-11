import { gsap } from "gsap";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import MenuContentHelpTutorial from "../../External_Command_Bar/Menu/Help_Tutorial_Contentl";

export default function Welcome_Message({ setWelcomeMessage, setCookie }) {
  const [welcomeState, setWelcomeState] = useState(true);
  const [tutorialState, setTutorialState] = useState(false);
  const [welcomeMessageState, setWelcomeMessageState] = useState(true);
  const welcomeMessageContainer = useRef();
  const welcomeMessage = useRef();
  const tl = useRef();

  const welcomeMessageController = () => {
    setWelcomeMessage(false);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        delay: 2,
        onReverseComplete: welcomeMessageController,
      });
      tl.current
        .from(welcomeMessageContainer.current, {
          duration: 0.4,
          opacity: 0,
        })
        .from(welcomeMessage.current, {
          duration: 0.4,
          y: 50,
          opacity: 0,
        });
    }, welcomeMessageContainer);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (welcomeState === false) {
      tl.current.reversed(true);
    }
  }, [welcomeState]);

  const setStarting = () => {
    setWelcomeMessageState(false);
    setTutorialState(true)
  };

  const startTutorial = () => {
    gsap.to(welcomeMessage.current, {
      duration: 0.4,
      y: 50,
      opacity: 0,
      onComplete: setStarting,
    });
  };

  const setFirstVisit = () => {
    setWelcomeState(false);
    setCookie('visited', true, { maxAge: 3600 })
  };

  return (
    <section
      ref={welcomeMessageContainer}
      className="welcome-message-container"
    >
      {welcomeMessageState ? (
        <div ref={welcomeMessage} className="welcome-message">
          <h1>BENVENUTO COSMONAUTA !</h1>
          <p>
            Muoviti nello spazio e visita i pianeti di questa piccola galassia!
            Se è la prima volta che navighi questo sito, forse è meglio se dai
            un occhiata al manuale di utilizzo!
          </p>
          <p>
            <em>
              (insomma, prima di perdersi nell’infinità dello spazio ci farei un
              pensierino, poi vedi tu...)
            </em>
          </p>
          <button className="menu-link" onClick={() => startTutorial()}>
            APRI IL MANUALE DI UTILIZZO
          </button>
          <button className="menu-link" onClick={() => setFirstVisit()}>
            SONO UN PILOTA ESPERTO
          </button>
        </div>
      ) : (
        ""
      )}
      {tutorialState ? <MenuContentHelpTutorial setWelcomeState={setWelcomeState} setCookie={setCookie} /> : ""}
    </section>
  );
}
