import { create } from 'zustand';


export const useGlobalStore = create((set, get) => ({
  lng: "",
  query: "",
  setPanel: (currentPanel) => {
    return !currentPanel;
  },
  panel: false,
}));
