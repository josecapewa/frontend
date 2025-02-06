import { create } from "zustand";

interface SidebarState {
  isSideBarOpen: boolean;

  toggleSidebarOpen: (open?: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSideBarOpen: true,
  toggleSidebarOpen: (open) =>
    set((state) => ({ isSideBarOpen: open ? open : !state.isSideBarOpen })),
}));

export default useSidebarStore;
