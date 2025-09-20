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
    "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n": typeof types.PreUploadCheckDocument,
    "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": typeof types.ConfirmUploadsDocument,
    "\n  query GetFolderDetails($folderId: ID!) {\n    getFolderDetails(folderId: $folderId) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n": typeof types.GetFolderDetailsDocument,
    "\n  query GetFiles($folderId: ID) {\n    getFilesInFolder(folderId: $folderId) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": typeof types.GetFilesDocument,
    "\n  query GetFolders($folderId: ID) {\n    getFoldersInFolder(folderId: $folderId) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.GetFoldersDocument,
    "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateFolderDocument,
};
const documents: Documents = {
    "\n  mutation RegisterUser($name: String!, $email: String!, $password: String!) {\n    registerUser(input: { name: $name, email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n": types.PreUploadCheckDocument,
    "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": types.ConfirmUploadsDocument,
    "\n  query GetFolderDetails($folderId: ID!) {\n    getFolderDetails(folderId: $folderId) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n": types.GetFolderDetailsDocument,
    "\n  query GetFiles($folderId: ID) {\n    getFilesInFolder(folderId: $folderId) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n": types.GetFilesDocument,
    "\n  query GetFolders($folderId: ID) {\n    getFoldersInFolder(folderId: $folderId) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.GetFoldersDocument,
    "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateFolderDocument,
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
export function graphql(source: "\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation PreUploadCheck($files: [PreUploadFileInput!]!) {\n    preUploadCheck(files: $files) {\n      completedFiles {\n        id\n        filename\n        mimeType\n        size\n        uploadDate\n      }\n      newFiles {\n        filename\n        hash\n        uploadURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmUploads($uploads: [ConfirmUploadInput!]!) {\n    confirmUploads(uploads: $uploads) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFolderDetails($folderId: ID!) {\n    getFolderDetails(folderId: $folderId) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n"): (typeof documents)["\n  query GetFolderDetails($folderId: ID!) {\n    getFolderDetails(folderId: $folderId) {\n      id\n      name\n      path\n      realPath\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFiles($folderId: ID) {\n    getFilesInFolder(folderId: $folderId) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"): (typeof documents)["\n  query GetFiles($folderId: ID) {\n    getFilesInFolder(folderId: $folderId) {\n      id\n      filename\n      mimeType\n      size\n      uploadDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFolders($folderId: ID) {\n    getFoldersInFolder(folderId: $folderId) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetFolders($folderId: ID) {\n    getFoldersInFolder(folderId: $folderId) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFolder($name: String!, $parentId: ID) {\n    createFolder(name: $name, parentId: $parentId) {\n      id\n      name\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;