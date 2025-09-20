import { create } from "zustand";

interface StoreState {
  triggerCreateFolderModal: boolean;
  SetTriggerCreateFolderModal: (trigger: boolean) => void;

  showTopBar: boolean;
  SetShowTopBar: (show: boolean) => void;

  viewType: "list" | "grid";
  SetViewType: (viewType: StoreState["viewType"]) => void;

  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (isOpen: boolean) => void;

  currentPublicToken: string | null;
  SetCurrentPublicToken: (token: string | null) => void;

  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
}

const useGlobalStore = create<StoreState>((set) => ({
  triggerCreateFolderModal: false,
  SetTriggerCreateFolderModal: (trigger: boolean) =>
    set({ triggerCreateFolderModal: trigger }),

  showTopBar: false,
  SetShowTopBar: (show: boolean) => set({ showTopBar: show }),

  viewType: "grid",
  SetViewType: (viewType: StoreState["viewType"]) => set({ viewType }),

  isUploadModalOpen: false,
  setIsUploadModalOpen: (isOpen) => set({ isUploadModalOpen: isOpen }),

  currentPublicToken: null,
  SetCurrentPublicToken: (token) => set({ currentPublicToken: token }),

  currentFolderId: null,
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
}));

export default useGlobalStore;
