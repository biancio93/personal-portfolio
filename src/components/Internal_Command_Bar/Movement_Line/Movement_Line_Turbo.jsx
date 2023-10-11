import "./movement-line.css";
import { useRef, useEffect, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";

export default function MovementLineStandard(props) {
  const [turboController, setTurboController] = useState(false);
  const turbo = useKeyboardControls((state) => state.turbo);
  const forward = useKeyboardControls((state) => state.forward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  let cw = useRef(0);
  let ch = useRef(0);

  let movmentDirectionMax = 2; // -1 right & 1 left
  let movmentDirectionMin = 0; // -1 right & 1 left
  let movmentRadiusMin = useRef(500); // 500 standard & 200 turbo
  let movmentRadiusMax = useRef(700);

  useEffect(() => {
    if (turbo === true) {
      if (turboController === true) {
        setTurboController((turboController) => !turboController);
        movmentRadiusMin.current = 500;
        movmentRadiusMax.current = 700;
      } else {
        setTurboController((turboController) => !turboController);
        movmentRadiusMin.current = 200;
        movmentRadiusMax.current = 300;
      }
    }
  }, [turbo]);

  const rand = (min, max) => min + Math.random() * (max - min);

  const lines = [];
  let MAX_LINES = 200;

  class SpeedLine {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.speed = rand(2, 4);
      this.life = this.curLife = rand(500, 900);
      this.alpha = rand(0.25, 1);
      this.angle = Math.PI * rand(movmentDirectionMin, movmentDirectionMax);
      this.size = rand(20, 40);
      this.inRadius = rand(movmentRadiusMin.current, movmentRadiusMax.current);
      this.outRadius = cw;
    }

    drawLines(ctx) {
      this.curLife -= this.speed;
      this.inRadius += this.speed * 4;

      this.alpha *= this.curLife / this.life;
      this.size *= this.curLife / this.life;

      const { x, y, size, angle, alpha } = this,
        { inRadius, outRadius } = this;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, inRadius);
      ctx.lineTo(size, outRadius);
      ctx.lineTo(-size, outRadius);
      ctx.closePath();

      ctx.fillStyle = `rgba(225, 225, 225, ${alpha})`;
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
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, cw, ch);
      drawLines(ctx);
    };

    function drawLines(ctx) {
      lines.forEach((line, i) => {
        if (!line || line.curLife < 0) lines[i] = new SpeedLine(cw / 2, ch / 2);
        lines[i].drawLines(ctx);
      });
    }

    animate();

    console.log("test");

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      drawLines(ctx);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [turboController]);

  return <canvas className="line-speed" ref={canvasRef} {...props} />;
}
