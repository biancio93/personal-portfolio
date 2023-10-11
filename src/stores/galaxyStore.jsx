import { create } from "zustand";

const usePlanetPosition = create((set) => ({
    /* Pianeta #1 */
    cameraPositionX : 0,
    cameraPositionZ : 200,
    cameraPositionY : 70,
    cameraRotation : 0,
    setcameraPositionX: (value) => set({cameraPositionX : value}),
    setcameraPositionZ: (value) => set({cameraPositionZ : value}),
    setcameraPositionY: (value) => set({cameraPositionY : value}),
    setcameraRotation: (value) => set({cameraRotation : value}),
    resetcameraPositionX: () => set({ cameraPositionX : 0 }),
    resetcameraPositionZ: () => set({ cameraPositionZ : 200 }),
    resetcameraPositionY: () => set({ cameraPositionY : 70 }),
    /* Camera  */
    resetCamera : false,
    setResetCamera: (value) => set({resetCamera : value}),
    /* Frame Controller */
    frameController : 100,
    /* Time */
    timeController : 0,
    setTimeController: (value) => set({timeController : value}),
    resetTimeController: () => set({ timeController : 0 }),
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
    paPositionInitial : 96,
    paPositionX : 96 * Math.cos((1 + 22) * 0.03),
    paPositionZ : 96 * Math.sin((1 + 22) * 0.03),
    setPaPositionX: (value) => set({paPositionX : value}),
    setPaPositionZ: (value) => set({paPositionZ : value}),
    resetPaPositionX: () => set({ paPositionX : 96 }),
    resetPaPositionZ: () => set({ paPositionZ : 0 }),
}))

export default usePlanetPosition;