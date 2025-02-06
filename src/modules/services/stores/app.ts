import { MenuOption } from "@/modules/types/menu";
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
  targetPath: string | null;
  setTargetPath: (targetPath: string | null) => void;
  setViewStyle: (viewStyle: TPossibleViewStyles) => void;
  lectiveYear: LectiveYear | null;
  setLectiveYear: (lectiveYear: LectiveYear) => void;
  selectedMenu: MenuOption | null;
  screenPermissions: Permission[] | null;
  fastSettingsOpen: boolean;
  loged: boolean;
  setLoged: (loged: boolean) => void;
  setFastSettingsOpen: (fastSettingsOpen: boolean) => void;
  setScreenPermissions: (screenPermissions: Permission[]) => void;
  setSelectedMenu: (menu: MenuOption) => void;
};
export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      viewStyle: "table",
      imageQuery: null,
      screenPermissions: null,
      previusLocation: null,
      targetPath: null,
      setTargetPath: (targetPath) => set({ targetPath }),
      setPreviusLocation: (previusLocation) => set({ previusLocation }),
      fastSettingsOpen: false,
      dontAskAgain: false,
      loged: false,
      setLoged: (loged) => set({ loged }),
      setFastSettingsOpen: (fastSettingsOpen) => set({ fastSettingsOpen }),
      setScreenPermissions: (screenPermissions) => set({ screenPermissions }),
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
