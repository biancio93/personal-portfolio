import gsap from "gsap";
import MainTitle from "../../components/General/Titles/main_title/Main_Title";
import SubTitle from "../../components/General/Titles/subtitle/Subtitle";
import BackToSpaceButtonMobile from "../../components/External_Command_Bar/Back_to_Space_Button/Back_to_Space_Button_Mobile";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import useMobileStore from "../../stores/mobileStore";
import { useLayoutEffect, useEffect, useRef } from "react";
import useViewport from "../../components/External_Command_Bar/Responsive/Use_Viewport";
import { NavLink } from "react-router-dom";

export default function PrivacyPolicyContent() {
  const planetName = "Privacy Policy";
  const titleText =
    "Informativa sul trattamento dei dati personali. In vigore dal 18/09/2023";
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
        <div ref={mobilePageHeader} className="mobile-page-header privacy-header">
        {width < breakpoint ? <BackToSpaceButtonMobile /> : "" }
          <div className="title-container">
            <SubTitle planetName={planetName} />
            <MainTitle textTitle={titleText} />
          </div>
          <hr className="heading-container-line"></hr>
        </div>
        <div ref={mobileContentContainer} className="privacy-container">
          <section className="policy-container">
            <h3>
              Titolare del Trattamento:{" "}
              <span style={{ color: "white" }}>Francesco Bianciardi</span>
            </h3>
            <p>
              Sito al quale si riferisce la presente privacy policy:
              spacejoey.space <a href="/">(Sito)</a>.
            </p>
            <p>
              Il Titolare del Trattamento non ha nominato un DPO (Data
              Protection Officer). Pertanto, Lei può inviare qualsiasi richiesta
              di informazioni direttamente al Titolare del Trattamento.
            </p>
          </section>
          <section className="policy-container">
            <h3>INFORMAZIONI GENERALI</h3>
            <p>
              Il presente documento descrive come il Titolare del Trattamento
              tratta i Suoi dati personali conferiti sul Sito.
            </p>
            <p>
              Di seguito vengono descritti i principali trattamenti dei Suoi
              dati personali. Viene in particolare spiegata la base giuridica
              del trattamento, se il conferimento è obbligatorio e le
              conseguenze del mancato conferimento di dati personali. Per
              descrivere al meglio i Suoi diritti, qualora necessario, abbiamo
              specificato se e quando un determinato trattamento di dati
              personali non viene effettuato.
            </p>
          </section>
          <section className="policy-container">
            <h4>Registrazione sul Sito</h4>
            <p>
              Il Sito non offre la possibilità di registrazione. Pertanto, il
              Titolare del Trattamento non tratta i Suoi dati personali per
              questa finalità.
            </p>
          </section>
          <section className="policy-container">
            <h4>Acquisti sul Sito</h4>
            <p>
              Sul Sito non è possibile effettuare acquisti. Pertanto, i Suoi
              dati personali non saranno trattati per questa finalità.Il
              Titolare del Trattamento non tratta i dati dell'utente per inviare
              email di "reminder" di acquisto di prodotti e/o servizi del
              Titolare stesso.
            </p>
          </section>
          <section className="policy-container">
            <h4>Rispondere alle Sue richieste</h4>
            <p>
              I Suoi dati verranno trattati per rispondere alle Sue richieste di
              informazioni. Il conferimento è facoltativo, ma il Suo rifiuto
              comporterà l’impossibilità per il Titolare del Trattamento di
              rispondere alle Sue domande. La base giuridica del trattamento è
              il legittimo interesse del Titolare del Trattamento a dare seguito
              alle richieste dell’utente. Questo legittimo interesse è
              equivalente all'interesse dell'utente a ricevere risposta alle
              comunicazioni inviate al Titolare del Trattamento.
            </p>
          </section>
          <section className="policy-container">
            <h4>Marketing generico</h4>
            <p>
              Il Titolare del Trattamento non Le invierà materiale pubblicitario
              e/o newsletter relativo a prodotti propri o di terzi.
            </p>
          </section>
          <section className="policy-container">
            <h4>Profilazione</h4>
            <p>
              Il Titolare del Trattamento non effettua "profilazione" con i Suoi
              dati personali. Pertanto, non Le invierà materiale pubblicitario
              e/o newsletter relativi a prodotti propri o di terzi di Suo
              specifico interesse.
            </p>
          </section>
          <section className="policy-container">
            <h4>Cessione dei dati</h4>
            <p>
              Il Titolare del Trattamento non cede a terzi i Suoi dati
              personali.
            </p>
          </section>
          <section className="policy-container">
            <h4>Geolocalizzazione</h4>
            <p>
              Il Sito non implementa strumenti di geolocalizzazione
              dell'indirizzo IP dell'utente.
            </p>
          </section>
          <section className="policy-container">
            <h4>Curriculum Vitae</h4>
            <p>
              Tramite il Sito non è possibile inviare curriculum vitae. Pertanto
              i Suoi dati non verranno trattati per queste finalità.
            </p>
          </section>
          <section className="policy-container">
            <h4>Prenotazione appuntamenti</h4>
            <p>
              Sul Sito non sono attivi sistemi terzi di prenotazione di
              appuntamenti con il Titolare del Trattamento. Pertanto, i Suoi
              dati non verranno trattati per questa finalità. Ad ogni modo, Lei
              può sempre contattare il Titolare del Trattamento ai contatti
              indicati in epigrafe.
            </p>
          </section>
          <section className="policy-container">
            <h4>Comunicazione dei dati personali</h4>
            <p>
              Nell'ambito della propria ordinaria attività, il Titolare del
              Trattamento può comunicare i Suoi dati personali a determinate
              categorie di soggetti. All'articolo 2 Lei può trovare l'elenco dei
              soggetti ai quali il Titolare del Trattamento comunica i Suoi dati
              personali. Per agevolare la tutela dei Suoi diritti, l'articolo 2
              può specificare in alcuni casi quando i Suoi dati non vengono
              comunicati a terzi.
            </p>
            <p>
              La "comunicazione" a terzi del dato personale è diversa dalla
              "cessione" (disciplinata al punto che precede). Infatti, nella
              comunicazione il terzo al quale è trasmesso il dato può usarlo
              solo per le specifiche finalità descritte nel rapporto con il
              Titolare del Trattamento. Nella cessione, invece, il terzo diventa
              Titolare del Trattamento autonomo del dato personale. Inoltre, per
              cedere i Suoi dati personali a terzi è sempre richiesto il Suo
              consenso.
            </p>
            <p>
              Fermo quanto precede, resta inteso che il Titolare del Trattamento
              potrà comunque utilizzare i Suoi dati personali per dare corretto
              adempimento agli obblighi previsti dalle leggi in vigore.
            </p>
          </section>
          <section className="policy-container">
            <h3>INFORMATIVA PRIVACY SPECIFICA</h3>
          </section>
          <section className="policy-container">
            <h4>Art. 1 Modalità di trattamento</h4>
            <p>
              <em>1.1</em> Il trattamento dei Suoi dati personali sarà
              principalmente effettuato con l’ausilio di mezzi elettronici o
              comunque automatizzati, secondo le modalità e con gli strumenti
              idonei a garantirne la sicurezza e la riservatezza dei dati
              personali.
            </p>
            <p>
              <em>1.2</em> Le informazioni acquisite e le modalità del
              trattamento saranno pertinenti e non eccedenti rispetto alla
              tipologia dei servizi resi. I Suoi dati saranno altresì gestiti e
              protetti in ambienti informatici sicuri e adeguati alle
              circostanze.
            </p>
            <p>
              <em>1.3</em> Tramite il Sito non vengono trattati "dati
              particolari". I dati particolari sono quelli che possono rivelare
              l'origine razziale ed etnica, le convinzioni religiose,
              filosofiche o di altro genere, le opinioni politiche, l'adesione a
              partiti, sindacati, associazioni od organizzazioni a carattere
              religioso, filosofico, politico o sindacale, lo stato di salute e
              la vita sessuale.
            </p>
            <p>
              <em>1.4</em> Tramite il Sito non vengono trattati dati giudiziari.
            </p>
          </section>
          <section className="policy-container">
            <h4>Art. 2 Comunicazione dei dati personali</h4>
            <p>
              Il Titolare del Trattamento può comunicare i Suoi dati personali a
              categorie determinate di soggetti. Di seguito vengono indicati i
              soggetti ai quali il Titolare del Trattamento si riserva di
              comunicare i Suoi dati:
            </p>
            <ul>
              <li>
                Il Titolare del Trattamento può comunicare i Suoi dati personali
                a tutti quei soggetti (ivi incluse le Pubbliche Autorità) che
                hanno accesso ai dati personali in forza di provvedimenti
                normativi o amministrativi.
              </li>
              <li>
                I Suoi dati personali possono essere comunicati anche a tutti
                quei soggetti pubblici e/o privati, persone fisiche e/o
                giuridiche (studi di consulenza legale, amministrativa e
                fiscale, Uffici Giudiziari, Camere di Commercio, Camere ed
                Uffici del Lavoro, ecc.), qualora la comunicazione risulti
                necessaria o funzionale al corretto adempimento degli obblighi
                derivanti dalla legge.
              </li>
              <li>
                Il Titolare del Trattamento non si avvale di dipendenti e/o
                collaboratori a qualsiasi titolo. Pertanto, i Suoi dati
                personali non verranno comunicati a questa categoria di
                soggetti.{" "}
              </li>
              <li>
                Il Titolare del Trattamento non si avvale di società, consulenti
                o professionisti incaricati dell’installazione, della
                manutenzione, dell’aggiornamento e, in generale, della gestione
                degli hardware e software del Titolare del Trattamento.
                Pertanto, i Suoi dati non verranno comunicati a queste categorie
                di soggetti.
              </li>
              <li>
                Il Titolare del Trattamento non si avvale di piattaforme CRM
                (società che svolgono in particolare l'attività di inviare
                comunicazioni automatizzate agli utenti). Pertanto, i Suoi dati
                personali non vengono comunicati a queste società.
              </li>
              <li>
                Il Titolare del Trattamento non si avvale di società esterne per
                prestare il servizio di customer care.{" "}
              </li>
              <li>
                I dati personali degli acquirenti non sono comunicati a corrieri
                o spedizionieri.{" "}
              </li>
            </ul>
            <p>
              Il Titolare si riserva la facoltà di modificare il sopra indicato
              elenco in base alla propria ordinaria operatività. Pertanto, Lei è
              invitato ad accedere con regolarità alla presente informativa per
              controllare a quali soggetti il Titolare del Trattamento comunica
              i Suoi dati personali.
            </p>
          </section>
          <section className="policy-container">
            <h4>Art. 3 Conservazione dei dati personali</h4>
            <p>
              <em>3.1</em> Il presente articolo descrive per quanto tempo il
              Titolare del Trattamento si riserva il diritto di conservare i
              Suoi dati personali.
            </p>
            <ul>
              <li>
                I Suoi dati personali saranno conservati per il solo tempo
                necessario a garantire la corretta prestazione dei servizi
                offerti tramite il Sito.
              </li>
            </ul>
            <p>
              <em>3.2</em> Fermo quanto previsto all'articolo 3.1, il Titolare
              del Trattamento può conservare i Suoi dati personali per il tempo
              richiesto da normative specifiche, come di volta in volta
              modificate.
            </p>
          </section>
          <section className="policy-container">
            <h4>Art. 4 Trasferimento dei dati personali</h4>
            <p>
              <em>4.1</em> Il Titolare del Trattamento ha sede presso un Paese
              che presenta un adeguato livello di sicurezza dal punto di vista
              normativo. Qualora il trasferimento dei Suoi dati personali
              avvenga in un Paese extra-UE e per il quale la Commissione europea
              ha espresso un giudizio di adeguatezza, il trasferimento si
              ritiene in ogni caso sicuro dal punto di vista normativo. Il
              presente articolo 4.1 indica di volta in volta i Paesi nei quali i
              Suoi dati personali possono essere eventualmente trasferiti e dove
              la Commissione europea ha espresso un giudizio di adeguatezza.
            </p>
            <ul>
              <li>
                Si invita pertanto l'utente ad accedere con regolarità al
                presente articolo per verificare se il trasferimento dei Suoi
                dati personali avviene in un Paese con queste caratteristiche.
              </li>
            </ul>
            <p>
              <em>4.2</em> Fermo quanto indicato all'articolo 4.1, i Suoi dati
              possono essere trasferiti anche in Paesi extra-UE e per i quali la
              Commissione europea non ha espresso un giudizio di adeguatezza.
              Lei è pertanto invitato a visionare con regolarità il presente
              articolo 4.2 per appurare in quali di questi Paesi i Suoi dati
              sono eventualmente trasferiti.
            </p>
            <p>
              <em>4.3</em> In questo articolo il Titolare del Trattamento indica
              i Paesi presso i quali eventualmente dirige in modo specifico la
              propria attività. Questa circostanza può implicare l'applicazione
              della normativa del Paese di riferimento, unitamente a quella che
              disciplina il rapporto con l'utente in base a quanto indicato in
              Premessa.
            </p>
            <ul>
              <li>
                Su richiesta dell'utente, il Titolare del Trattamento applicherà
                al trattamento dei dati personali la normativa eventualmente più
                favorevole prevista dalla legislazione nazionale dell'utente
                stesso.
              </li>
            </ul>
          </section>
          <section className="policy-container">
            <h4>Art. 5. Diritti dell'interessato</h4>
            <p>Il Titolare del Trattamento La informa che Lei ha diritto di:</p>
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
              <li>proporre reclamo a un’autorità di controllo.</li>
            </ul>
            <p>
              I diritti di cui sopra potranno essere esercitati con richiesta
              rivolta senza formalità ai contatti indicati in Premessa.
            </p>
          </section>
          <section className="policy-container">
            <h4>Art. 6. Modifiche e Miscellanea</h4>
            <p>
              Il Titolare del Trattamento si riserva il diritto di apportare
              modifiche alla presente informativa in qualsiasi momento, dandone
              idonea pubblicità agli utenti del Sito e garantendo in ogni caso
              una adeguata ed analoga protezione dei dati personali. Al fine di
              visionare eventuali modifiche, Lei è invitato a consultare con
              regolarità la presente informativa. In caso di modifiche
              sostanziali alla presente informativa privacy, il Titolare del
              Trattamento ne potrà dare comunicazione anche tramite email.
            </p>
            <NavLink className="menu-link"
            to="/"
          >
            torna alla homepage
          </NavLink>
          </section>
        </div>
        {width < breakpoint ?
        (<FooterMobile />) : ""}
      </section>
    </>
  );
}
