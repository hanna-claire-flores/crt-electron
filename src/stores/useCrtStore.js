import create from "zustand";

const useCrtStore = create((set) => ({
  currentApp: "aor",
  topbarText: "CRT Electron",
  supersessions: {},
  tokenData: null,

  setCurrentApp: (app) => set({ currentApp: app }),
  setTopbarText: (text) => set({ topbarText: text }),
  setTokenData: (data) => set({ tokenData: data }),

  setToolSupersession: (toolTag, superData) =>
    set(({ supersessions: oldSupers }) => ({
      supersessions: {
        ...oldSupers,
        [toolTag]: superData,
      },
    })),
}));

export default useCrtStore;
