import { create } from 'zustand';


export const useGlobalStore = create((set, get) => ({
  lng: "",
  query: "",
  obj: [{}], // 在这里定义 obj
  setPanel: (currentPanel) => {
    return !currentPanel;
  },
  panel: false,
  setObj: (item) => {
    set({ obj: item }); // 使用 set 函数更新 obj
  },
}));
