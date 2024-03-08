import { create } from 'zustand';


export const useGlobalStore = create((set, get) => ({
  lng: "",

  setPanel: (currentPanel) => {
    return !currentPanel;
  },
  panel: false,
}));
