/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation RegisterUser($name: String!, $email: String!, $password: String!) {\n    registerUser(input: { name: $name, email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": typeof types.RegisterUserDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query GetFolderDetails($folderId: ID!, $publicToken: String) {\n    getFolderDetails(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n": typeof types.GetFolderDetailsDocument,
    "\n  query GetFiles($folderId: ID, $publicToken: String) {\n    getFilesInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": typeof types.GetFilesDocument,
    "\n  query GetFolders($folderId: ID, $publicToken: String) {\n    getFoldersInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.GetFoldersDocument,
    "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateFolderDocument,
    "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n": typeof types.PreUploadCheckDocument,
    "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      files {\n        id\n        filename\n        uploadDate\n      }\n      failedUploads {\n        hash\n        reason\n      }\n    }\n  }\n": typeof types.ConfirmUploadsDocument,
    "\n  mutation DeleteFile($fileId: ID!) {\n    deleteFile(fileId: $fileId)\n  }\n": typeof types.DeleteFileDocument,
    "\n  mutation DeleteFolder($folderId: ID!) {\n    deleteFolder(folderId: $folderId)\n  }\n": typeof types.DeleteFolderDocument,
    "\n  query GetFile($fileId: ID!, $publicToken: String) {\n    getFile(fileId: $fileId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": typeof types.GetFileDocument,
    "\n  mutation GetDownloadURL($fileId: ID!, $publicToken: String) {\n    getDownloadURL(fileId: $fileId, publicToken: $publicToken) {\n      downloadURL\n      filename\n    }\n  }\n": typeof types.GetDownloadUrlDocument,
    "\n  mutation ShareFileWithUser($fileId: ID!, $email: String!) {\n    shareFileWithUser(fileId: $fileId, email: $email)\n  }\n": typeof types.ShareFileWithUserDocument,
    "\n  mutation ShareFolderWithUser($folderId: ID!, $email: String!) {\n    shareFolderWithUser(folderId: $folderId, email: $email)\n  }\n": typeof types.ShareFolderWithUserDocument,
    "\n  mutation ShareFilePublic($fileId: ID!) {\n    shareFilePublic(fileId: $fileId)\n  }\n": typeof types.ShareFilePublicDocument,
    "\n  mutation ShareFolderPublic($folderId: ID!) {\n    shareFolderPublic(folderId: $folderId)\n  }\n": typeof types.ShareFolderPublicDocument,
};
const documents: Documents = {
    "\n  mutation RegisterUser($name: String!, $email: String!, $password: String!) {\n    registerUser(input: { name: $name, email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query GetFolderDetails($folderId: ID!, $publicToken: String) {\n    getFolderDetails(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n": types.GetFolderDetailsDocument,
    "\n  query GetFiles($folderId: ID, $publicToken: String) {\n    getFilesInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": types.GetFilesDocument,
    "\n  query GetFolders($folderId: ID, $publicToken: String) {\n    getFoldersInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.GetFoldersDocument,
    "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateFolderDocument,
    "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n": types.PreUploadCheckDocument,
    "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      files {\n        id\n        filename\n        uploadDate\n      }\n      failedUploads {\n        hash\n        reason\n      }\n    }\n  }\n": types.ConfirmUploadsDocument,
    "\n  mutation DeleteFile($fileId: ID!) {\n    deleteFile(fileId: $fileId)\n  }\n": types.DeleteFileDocument,
    "\n  mutation DeleteFolder($folderId: ID!) {\n    deleteFolder(folderId: $folderId)\n  }\n": types.DeleteFolderDocument,
    "\n  query GetFile($fileId: ID!, $publicToken: String) {\n    getFile(fileId: $fileId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": types.GetFileDocument,
    "\n  mutation GetDownloadURL($fileId: ID!, $publicToken: String) {\n    getDownloadURL(fileId: $fileId, publicToken: $publicToken) {\n      downloadURL\n      filename\n    }\n  }\n": types.GetDownloadUrlDocument,
    "\n  mutation ShareFileWithUser($fileId: ID!, $email: String!) {\n    shareFileWithUser(fileId: $fileId, email: $email)\n  }\n": types.ShareFileWithUserDocument,
    "\n  mutation ShareFolderWithUser($folderId: ID!, $email: String!) {\n    shareFolderWithUser(folderId: $folderId, email: $email)\n  }\n": types.ShareFolderWithUserDocument,
    "\n  mutation ShareFilePublic($fileId: ID!) {\n    shareFilePublic(fileId: $fileId)\n  }\n": types.ShareFilePublicDocument,
    "\n  mutation ShareFolderPublic($folderId: ID!) {\n    shareFolderPublic(folderId: $folderId)\n  }\n": types.ShareFolderPublicDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser($name: String!, $email: String!, $password: String!) {\n    registerUser(input: { name: $name, email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($name: String!, $email: String!, $password: String!) {\n    registerUser(input: { name: $name, email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFolderDetails($folderId: ID!, $publicToken: String) {\n    getFolderDetails(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n"): (typeof documents)["\n  query GetFolderDetails($folderId: ID!, $publicToken: String) {\n    getFolderDetails(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFiles($folderId: ID, $publicToken: String) {\n    getFilesInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"): (typeof documents)["\n  query GetFiles($folderId: ID, $publicToken: String) {\n    getFilesInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFolders($folderId: ID, $publicToken: String) {\n    getFoldersInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetFolders($folderId: ID, $publicToken: String) {\n    getFoldersInFolder(folderId: $folderId, publicToken: $publicToken) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      files {\n        id\n        filename\n        uploadDate\n      }\n      failedUploads {\n        hash\n        reason\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      files {\n        id\n        filename\n        uploadDate\n      }\n      failedUploads {\n        hash\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFile($fileId: ID!) {\n    deleteFile(fileId: $fileId)\n  }\n"): (typeof documents)["\n  mutation DeleteFile($fileId: ID!) {\n    deleteFile(fileId: $fileId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFolder($folderId: ID!) {\n    deleteFolder(folderId: $folderId)\n  }\n"): (typeof documents)["\n  mutation DeleteFolder($folderId: ID!) {\n    deleteFolder(folderId: $folderId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFile($fileId: ID!, $publicToken: String) {\n    getFile(fileId: $fileId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"): (typeof documents)["\n  query GetFile($fileId: ID!, $publicToken: String) {\n    getFile(fileId: $fileId, publicToken: $publicToken) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GetDownloadURL($fileId: ID!, $publicToken: String) {\n    getDownloadURL(fileId: $fileId, publicToken: $publicToken) {\n      downloadURL\n      filename\n    }\n  }\n"): (typeof documents)["\n  mutation GetDownloadURL($fileId: ID!, $publicToken: String) {\n    getDownloadURL(fileId: $fileId, publicToken: $publicToken) {\n      downloadURL\n      filename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ShareFileWithUser($fileId: ID!, $email: String!) {\n    shareFileWithUser(fileId: $fileId, email: $email)\n  }\n"): (typeof documents)["\n  mutation ShareFileWithUser($fileId: ID!, $email: String!) {\n    shareFileWithUser(fileId: $fileId, email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ShareFolderWithUser($folderId: ID!, $email: String!) {\n    shareFolderWithUser(folderId: $folderId, email: $email)\n  }\n"): (typeof documents)["\n  mutation ShareFolderWithUser($folderId: ID!, $email: String!) {\n    shareFolderWithUser(folderId: $folderId, email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ShareFilePublic($fileId: ID!) {\n    shareFilePublic(fileId: $fileId)\n  }\n"): (typeof documents)["\n  mutation ShareFilePublic($fileId: ID!) {\n    shareFilePublic(fileId: $fileId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ShareFolderPublic($folderId: ID!) {\n    shareFolderPublic(folderId: $folderId)\n  }\n"): (typeof documents)["\n  mutation ShareFolderPublic($folderId: ID!) {\n    shareFolderPublic(folderId: $folderId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;