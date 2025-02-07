import { MenuOption } from "@/modules/types/MenuOption";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AppStore = {
  imageQuery: string | null;
  setImageQuery: (imageQuery: string) => void;
  viewStyle: TPossibleViewStyles;
  previusLocation: {
    position: number;
    path: string;
  } | null;
  setPreviusLocation: (
    previusLocation: {
      position: number;
      path: string;
    } | null
  ) => void;
  setViewStyle: (viewStyle: TPossibleViewStyles) => void;
  lectiveYear: LectiveYear | null;
  setLectiveYear: (lectiveYear: LectiveYear) => void;
  selectedMenu: MenuOption | null;
  fastSettingsOpen: boolean;
  loged: boolean;
  setLoged: (loged: boolean) => void;
  setFastSettingsOpen: (fastSettingsOpen: boolean) => void;
  setSelectedMenu: (menu: MenuOption) => void;
};
export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      viewStyle: "table",
      imageQuery: null,
      previusLocation: null,
      setPreviusLocation: (previusLocation) => set({ previusLocation }),
      fastSettingsOpen: false,
      dontAskAgain: false,
      loged: false,
      setLoged: (loged) => set({ loged }),
      setFastSettingsOpen: (fastSettingsOpen) => set({ fastSettingsOpen }),
      setImageQuery: (imageQuery) => set({ imageQuery }),
      lectiveYear: null,
      selectedMenu: null,
      setViewStyle: (viewStyle) => set({ viewStyle }),
      setLectiveYear: (lectiveYear) => set({ lectiveYear }),
      setSelectedMenu: (selectedMenu) => set({ selectedMenu }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
