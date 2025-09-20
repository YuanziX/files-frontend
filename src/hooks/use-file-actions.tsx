import {
  DELETE_FILE_MUTATION,
  DELETE_FOLDER_MUTATION,
  GET_FILE_DOWNLOAD_URL_MUTATION,
} from "./api/files";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

/**
 * Custom hook to handle file downloads.
 * It fetches a download URL from the server and then triggers the browser download.
 */
export const useDownloadFile = () => {
  const [getDownloadUrl, { loading, error }] = useMutation(
    GET_FILE_DOWNLOAD_URL_MUTATION,
    {
      onError: (err) => {
        console.error("Failed to get download URL:", err);
        toast.error("Failed to get download URL");
      },
      onCompleted: (data) => {
        if (data?.getDownloadURL) {
          const { downloadURL } = data.getDownloadURL;

          const link = document.createElement("a");
          link.href = downloadURL;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      },
    }
  );

  const downloadFile = (fileId: string, publicToken?: string | null) => {
    getDownloadUrl({
      variables: {
        fileId,
        publicToken,
      },
    });
  };

  return { downloadFile, loading, error };
};

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
