import { graphql } from "@/__generated__";

export const GET_FOLDER_DETAILS_QUERY = graphql(`
  query GetFolderDetails($folderId: ID!) {
    getFolderDetails(folderId: $folderId) {
      id
      name
      path
      realPath
    }
  }
`);

export const GET_FILES_QUERY = graphql(`
  query GetFiles($folderId: ID) {
    getFilesInFolder(folderId: $folderId) {
      id
      filename
      mimeType
      size
      uploadDate
    }
  }
`);

export const GET_FOLDERS_QUERY = graphql(`
  query GetFolders($folderId: ID) {
    getFoldersInFolder(folderId: $folderId) {
      id
      name
      createdAt
    }
  }
`);

export const CREATE_FOLDER_MUTATION = graphql(`
  mutation CreateFolder($name: String!, $parentId: ID) {
    createFolder(name: $name, parentId: $parentId) {
      id
      name
      createdAt
    }
  }
`);

export const PRE_UPLOAD_CHECK_MUTATION = graphql(`
  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {
    preUploadCheck(files: $files) {
      completedFiles {
        id
        filename
        mimeType
        size
        uploadDate
      }
      newFiles {
        filename
        hash
        uploadURL
      }
    }
  }
`);

export const CONFIRM_UPLOADS_MUTATION = graphql(`
  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {
    confirmUploads(uploads: $uploads) {
      id
      filename
      mimeType
      size
      uploadDate
    }
  }
`);
