import { create } from "zustand";

const useInterfaceSetting = create((set) => ({
    /* Abilito i Controlli */
    controlsEnabled : true,
    setControlsEnabled: () => set((state) => ({ controlsEnabled : !state.controlsEnabled })),
    setControlsEnabledFromPlanet: (value) => set({ controlsEnabled : value }),
    resetControlsEnabled: () => set({ controlsEnabled : true }),
    /* Controllo l'apertura dei menu */
    helpMenuController : false,
    setHelpMenuController: () => set((state) => ({ helpMenuController : !state.helpMenuController })),
    mainMenuController : false,
    setMainMenuController: () => set((state) => ({ mainMenuController : !state.mainMenuController })),
}))

export default useInterfaceSetting;