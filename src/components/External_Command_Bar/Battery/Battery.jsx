import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Battery() {
  const batteryPoint = useRef([]);
  const batteryLevel = useRef();
  const tl = useRef();
  const tlBattery = useRef();

  useEffect(() => {
    const points = batteryPoint.current;

    const finishBattery = (() => {
      window.location.href = "https://www.google.com/";
    })

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline();

      points.forEach((point) => {
        tl.current
        .to(point, { duration: 0.2, backgroundColor: "#00DF4C", borderColor: "#006B24", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0.8)', ease: 'power1.inOut'})
      });

      tlBattery.current = gsap.timeline({onComplete: finishBattery});
      tlBattery.current
        .to(points[5], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=30")
        .to(points[4], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=60")
        .to(points[3], { duration: 0.2, backgroundColor: "#FF7726", borderColor: "#A94509", boxShadow: '0px 0px 8px rgba(255, 119, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[2], { duration: 0.2, backgroundColor: "#FF7726", borderColor: "#A94509", boxShadow: '0px 0px 8px rgba(255, 119, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[1], { duration: 0.2, backgroundColor: "#FF7726", borderColor: "#A94509", boxShadow: '0px 0px 8px rgba(255, 119, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[0], { duration: 0.2, backgroundColor: "#FF7726", borderColor: "#A94509", boxShadow: '0px 0px 8px rgba(255, 119, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[3], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=120")
        .to(points[2], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=120")
        .to(points[1], { duration: 0.2, backgroundColor: "#FF2626", borderColor: "#C81B1B", boxShadow: '0px 0px 8px rgba(255, 38, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[0], { duration: 0.2, backgroundColor: "#FF2626", borderColor: "#C81B1B", boxShadow: '0px 0px 8px rgba(255, 38, 38, 0.8)', ease: 'power1.inOut'},"<")
        .to(points[1], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=180")
        .to(points[0], { duration: 0.2, backgroundColor: "#909090", borderColor: "#727272", boxShadow: '0px 0px 8px rgba(0, 223, 76, 0)', ease: 'power1.inOut'},"<+=180")
    }, batteryLevel.current);

    return () => ctx.revert();
  })

  return (
    <>
      <div className="battery-level-container">
        <span className="battery-level">
          <span ref={(el) => (batteryPoint.current[5] = el)} className="battery-level-point"></span>
          <span ref={(el) => (batteryPoint.current[4] = el)} className="battery-level-point"></span>
          <span ref={(el) => (batteryPoint.current[3] = el)} className="battery-level-point"></span>
          <span ref={(el) => (batteryPoint.current[2] = el)} className="battery-level-point"></span>
          <span ref={(el) => (batteryPoint.current[1] = el)} className="battery-level-point"></span>
          <span ref={(el) => (batteryPoint.current[0] = el)} className="battery-level-point"></span>
        </span>
        <h6 className="battery-title">
          <span>B</span>
          <span>A</span>
          <span>T</span>
          <span>T</span>
          <span>E</span>
          <span>R</span>
          <span>Y</span>
        </h6>
      </div>
    </>
  );
}
