import "./galaxymap.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useKeyboardControls } from "@react-three/drei";
import usePlanetPosition from "../../../stores/galaxyStore";

export default function GalaxyMap(props) {
  const [turboController, setTurboController] = useState(false);
  const [scaleController, setScaleController] = useState(0.95);
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const turbo = useKeyboardControls((state) => state.turbo);

  // Planet #1 Position Update
  const cameraMapPositionX = usePlanetPosition(
    (state) => state.cameraPositionX
  );
  const cameraMapPositionZ = usePlanetPosition(
    (state) => state.cameraPositionZ
  );
  const cameraRotation = usePlanetPosition((state) => state.cameraRotation);
  // Planet #1 Position Update
  const contactMapPositionX = usePlanetPosition((state) => state.pcPositionX);
  const contactMapPositionZ = usePlanetPosition((state) => state.pcPositionZ);
  // Planet #2 Position Update
  const worksMapPositionX = usePlanetPosition((state) => state.pwPositionX);
  const worksMapPositionZ = usePlanetPosition((state) => state.pwPositionZ);
  // Planet #3 Position Update
  const aboutMapPositionX = usePlanetPosition((state) => state.paPositionX);
  const aboutMapPositionZ = usePlanetPosition((state) => state.paPositionZ);

  const canvasRef = useRef(null);
  const impulseRef = useRef(null);
  const [cameraRotationController, setCameraRotationController] = useState(0);

  let zoomlevel = cameraMapPositionX < 116 && cameraMapPositionZ < 116 ? 1.2 : 0.7;

  const draw = (ctx) => {
    function rotateTriangle(original, center, angle) {
      // Calculate the difference vectors between the center and each point
      let v1 = [original[0][0] - center[0], original[0][1] - center[1]];
      let v2 = [original[1][0] - center[0], original[1][1] - center[1]];
      let v3 = [original[2][0] - center[0], original[2][1] - center[1]];
      let v4 = [original[3][0] - center[0], original[3][1] - center[1]];

      // Perform the rotation on each difference vector
      let v1_rotated = [
        v1[0] * Math.cos(angle) - v1[1] * Math.sin(angle),
        v1[0] * Math.sin(angle) + v1[1] * Math.cos(angle),
      ];
      let v2_rotated = [
        v2[0] * Math.cos(angle) - v2[1] * Math.sin(angle),
        v2[0] * Math.sin(angle) + v2[1] * Math.cos(angle),
      ];
      let v3_rotated = [
        v3[0] * Math.cos(angle) - v3[1] * Math.sin(angle),
        v3[0] * Math.sin(angle) + v3[1] * Math.cos(angle),
      ];
      let v4_rotated = [
        v4[0] * Math.cos(angle) - v4[1] * Math.sin(angle),
        v4[0] * Math.sin(angle) + v4[1] * Math.cos(angle),
      ];

      // Add the rotated difference vectors to the center to get the rotated points
      const rotated = [
        [center[0] + v1_rotated[0], center[1] + v1_rotated[1]],
        [center[0] + v2_rotated[0], center[1] + v2_rotated[1]],
        [center[0] + v3_rotated[0], center[1] + v3_rotated[1]],
        [center[0] + v4_rotated[0], center[1] + v4_rotated[1]],
      ];

      return rotated;
    }
    // Map Animation
    gsap.to(canvasRef.current, {
      duration: 0,
      opacity: 1,
      onComplete: () => {
        gsap.to(canvasRef.current, {
          duration: 2,
          opacity: 0.2,
        });
      },
    });
    ctx.clearRect(
      -ctx.canvas.width / 2,
      -ctx.canvas.height / 2,
      ctx.canvas.width,
      ctx.canvas.height
    );
    // Sun map position
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FEA500";
    ctx.stroke();
    ctx.fillStyle = "#FEA500";
    ctx.fill();
    ctx.closePath();
    // Planet 1 orbit position
    ctx.beginPath();
    ctx.arc(0, 0, 34 * zoomlevel, 0, 2 * Math.PI);
    ctx.strokeStyle = "#8F6952";
    ctx.stroke();
    // Planet 2 orbit position
    ctx.beginPath();
    ctx.arc(0, 0, 56 * zoomlevel, 0, 2 * Math.PI);
    ctx.strokeStyle = "#8F6952";
    ctx.stroke();
    // Planet 3 orbit position
    ctx.beginPath();
    ctx.arc(0, 0, 96 * zoomlevel, 0, 2 * Math.PI);
    ctx.strokeStyle = "#8F6952";
    ctx.stroke();
    // Planet 1 position
    ctx.beginPath();
    ctx.arc(
      contactMapPositionX * zoomlevel,
      contactMapPositionZ * zoomlevel,
      5,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = "#FEA500";
    ctx.stroke();
    ctx.fillStyle = "#532D2B";
    ctx.fill();
    ctx.closePath();
    // Planet 2 position
    ctx.beginPath();
    ctx.arc(
      worksMapPositionX * zoomlevel,
      worksMapPositionZ * zoomlevel,
      5,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = "#FEA500";
    ctx.stroke();
    ctx.fillStyle = "#532D2B";
    ctx.fill();
    ctx.closePath();
    // Planet 3 position
    ctx.beginPath();
    ctx.arc(
      aboutMapPositionX * zoomlevel,
      aboutMapPositionZ * zoomlevel,
      5,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = "#FEA500";
    ctx.stroke();
    ctx.fillStyle = "#532D2B";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#FEA500";
    ctx.fill();
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(cameraMapPositionX * zoomlevel, cameraMapPositionZ * zoomlevel);
    // definizione angolo
    let starterVertexXB = cameraMapPositionX * zoomlevel - 10;
    let starterVertexXC = cameraMapPositionX * zoomlevel + 10;
    let starterVertexXD = cameraMapPositionX * zoomlevel + 0;
    let starterVertexYB = cameraMapPositionZ * zoomlevel + 20;
    let starterVertexYC = cameraMapPositionZ * zoomlevel + 20;
    let starterVertexYD = cameraMapPositionZ * zoomlevel + 15;
    let original = [
      [cameraMapPositionX, cameraMapPositionZ],
      [starterVertexXB, starterVertexYB],
      [starterVertexXD, starterVertexYD],
      [starterVertexXC, starterVertexYC],
    ];
    let center = [
      cameraMapPositionX * zoomlevel,
      cameraMapPositionZ * zoomlevel,
    ];

    let angle = cameraRotationController;
    let rotated = rotateTriangle(original, center, angle);
    ctx.lineTo(rotated[1][0], rotated[1][1]);
    ctx.lineTo(rotated[2][0], rotated[2][1]);
    ctx.lineTo(rotated[3][0], rotated[3][1]);
    ctx.fill();
    ctx.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.translate(canvas.width / 2, canvas.height / 2);

    draw(context);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    gsap.to(impulseRef.current, {
      duration: 1,
      scaleX: 1,
      scaleY: 1,
      opacity: 0,
      onUpdate: () => {
        setCameraRotationController(-cameraRotation);
        draw(context);
      },
      onComplete: () => {
        gsap.to(impulseRef.current, {
          duration: 0,
          scaleX: 0,
          scaleY: 0,
          onComplete: () => {
            gsap.to(impulseRef.current, {
              duration: 0,
              opacity: 1,
            });
          },
        });
      },
    });
  }, [contactMapPositionX]);

  const controllsContainer = useRef();

  forward || leftward || rightward ? gsap.to(controllsContainer.current, {scale: scaleController - (leftward ? 0.1 : 0), duration: 0.5}) : gsap.to(controllsContainer.current, {scale: 1, duration: 0.5});

  useEffect(() => {
    if(turbo === true){
      if(turboController === true){
        setTurboController((turboController) => !turboController);
        setScaleController(0.95);
      } else {
        setTurboController((turboController) => !turboController);
        setScaleController(0.90)
      }
    }
  }, [turbo]);

  useEffect(() => {
    gsap.from(controllsContainer.current, {duration: 0.4, delay: 0.6, y: 100, opacity: 0})
  }, []);

  return (
    <div ref={controllsContainer} className="map-container">
      <div className="map-screen">
        <div
          className="map-impulse"
          ref={impulseRef}
          style={{ transform: `scale(0.2)`, opacity: 0.5 }}
        ></div>
        <canvas
          className="map"
          width={300}
          height={300}
          ref={canvasRef}
          {...props}
        />
      </div>
    </div>
  );
}
