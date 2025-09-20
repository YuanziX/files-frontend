import { create } from "zustand";

export type UploadStatus =
  | "hashing"
  | "pending"
  | "uploading"
  | "completed"
  | "error";

export interface UploadProgress {
  file: File;
  status: UploadStatus;
  progress: number;
  errorMessage?: string;
}

interface UploadState {
  uploadProgress: Record<string, UploadProgress>;
  isPanelOpen: boolean;
}

interface UploadActions {
  startUploads: (files: File[]) => void;
  updateFileProgress: (
    fileName: string,
    updates: Partial<UploadProgress>
  ) => void;
  setPanelOpen: (isOpen: boolean) => void;
  clearUploads: () => void;
}

export const useUploadStore = create<UploadState & UploadActions>((set) => ({
  uploadProgress: {},
  isPanelOpen: false,

  setPanelOpen: (isOpen: boolean) => set({ isPanelOpen: isOpen }),

  startUploads: (files: File[]) => {
    const initialProgress: Record<string, UploadProgress> = {};
    files.forEach((file) => {
      initialProgress[file.name] = { file, status: "hashing", progress: 0 };
    });

    set((state) => ({
      uploadProgress: { ...state.uploadProgress, ...initialProgress },
      isPanelOpen: true,
    }));
  },

  updateFileProgress: (fileName: string, updates: Partial<UploadProgress>) => {
    set((state) => {
      const existingFile = state.uploadProgress[fileName];
      if (!existingFile) return state;

      return {
        uploadProgress: {
          ...state.uploadProgress,
          [fileName]: { ...existingFile, ...updates },
        },
      };
    });
  },

  clearUploads: () => {
    set({ uploadProgress: {}, isPanelOpen: false });
  },
}));
