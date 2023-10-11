import { create } from "zustand";

const usePlanetInteraction = create((set) => ({
    /* Interazioni generiche con i pianeti */
    planetHovered : false,
    planetClicked : false,
    planetDistance : false,
    setPlanetHoveredIN: (value) => set({ planetHovered : value }),
    setPlanetHoveredOUT: (value) => set({ planetHovered : value }),
    setPlanetClicked: (value) => set({ planetClicked : value }),
    setPlanetDistance: (value) => set({ planetDistance : value }),
    /* Instruzioni per l'atterraggio */
    startLandingManeuver : false,
    setStartLandingManeuver: (value) => set({ startLandingManeuver : value }),
    /* Instruzioni per l'atterraggio */
    targetPlanet : "/NoPage",
    setTargetPlanet: (value) => set({ targetPlanet : value }),
}))

export default usePlanetInteraction;