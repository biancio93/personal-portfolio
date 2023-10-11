import { create } from "zustand";

const useMobileStore = create((set) => ({
    /* Abilito i Controlli */
    controlsEnabled : true,
    setControlsEnabled: () => set((state) => ({ controlsEnabled : !state.controlsEnabled })),
    setControlsEnabledFromPlanet: (value) => set({ controlsEnabled : value }),
    resetControlsEnabled: () => set({ controlsEnabled : true }),
    /* Controllo l'apertura dei menu */
    screenHeight : 0,
    setScreenHeight: (value) => set({ screenHeight : value }),
    /* Controllo il cambio di pagina */
    lazyTrick : false,
    setLazyTrick: () => set((state) => ({ lazyTrick : !state.lazyTrick })),
    /* Controllo la navicella */
    starshipMove : false,
    starshipAngle : 0,
    setStarshipAngle: (value) => set({ starshipAngle : value }),
    setStarshipMove: (value) => set({ starshipMove : value }),
    /* starship position */
    starshipPositionX : 0,
    starshipPositionY : 0,
    starshipPositionZ : 80,
    setStarshipPositionX: (value) => set({ starshipPositionX : value }),
    setStarshipPositionY: (value) => set({ starshipPositionY : value }),
    setStarshipPositionZ: (value) => set({ starshipPositionZ : value }),
    /* posizione dei pianeti */
    /* Time */
    timeController: 0,
    setTimeController: (value) => set({ timeController : value }),
    /* Pianeta #1 */
    pcPositionInitial : 34,
    pcPositionX : 34,
    pcPositionZ : 0,
    setPcPositionX: (value) => set({pcPositionX : value}),
    setPcPositionZ: (value) => set({pcPositionZ : value}),
    resetPcPositionX: () => set({ pcPositionX : 34 }),
    resetPcPositionZ: () => set({ pcPositionZ : 0 }),
    /* Pianeta #2 */
    pwPositionInitial : 56,
    pwPositionX : 56 * Math.cos((1 + 54) * 0.04),
    pwPositionZ : 56 * Math.sin((1 + 54) * 0.04),
    setPwPositionX: (value) => set({pwPositionX : value}),
    setPwPositionZ: (value) => set({pwPositionZ : value}),
    resetPwPositionX: () => set({ pwPositionX : 56 }),
    resetPwPositionZ: () => set({ pwPositionZ : 0 }),
    /* Pianeta #3 */
    paPositionInitial : 70,
    paPositionX : 0,
    paPositionZ : 0,
    setPaPositionX: (value) => set({paPositionX : value}),
    setPaPositionZ: (value) => set({paPositionZ : value}),
    resetPaPositionX: () => set({ paPositionX : 70 }),
    resetPaPositionZ: () => set({ paPositionZ : 0 }),
    /* LANDING MESSAGE */
    enableNavigationAlert : false,
    denayNavigationAlert : false,
    planetToLanding : "none",
    setEnableNavigationAlert: (value) => set({enableNavigationAlert : value}),
    setPlanetToLanding: (value) => set({planetToLanding : value}),
    setDenayNavigationAlert: (value) => set({denayNavigationAlert : value}),
}))

export default useMobileStore;