import { graphql } from "@/__generated__/";

export const SHARE_FILE_WITH_USER_MUTATION = graphql(`
  mutation ShareFileWithUser($fileId: ID!, $email: String!) {
    shareFileWithUser(fileId: $fileId, email: $email)
  }
`);

export const SHARE_FOLDER_WITH_USER_MUTATION = graphql(`
  mutation ShareFolderWithUser($folderId: ID!, $email: String!) {
    shareFolderWithUser(folderId: $folderId, email: $email)
  }
`);

export const SHARE_FILE_PUBLIC_MUTATION = graphql(`
  mutation ShareFilePublic($fileId: ID!) {
    shareFilePublic(fileId: $fileId)
  }
`);

export const SHARE_FOLDER_PUBLIC_MUTATION = graphql(`
  mutation ShareFolderPublic($folderId: ID!) {
    shareFolderPublic(folderId: $folderId)
  }
`);
