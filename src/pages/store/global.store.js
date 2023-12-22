import { create } from 'zustand';


export const useGlobalStore = create<GlobalStore>((set, get) => ({
  toggleDropDownNavbar: () => {
    set((prev) => ({
      showDropDownNavbar: !prev.showDropDownNavbar
    }));
  },
  lng: '',
  setLng: () => {
    set({ lng });
  }
}));
