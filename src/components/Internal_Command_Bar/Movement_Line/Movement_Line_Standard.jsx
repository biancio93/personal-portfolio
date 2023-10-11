import "./movement-line.css";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

export default function MovementLineStandard(props) {
  const [turboControllerOnFly, setTurboControllerOnFly] = useState(false);
  const turbOnFly = useKeyboardControls((state) => state.turbo);
  const forward = useKeyboardControls((state) => state.forward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  let cw = useRef(0);
  let ch = useRef(0);

  let movmentDirectionMax = 2; // -1 right & 1 left
  let movmentDirectionMin = 0; // -1 right & 1 left
  let movmentRadiusMinOnFly = useRef(props.movmentradiusmin); // 500 standard & 200 turbo
  let movmentRadiusMaxOnFly = useRef(props.movmentradiusmax);

  const [frameController, setFrameController] = useState(false);
  const [frameControllerGoku, setFrameControllerGoku] = useState(0);
  const [frameControllerVegeta, setFrameControllerVegeta] = useState(false);

  useEffect(() => {
    if (turbOnFly === true) {
      if (turboControllerOnFly === true) {
        setTurboControllerOnFly(
          (turboControllerOnFly) => !turboControllerOnFly
        );
        movmentRadiusMinOnFly.current = 500;
        movmentRadiusMaxOnFly.current = 700;
      } else {
        setTurboControllerOnFly(
          (turboControllerOnFly) => !turboControllerOnFly
        );
        movmentRadiusMinOnFly.current = 200;
        movmentRadiusMaxOnFly.current = 300;
      }
    }
  }, [turbOnFly]);

  let trianglePositionX;
  let trianglePositionY;
  let trianglePositionAngle;

  const rand = (min, max) => min + Math.random() * (max - min);

  const lines = [];
  let MAX_LINES = 40;

  class SpeedLine {
    constructor(x, y, ctx) {
      if (leftward === true && forward === false) {
        trianglePositionX = rand(0, x);
        trianglePositionY = rand(0, y * 2);
        trianglePositionAngle = Math.PI * 0.5;
      } else if (rightward === true && forward === false) {
        trianglePositionX = rand(x, x * 2);
        trianglePositionY = rand(0, y * 2);
        trianglePositionAngle = Math.PI * -0.5;
      } else if (forward === true) {
        trianglePositionX = x;
        trianglePositionY = y;
        trianglePositionAngle =
          Math.PI * rand(movmentDirectionMin, movmentDirectionMax);
      } else {
        trianglePositionX = x;
        trianglePositionY = y;
        trianglePositionAngle =
          Math.PI * rand(movmentDirectionMin, movmentDirectionMax);
      }
      this.x = trianglePositionX;
      this.y = trianglePositionY;
      this.speed = rand(2, 4);
      this.life = this.curLife = rand(500, 900);
      this.angle = trianglePositionAngle;
      this.size = rand(20, 40);
      this.inRadius = rand(
        movmentRadiusMinOnFly.current,
        movmentRadiusMaxOnFly.current
      );
      this.outRadius = cw;
    }

    drawLines(ctx) {
      this.curLife -= this.speed;
      this.inRadius += this.speed * 4;

      this.size *= this.curLife / this.life;

      const { x, y, size, angle } = this,
        { inRadius, outRadius } = this;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, inRadius);
      ctx.lineTo(size, outRadius);
      ctx.lineTo(-size, outRadius);
      ctx.closePath();

      ctx.fillStyle = `rgba(225, 225, 225, 1)`;
      ctx.fill();
      ctx.restore();
    }
  }

  const draw = (ctx) => {
    function drawLines(ctx) {
      lines.forEach((line, i) => {
        if (!line || line.curLife < 0) lines[i] = new SpeedLine(cw / 2, ch / 2);
        lines[i].drawLines(ctx);
      });
    }
    drawLines(ctx);
    // the triangle
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //Define dimensions
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;

    for (let i = 0; i < MAX_LINES; i++) {
      lines[i] = new SpeedLine(cw / 2, ch / 2);
      lines[i].drawLines(ctx);
    }

    const animate = () => {
      ctx.clearRect(0, 0, cw, ch);
      drawLines(ctx);
      requestAnimationFrame(animate)
    };

    function drawLines(ctx) {
      lines.forEach((line, i) => {
        if (!line || line.curLife < 0) lines[i] = new SpeedLine(cw / 2, ch / 2);
        lines[i].drawLines(ctx);
      });
    }

    animate();

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      drawLines(ctx);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lines.length = 0;
    };
  }, [forward]);

  return <canvas className="line-speed" ref={canvasRef} {...props} />;
}
