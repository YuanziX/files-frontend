import { useMutation } from "@apollo/client/react";
import { DELETE_FILE_MUTATION, DELETE_FOLDER_MUTATION } from "./api/files";
import { toast } from "sonner";

export const useDeleteFile = () => {
  const [deleteFileMutation, { loading, error }] = useMutation(
    DELETE_FILE_MUTATION,
    {
      refetchQueries: ["GetFiles", "GetFolders"],
      onError: (err) => {
        console.error("Failed to delete file:", err);
        toast.error("Failed to delete file");
      },
      onCompleted: () => {
        toast.success("File deleted successfully");
      },
    }
  );

  const deleteFile = (fileId: string) => {
    deleteFileMutation({
      variables: { fileId },
    });
  };

  return { deleteFile, loading, error };
};

/**
 * Custom hook for deleting a folder.
 * It handles the mutation logic and refetches the file/folder lists on completion.
 */
export const useDeleteFolder = () => {
  const [deleteFolderMutation, { loading, error }] = useMutation(
    DELETE_FOLDER_MUTATION,
    {
      refetchQueries: ["GetFiles", "GetFolders"],
      onError: (err) => {
        console.error("Failed to delete folder:", err);
      },
    }
  );

  const deleteFolder = (folderId: string) => {
    deleteFolderMutation({
      variables: { folderId },
    });
  };

  return { deleteFolder, loading, error };
};
