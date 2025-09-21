import {
  FileFilterInput,
  FileSortInput,
  FolderFilterInput,
  FolderSortInput,
} from "@/__generated__/graphql";
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

  fileSortInput: FileSortInput | null;
  setFileSortInput: (sort: FileSortInput | null) => void;

  fileFilterInput: FileFilterInput | null;
  setFileFilterInput: (filter: FileFilterInput | null) => void;

  folderSortInput: FolderSortInput | null;
  setFolderSortInput: (sort: FolderSortInput | null) => void;

  folderFilterInput: FolderFilterInput | null;
  setFolderFilterInput: (filter: FolderFilterInput | null) => void;

  clearFileSort: () => void;
  clearFileFilter: () => void;
  clearFolderSort: () => void;
  clearFolderFilter: () => void;
  clearAllFiltersAndSorts: () => void;

  isSortFilterModalOpen: boolean;
  setIsSortFilterModalOpen: (isOpen: boolean) => void;

  logout: () => void;
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

  fileSortInput: null,
  setFileSortInput: (sort) => set({ fileSortInput: sort }),

  fileFilterInput: null,
  setFileFilterInput: (filter) => set({ fileFilterInput: filter }),

  folderSortInput: null,
  setFolderSortInput: (sort) => set({ folderSortInput: sort }),

  folderFilterInput: null,
  setFolderFilterInput: (filter) => set({ folderFilterInput: filter }),

  clearFileSort: () => set({ fileSortInput: null }),
  clearFileFilter: () => set({ fileFilterInput: null }),
  clearFolderSort: () => set({ folderSortInput: null }),
  clearFolderFilter: () => set({ folderFilterInput: null }),
  clearAllFiltersAndSorts: () =>
    set({
      fileSortInput: null,
      fileFilterInput: null,
      folderSortInput: null,
      folderFilterInput: null,
    }),

  isSortFilterModalOpen: false,
  setIsSortFilterModalOpen: (isOpen) => set({ isSortFilterModalOpen: isOpen }),

  logout: () => {
    // clear token from local storage
    localStorage.removeItem("token");
  },
}));

export default useGlobalStore;
