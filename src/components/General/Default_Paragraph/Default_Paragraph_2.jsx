import "./default-paragraph.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useRef, useLayoutEffect, useEffect, useState } from "react";

gsap.registerPlugin(TextPlugin);

export default function DefaultParagraph2() {
  // Creo le timeline e collego gli elementi del DOM
  const standardParagraph = useRef(null);
  const standardInvoice = useRef(null);
  const standardContent = useRef(null);
  const tl = useRef();
  const tlContent = useRef();
  const progressBar = useRef();

  // Creo le costanti di controllo
  const [enterKeyController, setEnterKeyController] = useState(false);

  // Testo introduzione
  const printText = ">: 4 8 15 42 25 47";
  const chars = [...printText];
  const charsLength = chars.length;
  const charsTime = charsLength * 0.1;

  // Testo invito all'azione
  const printInvoice = "Press Enter";
  const charsInvoice = [...printText];
  const charsInvoiceLength = charsInvoice.length;
  const charsInvoiceTime = charsInvoiceLength * 0.08;

  // creo la variabile di controllo dello scroll
  const [scrollCount, setScrollCount] = useState(0);
  let scrollTimeout;

  // Testo della Pagina
  const printContentV1 =
    'Ciao utente! Sono contento di vedere che sei arrivato fin qui, grazie per aver navigato il mio sito, spero tu ti stia trovando bene.<br/><br/>Mi chiamo Francesco Bianciardi, sono un Web Designer e in questa sezione cercerò di raccontarti un po chi sono e cosa faccio.<br/><br/>(Se dovessi preferire una presentazione più tecnica e meno farfallona, visita pure la mia <a href="/curriculum">pagina curriculum</a>).<br/><br/>Sono nato a Firenze, dove vivo tutt\'ora, nel maggio del 1993. \nFin da piccolo ho coltivato una passione per le materie creative, dal disegno, al cinema, passando per videogiochi e musica e anche per il neonato mondo del web, che in qualche modo mi ha sempre accompagnato.<br/><br/>Dopo un Liceo Scientifico conseguito con risultati non proprio brillanti, mi sono iscritto all\'università degli studi di Firenze, prima a Economia Aziendale, da cui sono fuggito dopo appena un anno, per passare a Disegno Industriale, sotto il dipartimento di Architettura.<br/><br/>Disegno Industriale in qualche modo ha cambiato tutto, ho scoperto il mondo della progettazione e ho capito che quella poteva essere la mia strada, unendo l\'impulso creativo alla razionalità tecnica. <br/><br/>Dopo aver conseguito la Laurea Triennale, ho deciso di specializzarmi in Web Design, frequentando il corso in Web Graphic Design dell\'<a href="https://www.nemoacademy.eu/" target="_blank">Accademia Nemo</a> di Firenze.<br/><br/>Da qui poi ho continuato a crescere nel mondo del lavoro, prima in studio, presso la <a href="https://www.maxmile.it/" target="_blank">Web Agency MaxMile</a>, poi nella libera professione, presso lo studio <a href="https://ragou.it/" target="_blank">Ragou Design</a>, dove ho collaborato con la designer <a href="https://ragou.it/" target="_blank">Laura Lavorini</a> e da cui mi sono ritirato a settembre 2023.<br/><br/>Durante queste esperienze ho avuto modo di interessarmi anche agli aspetti piu "tecnici" dello sviluppo web, argomenti che inaspettatamente hanno rapito il mio interesse e stimolato come non mai la mia voglia di apprendere e migliorare, specialmente per quanto riguarda il front-end development.<br/><br/>Questo sito rappresenta il frutto di quest\'interesse e di questa passione, l ultimo tassello di un percorso, che sono curioso di capire come si evolverà :) <br/><br/>P.S. Se te lo stessi chiedendo, i numeri che hai incontrato all\'inizio della pagina erano un riferimento alla serie tv "Lost", un gioiellino di qualche anno fa che, se ti fossi perso, <a href="https://www.disneyplus.com/it-it/series/lost/49VjIYAiy7oh">ti consiglio di recuperare</a> ;)<br/><br/>Per tutti gli altri :<br/><br/><img src="/locke.gif" alt="John Locke smile" target="_blank" /><br/><br/>Grazie per aver avuto la pazienza di leggere fin qui, buon viaggio! :)';
  const printContentV2 =
    'Mi chiamo Francesco Bianciardi sono un Web Designer e in questa sezione cercerò di raccontarti un po chi sono e cosa faccio.<br/><br/>(Per una panoramica più rapida su chi sono e cosa faccio, visita pure la mia <a href="/curriculum">pagina curriculum</a>).<br/><br/>Dopo aver conseguito la Laurea Triennale in Disegno Industriale presso l\'Università degli Studi di Firenze, ho deciso di specializzarmi in Web Design, iscrivendomi e completando il corso in Web Graphic Design dell\'<a href="https://www.nemoacademy.eu/" target="_blank">Accademia Nemo</a> di Firenze.<br/><br/>Da qui poi ho continuato a crescere nel mondo del lavoro, prima in studio, presso la <a href="https://www.maxmile.it/" target="_blank">Web Agency MaxMile</a>, poi nella libera professione, presso lo studio <a href="https://ragou.it/" target="_blank">Ragou Design</a>, dove ho collaborato con la designer <a href="https://ragou.it/" target="_blank">Laura Lavorini</a> e da cui mi sono ritirato a settembre 2023.<br/><br/>Durante queste esperienze ha avuto modo di conoscere e approfondire i vari aspetti della progettazione web, dall\'attività di marketing, allo sviluppo in codice, passando dall\'UX / UI Design e dalla grafica web.<br/><br/>Nel tempo, ho sviluppato un approccio progettuale mirato a considerare il progetto web nella sua totalità, cercando di comprendere al meglio le dinamiche che regolano i vari attori che interagiscono sulla scena e concentrando il mio lavoro sulla parte di usabilità, sviluppo e grafica. Questo mi ha spinto ad affascinarmi al mondo dello svilluppo Front-End, in cui mi vorrei maggiormente specializzare.<br/><br/> Grazie per aver trovato il tempo di leggermi utente, ti auguro un buon proseguimento di navigazione. ';
  let printContent = "testo standard";
  const [userInterest, setUserInterest] = useState(false);

  // Trigger Animazione al clic su "ENTER"
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setUserInterest(true);
      setEnterKeyController(!enterKeyController);
    } else if (
      event.key.toUpperCase() === "Q" ||
      event.key.toUpperCase() === "W" ||
      event.key.toUpperCase() === "E" ||
      event.key.toUpperCase() === "D" ||
      event.key.toUpperCase() === "S" ||
      event.key.toUpperCase() === "A"
    ) {
    } else {
      setUserInterest(false);
      setEnterKeyController(!enterKeyController);
    }
  };

  // Trigger Animazione al clic su "ENTER"
  function enterInputListener() {
    document.addEventListener("keydown", handleKeyDown, { once: true });
  }

  // Trigger Animazione al caricamento del blocco
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({
        delay: 3,
        onComplete: enterInputListener,
      });
      tl.current
        .to(standardParagraph.current, {
          duration: charsTime,
          text: printText,
          onComplete: function () {
            standardParagraph.current.classList.remove("active-line");
          },
        })
        .to(standardInvoice.current, {
          duration: charsInvoiceTime,
          text: printInvoice,
          onStart: function () {
            standardInvoice.current.classList.add("active-line");
          },
          onComplete: function () {
            standardParagraph.current.classList.remove("active-line");
          },
        });
    });
    return () => ctx.revert();
  }, []);

  // Trigger Animazione al Click
  useEffect(() => {
    if (enterKeyController === false) return;
    printContent = userInterest === true ? printContentV1 : printContentV2;
    const charsContent = [...printContent];
    const charsContentLength = charsContent.length;
    const charsContentTime = charsContentLength * 0.03;

    const ctx = gsap.context(() => {
      tlContent.current && tl.current.progress(0).kill();
      tlContent.current = gsap.timeline({
        delay: 1,
      });
      tlContent.current.to(standardContent.current, {
        duration: charsContentTime,
        text: printContent,
        ease: "none",
        onStart: function () {
          standardContent.current.classList.add("active-line");
        },
        onUpdate: function () {
          const currentProgress = tlContent.current.progress();
          const progressBarHeight = 28 * currentProgress;
          gsap.to(progressBar.current, {
            height: progressBarHeight + "vh",
            duration: 0.2,
          });
        },
      });
    });

    // Torno indietro o vado avanti nell'animazione
    standardContent.current.addEventListener("wheel", (event) => {
      event.deltaY > 0 ? tlContent.current.play() : tlContent.current.reverse();
      scrollTimeout = setTimeout(() => {
        tlContent.current.pause();
      }, 2000);
    });

    // Stoppo l'animazione se clicco
    standardContent.current.addEventListener("click", () => {
        if (tlContent.current.isActive()) {
          tlContent.current.pause();
      } else {
          tlContent.current.play();
      }
    });

    return () => ctx.revert();
  }, [enterKeyController]);

  return (
    <>
      {enterKeyController === false ? (
        <p className="dafault-paragraph">
          <span className="end-line active-line" ref={standardParagraph}></span>
        </p>
      ) : (
        ""
      )}
      {enterKeyController === false ? (
        <p className="dafault-paragraph">
          <span className="end-line" ref={standardInvoice}></span>
        </p>
      ) : (
        ""
      )}
      {enterKeyController === true ? (
        <div className="mini">
          <p className="dafault-paragraph content-paragraph click-to-stop">
            <span className="end-line active-line" ref={standardContent}></span>
          </p>
          <div className="progress-bar-container">
            <span ref={progressBar} className="progress-bar"></span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
