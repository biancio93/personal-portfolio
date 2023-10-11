import gsap from "gsap";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import BackToSpaceButtonMobile from "../../components/External_Command_Bar/Back_to_Space_Button/Back_to_Space_Button_Mobile";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import useMobileStore from "../../stores/mobileStore";
import { useLayoutEffect, useEffect, useRef } from "react";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { NavLink } from "react-router-dom";

export default function CookiePolicyContent() {
  const planetName = "Cookie Policy";
  const titleText =
    "Informativa estesa sull'uso dei cookie. In vigore dal 18/09/2023";
  const mobilePageHeader = useRef(null);
  const mobileContentContainer = useRef(null);
  const tl = useRef();

  const mobileContainer = useRef(null);
  const screenHeight = useMobileStore((state) => state.screenHeight);
  const setLazyTrick = useMobileStore((state) => state.setLazyTrick);

  const { width } = useViewport();
  const breakpoint = 801;

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

  useEffect(() => {
    //mobileContainer.current.style.height = `${screenHeight}px`;
    gsap.fromTo(
      mobileContainer.current,
      { height: "50vh" },
      { duration: 0.4, height: screenHeight }
    );
  }, [screenHeight]);

  useEffect(() => {
    setLazyTrick();
  }, []);

  return (
    <>
      <section ref={mobileContainer} className="mobile-page-container">
        <div
          ref={mobilePageHeader}
          className="mobile-page-header privacy-header"
        >
          {width < breakpoint ? <BackToSpaceButtonMobile /> : ""}
          <div className="title-container">
            <SubTitle planetName={planetName} />
            <MainTitle textTitle={titleText} />
          </div>
          <hr className="heading-container-line"></hr>
        </div>
        <div ref={mobileContentContainer} className="privacy-container">
          <section className="policy-container">
            <h3>PREMESSA</h3>
            <p>
              Sito al quale si riferisce la presente privacy policy:
              spacejoey.space <a href="/">(Sito)</a>.
            </p>
            <p>
              La presente cookie policy è resa per il sito spacejoey.space{" "}
              <a href="/">(Sito)</a>. Il documento è stato redatto tenendo conto
              di quanto indicato dal Regolamento europeo 679/2016 in materia di
              protezione dei dati personali (GDPR), dal Codice della Privacy (D.
              Lgs. 30 giugno 2003 n. 196) e delle Linee Guida del Garante
              Privacy (soprattutto le Linee Guida sull'uso dei cookie emesse il
              10 luglio 2021).
            </p>
            <h4>
              Titolare del Trattamento:{" "}
              <span style={{ color: "white" }}>Francesco Bianciardi</span>
            </h4>
          </section>
          <section className="policy-container">
            <h3>INFORMAZIONI GENERALI</h3>
            <h4>Che cosa sono i cookie e a cosa servono</h4>
            <p>
              Un cookie è un file di testo che un sito web visitato dall’utente
              invia al suo terminale (computer, dispositivo mobile quale
              smartphone o tablet), dove viene memorizzato per essere poi
              ritrasmesso a tale sito in occasione di una visita successiva al
              sito medesimo.
            </p>
            <p>I cookie vengono tra loro distinti:</p>
            <ul>
              <li>
                in base al soggetto che li installa, a seconda che si tratti
                dello stesso gestore del sito visitato (c.d. "cookie di prima
                parte") ovvero di un soggetto diverso (c.d. "cookie di terza
                parte");
              </li>
              <li>
                in base alla finalità di ciascun cookie: alcuni cookie
                permettono una migliore navigazione, memorizzando alcune scelte
                dell'utente, ad esempio la lingua (c.d. "cookie tecnici"), altri
                cookie consentono di monitorare la navigazione dell'utente anche
                allo scopo di inviare pubblicità e/od offrire servizi in linea
                con sue preferenze (c.d. "cookie di profilazione").
              </li>
            </ul>
            <p>
              Solo i cookie di profilazione richiedono il consenso preventivo
              dell'utente al loro utilizzo.
            </p>
            <p>
              Il Titolare del Trattamento è responsabile esclusivamente dei
              cookie di prima parte dallo stesso installati sul Sito.
            </p>
            <p>
              Alla sezione <strong>"Cookie tecnici di prima parte"</strong> Lei
              può visionare le tipologie di cookie tecnici di prima parte
              rilasciati dal Sito.
            </p>
            <p>
              La gestione dei cookie di profilazione è descritta alla sezione{" "}
              <strong>"Cookie di profilazione di terza parte"</strong>.
            </p>
            <p>
              Ad ogni modo, Lei può abilitare/disabilitare i cookie anche
              attraverso le opzioni del Suo browser:
            </p>
          </section>
          <section className="policy-container">
            <h4>Internet Explorer</h4>
            <p>
              Accedere al menu <strong>Strumenti</strong>, quindi a{" "}
              <strong>Opzioni </strong>.<br />
              Cliccare su <strong>Privacy</strong>, quindi su{" "}
              <strong>Avanzate</strong>.<br />
              Nella finestra <strong>Cookie</strong>, selezionare le proprie
              preferenze.
              <br />
            </p>
          </section>
          <section className="policy-container">
            <h4>Google Chrome</h4>
            <p>
              Cliccare sul <strong>menu di Chrome</strong>, corrispondente al
              pulsante in alto a destra.
              <br />
              Selezionare <strong>Impostazioni</strong>, quindi cliccare su{" "}
              <strong>Avanzate</strong>.
              <br /> Nella sezione <strong>Privacy e sicurezza</strong>,
              cliccare sul pulsante
              <strong>Impostazioni contenuti</strong>.
              <br /> Selezionare le opzioni preferite nella sezione{" "}
              <strong>Cookie</strong>.
            </p>
          </section>
          <section className="policy-container">
            <h4>Firefox</h4>
            <p>
              Cliccare su <strong>Strumenti</strong>, quindi sul menu{" "}
              <strong>Opzioni</strong>.
              <br />
              Cliccare sulle impostazioni <strong>Privacy e sicurezza.</strong>
              <br /> Selezionare
              <strong>
                Utilizza impostazioni personalizzate per la cronologia
              </strong>
              .<br />
              Selezionare le opzioni preferite nella sezione{" "}
              <strong>Accetta cookie e dati dai siti web</strong>.
            </p>
          </section>
          <section className="policy-container">
            <h4>Safari</h4>
            <p>
              Cliccare su <strong>Safari</strong>, quindi su{" "}
              <strong>Preferenze</strong>. Cliccare sulla sezione
              <strong>Privacy e sicurezza.</strong>
              <br /> Andare su <strong>Blocca cookie</strong> e selezionare le
              opzioni preferite.
            </p>
          </section>
          <section className="policy-container">
            <h4>Cookie tecnici di prima parte</h4>
            <p>
              Questi cookie sono necessari per il funzionamento del Sito e non
              possono essere disattivati. Di solito sono definiti come una
              risposta alle azioni intraprese che costituiscono una richiesta di
              servizi, come l'impostazione delle preferenze sui cookie,
              l'accesso o la compilazione di moduli, preferenze di navigazione.
            </p>
            <ul>
              <li>
                Il Sito rilascia cookie di navigazione o di sessione che
                garantiscono la normale navigazione e normale fruizione del
                Sito.
              </li>
            </ul>
          </section>
          <section className="policy-container">
            <h4>Cookie di profilazione di terza parte</h4>
            <p>
              Il Sito non rilascia cookie di profilazione, pubblicitaria o
              statistica.
            </p>
          </section>
          <section className="policy-container">
            <h4>I Suoi diritti</h4>
            <p>
              Ai sensi dell’art. 13 del GDPR, il Titolare del Trattamento La
              informa che Lei ha diritto di:
            </p>
            <ul>
              <li>
                chiedere al Titolare del Trattamento l’accesso ai Suoi dati
                personali e la rettifica o la cancellazione degli stessi o la
                limitazione del trattamento che La riguardano o di opporsi al
                loro trattamento, oltre al diritto alla portabilità dei dati
              </li>
              <li>
                revocare il consenso in qualsiasi momento senza pregiudicare la
                liceità del trattamento basata sul consenso prestato prima della
                revoca
              </li>
              <li>
                proporre reclamo a un’autorità di controllo (es.: il Garante per
                la protezione dei dati personali).
              </li>
            </ul>
            <p>
              I diritti di cui sopra potranno essere esercitati con richiesta
              rivolta senza formalità ai contatti indicati in Premessa.
            </p>
          </section>
          <section className="policy-container">
            <h4>Comunicazione dei dati</h4>
            <ul>
              <li>
                Il Titolare del Trattamento non comunica a terzi le informazioni
                derivanti dall'uso dei cookie.
              </li>
            </ul>
          </section>
          <section className="policy-container">
            <h4>Conservazione delle informazioni</h4>
            <ul>
              <li>
                I dati provenienti dai cookie tecnici vengono conservati per il
                tempo necessario a permettere il servizio al quale il singolo
                cookie tecnico si riferisce.
              </li>
            </ul>
            <NavLink className="menu-link"
            to="/"
          >
            torna alla homepage
          </NavLink>
          </section>
        </div>
        {width < breakpoint ? (
          <FooterMobile />
        ) : (
          ""
        )}
      </section>
    </>
  );
}
