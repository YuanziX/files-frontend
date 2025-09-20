import { useMutation } from "@apollo/client/react";
import {
  SHARE_FILE_PUBLIC_MUTATION,
  SHARE_FOLDER_PUBLIC_MUTATION,
  SHARE_FILE_WITH_USER_MUTATION,
  SHARE_FOLDER_WITH_USER_MUTATION,
} from "./api/share";

// Hook for making a file public
export const useShareFilePublic = () => {
  const [mutate, { loading, error }] = useMutation(SHARE_FILE_PUBLIC_MUTATION, {
    onError: (err) => console.error("Failed to share file publicly:", err),
  });
  return { shareFilePublic: mutate, loading, error };
};

// Hook for making a folder public
export const useShareFolderPublic = () => {
  const [mutate, { loading, error }] = useMutation(
    SHARE_FOLDER_PUBLIC_MUTATION,
    {
      onError: (err) => console.error("Failed to share folder publicly:", err),
    }
  );
  return { shareFolderPublic: mutate, loading, error };
};

// Hook for sharing a file with a specific user
export const useShareFileWithUser = () => {
  const [mutate, { loading, error }] = useMutation(
    SHARE_FILE_WITH_USER_MUTATION,
    {
      onError: (err) => console.error("Failed to share file with user:", err),
    }
  );
  return { shareFileWithUser: mutate, loading, error };
};

// Hook for sharing a folder with a specific user
export const useShareFolderWithUser = () => {
  const [mutate, { loading, error }] = useMutation(
    SHARE_FOLDER_WITH_USER_MUTATION,
    {
      onError: (err) => console.error("Failed to share folder with user:", err),
    }
  );
  return { shareFolderWithUser: mutate, loading, error };
};
