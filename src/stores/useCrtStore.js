import create from "zustand";

const useCrtStore = create((set) => ({
  currentApp: "aor",
  topbarText: "CRT Electron",
  supersessions: {},
  authStatus: "initial",

  setCurrentApp: (app) => set({ currentApp: app }),
  setTopbarText: (text) => set({ topbarText: text }),
  setAuthStatus: (data) => set({ authStatus: data }),

  setToolSupersession: (toolTag, superData) =>
    set(({ supersessions: oldSupers }) => ({
      supersessions: {
        ...oldSupers,
        [toolTag]: superData,
      },
    })),
}));

export default useCrtStore;
