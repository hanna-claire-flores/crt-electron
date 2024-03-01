import create from "zustand";

const useCrtStore = create((set) => ({
  currentApp: "aor",
  topbarText: "CRT Electron",
  supersessions: {},
  ipcData: "initial",

  setCurrentApp: (app) => set({ currentApp: app }),
  setTopbarText: (text) => set({ topbarText: text }),
  setIpcData: (data) => set({ ipcData: data }),

  setToolSupersession: (toolTag, superData) =>
    set(({ supersessions: oldSupers }) => ({
      supersessions: {
        ...oldSupers,
        [toolTag]: superData,
      },
    })),
}));

export default useCrtStore;
