import { create } from "zustand";

interface StoreState {
  triggerCreateFolderModal: boolean;
  SetTriggerCreateFolderModal: (trigger: boolean) => void;

  showTopBar: boolean;
  SetShowTopBar: (show: boolean) => void;

  viewType: "list" | "grid";
  SetViewType: (viewType: StoreState["viewType"]) => void;
}

const useGlobalStore = create<StoreState>((set) => ({
  triggerCreateFolderModal: false,
  SetTriggerCreateFolderModal: (trigger: boolean) =>
    set({ triggerCreateFolderModal: trigger }),

  showTopBar: false,
  SetShowTopBar: (show: boolean) => set({ showTopBar: show }),

  viewType: "grid",
  SetViewType: (viewType: StoreState["viewType"]) => set({ viewType }),
}));

export default useGlobalStore;
