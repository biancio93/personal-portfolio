import ProfileImage from "./profilo.jpg";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Curriculum_Card from "./Curriculum_Card";
import Curriculum_Card_Esperienze from "./Curriculum_Card_Esperienze";
import Contact_Form from "../../components/Contact_Form/Contact_Form";
import FooterMobile from "../../components/External_Command_Bar/Responsive/Footer_Mobile";
import {
  BsMailbox,
  BsTelephoneFill,
  BsWhatsapp,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";

import photoshopLogo from "./skills/graphics/adobe-photoshop-logo.jpg";
import illustratorLogo from "./skills/graphics/adobe-indesign-logo.jpg";
import indesignLogo from "./skills/graphics/adobe-illustrator-logo.jpg";
import animateLogo from "./skills/graphics/adobe-animate-logo.jpg";
import xdLogo from "./skills/graphics/adobe-xd-logo.jpg";
import figmaLogo from "./skills/graphics/figma-logo.jpg";

import htmlLogo from "./skills/code/html-logo.jpg";
import cssLogo from "./skills/code/css-logo.jpg";
import jsLogo from "./skills/code/js-logo.jpg";
import sassLogo from "./skills/code/sass-logo.jpg";
import bootstrapLogo from "./skills/code/bootstrap-logo.jpg";
import threeLogo from "./skills/code/three-logo.jpg";
import reactLogo from "./skills/code/react-logo.jpg";
import phpLogo from "./skills/code/php-logo.jpg";

import wordpressLogo from "./skills/cms/wordpress-logo.jpg";
import webflowLogo from "./skills/cms/webflow-logo.jpg";
import shopifyLogo from "./skills/cms/shopify-logo.jpg";

import decorationCurriculum from "./skills/decoration/curriculum-decoration.svg";

import formazioneData from "./formazione.json";
import esperienzeData from "./esperienze.json";

import useMobileStore from "../../stores/mobileStore";

gsap.registerPlugin(ScrollTrigger);

export default function CurriculumMobile() {
  const menuTimelineRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const bioRef = useRef();
  const forRef = useRef();
  const expRef = useRef();
  const skillsRef = useRef();
  const contRef = useRef();
  const containerCurriculum = useRef(null);

  const screenHeight = useMobileStore((state) => state.screenHeight);
  const setLazyTrick = useMobileStore((state) => state.setLazyTrick);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  useEffect(() => {
    containerCurriculum.current.style.height = `${screenHeight}px`;
  }, [screenHeight]);

  useEffect(() => {
    setLazyTrick();
  }, []);

  return (
    <>
      <div
        ref={containerCurriculum}
        className="container-curriculum"
        onScroll={handleScroll}
      >
        <div className="top-section">
          <div className="curriculum-image">
            <img src={ProfileImage} alt="Profile Pictures" />
          </div>
          <h1>Francesco Bianciardi</h1>
          <p>
            <span className="web-curriculum">Web Designer</span>
            <span className="underline-curriculum"></span>
          </p>
        </div>
        <section id="biografia" className="section-curriculum">
          <div ref={bioRef} className="row-curriculum">
            <div className="section-heading">
              <h2 className="section-title">Biografia</h2>
              <p>
                <span className="web-curriculum">Curriculum Vitae</span>
                <span className="underline-curriculum-body"></span>
                <span className="number-section">. {new Date().getFullYear()}</span>
              </p>
            </div>
            <section className="section-body">
              <p className="section-body-content">
              Mi chiamo Francesco Bianciardi, sono un Web Designer e in questa
                sezione, cercerò di raccontarti un po chi sono e cosa faccio.
                <br />
                <br />
                Dopo aver conseguito la Laurea <em>Triennale in Disegno Industriale</em> 
                presso l'Università degli Studi di Firenze, ho deciso di
                specializzarmi in Web Design, iscrivendomi e completando il corso
                in <em>Web Graphic Design</em> dell'
                <a href="https://www.nemoacademy.eu/" target="_blank">
                  Accademia Nemo
                </a>{" "}
                di Firenze.
                <br />
                <br />
                Da qui poi ho continuato a crescere nel mondo del lavoro, prima
                <em> in studio</em>, presso la{" "}
                <a href="https://www.maxmile.it/" target="_blank">
                  Web Agency MaxMile
                </a>
                , poi nella <em>libera professione</em>, presso lo studio{" "}
                <a href="https://ragou.it/" target="_blank">
                  Ragou Design
                </a>
                , dove ho collaborato con la designer{" "}
                <a href="https://ragou.it/" target="_blank">
                  Laura Lavorini
                </a>{" "}
                e da cui mi sono ritirato a settembre 2023.
                <br />
                <br />
                Durante queste esperienze ha avuto modo di conoscere e
                approfondire i vari aspetti della progettazione web,
                dall'attività di <em>marketing</em>, allo <em>sviluppo in codice</em>, passando
                dall'<em>UX / UI Design</em> e dalla <em>grafica web</em>.
                <br />
                <br />
                Nel tempo ho sviluppato un approccio progettuale mirato a
                considerare il progetto web nella sua totalità, cercando di
                comprendere al meglio le dinamiche che regolano i vari attori
                che interagiscono sulla scena e concentrando il mio lavoro sulla
                parte di <em>usabilità</em>, <em>sviluppo</em> e <em>grafica</em>. Questo mi ha spinto ad
                affascinarmi al mondo dello svilluppo <strong>Front-End</strong>, in cui mi
                vorrei maggiormente specializzare.
              </p>
            </section>
          </div>
          <img
            className="curriculum-decoration"
            src={decorationCurriculum}
            alt="Timeline Sezione"
          />
        </section>
        <section id="formazione" className="section-curriculum">
          <div ref={forRef} className="row-curriculum">
            <div className="section-heading">
              <h2 className="section-title">Formazione</h2>
              <p>
                <span className="web-curriculum">Curriculum Vitae</span>
                <span className="underline-curriculum-body"></span>
                <span className="number-section">. {new Date().getFullYear()}</span>
              </p>
            </div>
            <section className="section-body">
              <div className="curriculum-card-container">
                {formazioneData.map((item) => (
                  <Curriculum_Card
                    key={item.id}
                    title={item.title}
                    ente={item.ente}
                    content={item.content}
                    year={item.year}
                  />
                ))}
              </div>
            </section>
          </div>
          <img
            className="curriculum-decoration"
            src={decorationCurriculum}
            alt="Timeline Sezione"
          />
        </section>
        <section id="esperienze" className="section-curriculum">
          <div ref={expRef} className="row-curriculum">
            <div className="section-heading">
              <h2 className="section-title">Esperienze</h2>
              <p>
                <span className="web-curriculum">Curriculum Vitae</span>
                <span className="underline-curriculum-body"></span>
                <span className="number-section">. {new Date().getFullYear()}</span>
              </p>
            </div>
            <section className="section-body">
              <div className="curriculum-card-container">
                {esperienzeData.map((item) => (
                  <Curriculum_Card_Esperienze
                    key={item.id}
                    title={item.title}
                    ente={item.ente}
                    content={item.content}
                    year={item.year}
                  />
                ))}
              </div>
            </section>
          </div>
          <img
            className="curriculum-decoration"
            src={decorationCurriculum}
            alt="Timeline Sezione"
          />
        </section>
        <section id="skills" className="section-curriculum">
          <div ref={skillsRef} className="row-curriculum">
            <div className="section-heading">
              <h2 className="section-title">Skills</h2>
              <p>
                <span className="web-curriculum">Curriculum Vitae</span>
                <span className="underline-curriculum-body"></span>
                <span className="number-section">. {new Date().getFullYear()}</span>
              </p>
            </div>
            <section className="section-body">
              <div className="curriculum-card-container">
                <div className="curriculum-card card-skills">
                  <div className="curriculum-card-body">
                    <div className="skills-logo-container">
                      <img src={photoshopLogo} alt="logo Adobe Photoshop" />
                      <img src={illustratorLogo} alt="logo Adobe Illustrator" />
                      <img src={indesignLogo} alt="logo Adobe Photoshop" />
                      <img src={animateLogo} alt="logo Adobe Animate" />
                      <img src={xdLogo} alt="logo Adobe XD" />
                      <img src={figmaLogo} alt="logo Figma" />
                    </div>
                  </div>
                  <h5 className="skills-card-title">DESIGN</h5>
                </div>
                <div className="curriculum-card card-skills">
                  <div className="curriculum-card-body">
                    <div className="skills-logo-container">
                      <img src={htmlLogo} alt="logo HTML5" />
                      <img src={cssLogo} alt="logo CSS3" />
                      <img src={jsLogo} alt="logo JS" />
                      <img src={sassLogo} alt="logo SASS" />
                      <img src={bootstrapLogo} alt="logo Bootstrap" />
                      <img src={threeLogo} alt="logo Three" />
                      <img src={reactLogo} alt="logo React" />
                      <img src={phpLogo} alt="logo PHP" />
                    </div>
                  </div>
                  <h5 className="skills-card-title">CODE</h5>
                </div>
                <div className="curriculum-card card-skills">
                  <div className="curriculum-card-body">
                    <div className="skills-logo-container">
                      <img src={wordpressLogo} alt="logo WordPress" />
                      <img src={webflowLogo} alt="logo Webflow" />
                      <img src={shopifyLogo} alt="logo Shopify" />
                    </div>
                  </div>
                  <h5 className="skills-card-title">CMS</h5>
                </div>
              </div>
            </section>
          </div>
          <img
            className="curriculum-decoration"
            src={decorationCurriculum}
            alt="Timeline Sezione"
          />
        </section>
        <section id="contatti" className="section-curriculum">
          <div ref={contRef} className="row-curriculum">
            <div className="section-heading">
              <h2 className="section-title">Contatti</h2>
              <p>
                <span className="web-curriculum">Curriculum Vitae</span>
                <span className="underline-curriculum-body"></span>
                <span className="number-section">. {new Date().getFullYear()}</span>
              </p>
            </div>
            <div className="page-row-curriculum">
              <div className="page-col-8">
                <Contact_Form />
              </div>
              <div className="page-col-4">
                <div className="contact-link-container">
                  <a
                    href="https://wa.me/+393483676237"
                    target="_blank"
                    className="about-link"
                  >
                    <BsWhatsapp /> <span>+39 3483676237</span>
                  </a>
                  <a
                    href="tel:+393483676237"
                    target="_blank"
                    className="about-link"
                  >
                    <BsTelephoneFill /> <span>+39 3483676237</span>
                  </a>
                  <a
                    href="francesco.bianciardi.93@gmail.com"
                    target="_blank"
                    className="about-link"
                  >
                    <BsMailbox /> <span>francesco.bianciardi.93@gmail.com</span>
                  </a>
                </div>
                <div className="contact-social-container">
                  <span className="social-separator"></span>
                  <a
                    href="https://www.instagram.com/joey_the_astronaut/"
                    target="_blank"
                  >
                    <BsInstagram />
                  </a>
                  <a href="https://github.com/biancio93" target="_blank">
                    <BsGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/francescobianciardi/"
                    target="_blank"
                  >
                    <BsLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <img
            className="curriculum-decoration"
            src={decorationCurriculum}
            alt="Timeline Sezione"
          />
        </section>
        <FooterMobile />
      </div>
    </>
  );
}
