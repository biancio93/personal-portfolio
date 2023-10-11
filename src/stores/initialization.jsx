import { create } from "zustand";

const useInitialization = create((set) => ({
    /* Inizializzazione Header  */
    initilization : false,
    setInitilization: (value) => set({initilization : value}),
    /* Inizializzazione Scena  */
    initilizationScene : false,
    setInitilizationScene: (value) => set({initilizationScene : value}),
}))

export default useInitialization;