/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type ConfirmUploadInput = {
  filename: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  hash: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type ConfirmUploadsResponse = {
  __typename?: 'ConfirmUploadsResponse';
  failedUploads: Array<FailedUpload>;
  files: Array<File>;
};

export type DownloadUrl = {
  __typename?: 'DownloadURL';
  downloadURL: Scalars['String']['output'];
  filename: Scalars['String']['output'];
};

export type FailedUpload = {
  __typename?: 'FailedUpload';
  hash: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  uploadDate: Scalars['Time']['output'];
};

export type Folder = {
  __typename?: 'Folder';
  childrenFiles: Array<File>;
  childrenFolders: Array<Folder>;
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentID?: Maybe<Scalars['ID']['output']>;
  path: Scalars['String']['output'];
  realPath: Scalars['String']['output'];
};

export type LoginUser = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmUploads: ConfirmUploadsResponse;
  createFolder: Folder;
  deleteFile: Scalars['Boolean']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  getDownloadURL: DownloadUrl;
  login: AuthResponse;
  preUploadCheck: PreUploadCheckResponse;
  registerUser: AuthResponse;
  revokePubliclyShared: Scalars['Boolean']['output'];
  shareFilePublic: Scalars['String']['output'];
  shareFileWithUser: Scalars['ID']['output'];
  shareFolderPublic: Scalars['String']['output'];
  shareFolderWithUser: Scalars['ID']['output'];
  unshareFileWithUser: Scalars['Boolean']['output'];
  unshareFolderWithUser: Scalars['Boolean']['output'];
};


export type MutationConfirmUploadsArgs = {
  uploads: Array<ConfirmUploadInput>;
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationDeleteFolderArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationGetDownloadUrlArgs = {
  fileId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  input: LoginUser;
};


export type MutationPreUploadCheckArgs = {
  files: Array<PreUploadFileInput>;
};


export type MutationRegisterUserArgs = {
  input: RegisterUser;
};


export type MutationRevokePubliclySharedArgs = {
  publicToken: Scalars['ID']['input'];
};


export type MutationShareFilePublicArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationShareFileWithUserArgs = {
  email: Scalars['String']['input'];
  fileId: Scalars['ID']['input'];
};


export type MutationShareFolderPublicArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationShareFolderWithUserArgs = {
  email: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
};


export type MutationUnshareFileWithUserArgs = {
  email: Scalars['String']['input'];
  fileId: Scalars['ID']['input'];
};


export type MutationUnshareFolderWithUserArgs = {
  email: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
};

export type PreSignedUrl = {
  __typename?: 'PreSignedURL';
  filename: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  uploadURL: Scalars['String']['output'];
};

export type PreUploadCheckResponse = {
  __typename?: 'PreUploadCheckResponse';
  completedFiles: Array<File>;
  newFiles: Array<PreSignedUrl>;
};

export type PreUploadFileInput = {
  filename: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  hash: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getFile?: Maybe<File>;
  getFileShares: Array<Share>;
  getFilesInFolder: Array<File>;
  getFolderDetails?: Maybe<Folder>;
  getFolderShares: Array<Share>;
  getFoldersInFolder: Array<Folder>;
  getMyShares: Array<Share>;
  me: User;
};


export type QueryGetFileArgs = {
  fileId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFileSharesArgs = {
  fileId: Scalars['ID']['input'];
};


export type QueryGetFilesInFolderArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFolderDetailsArgs = {
  folderId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFolderSharesArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryGetFoldersInFolderArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterUser = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type Share = {
  __typename?: 'Share';
  createdAt: Scalars['String']['output'];
  downloadCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  publicToken?: Maybe<Scalars['String']['output']>;
  shareType: Scalars['String']['output'];
  sharedWith?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', name: string } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', name: string } } };

export type GetFolderDetailsQueryVariables = Exact<{
  folderId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFolderDetailsQuery = { __typename?: 'Query', getFolderDetails?: { __typename?: 'Folder', id: string, name: string, path: string, realPath: string } | null };

export type GetFilesQueryVariables = Exact<{
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFilesQuery = { __typename?: 'Query', getFilesInFolder: Array<{ __typename?: 'File', id: string, filename: string, mimeType: string, size: number, uploadDate: any }> };

export type GetFoldersQueryVariables = Exact<{
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFoldersQuery = { __typename?: 'Query', getFoldersInFolder: Array<{ __typename?: 'Folder', id: string, name: string, createdAt: any }> };

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string, createdAt: any } };

export type PreUploadCheckMutationVariables = Exact<{
  files: Array<PreUploadFileInput> | PreUploadFileInput;
}>;


export type PreUploadCheckMutation = { __typename?: 'Mutation', preUploadCheck: { __typename?: 'PreUploadCheckResponse', completedFiles: Array<{ __typename?: 'File', id: string, filename: string, mimeType: string, size: number, uploadDate: any }>, newFiles: Array<{ __typename?: 'PreSignedURL', filename: string, hash: string, uploadURL: string }> } };

export type ConfirmUploadsMutationVariables = Exact<{
  uploads: Array<ConfirmUploadInput> | ConfirmUploadInput;
}>;


export type ConfirmUploadsMutation = { __typename?: 'Mutation', confirmUploads: { __typename?: 'ConfirmUploadsResponse', files: Array<{ __typename?: 'File', id: string, filename: string, uploadDate: any }>, failedUploads: Array<{ __typename?: 'FailedUpload', hash: string, reason: string }> } };

export type DeleteFileMutationVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };

export type DeleteFolderMutationVariables = Exact<{
  folderId: Scalars['ID']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder: boolean };

export type GetFileQueryVariables = Exact<{
  fileId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFileQuery = { __typename?: 'Query', getFile?: { __typename?: 'File', id: string, filename: string, mimeType: string, size: number, uploadDate: any } | null };

export type ShareFileWithUserMutationVariables = Exact<{
  fileId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type ShareFileWithUserMutation = { __typename?: 'Mutation', shareFileWithUser: string };

export type ShareFolderWithUserMutationVariables = Exact<{
  folderId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type ShareFolderWithUserMutation = { __typename?: 'Mutation', shareFolderWithUser: string };

export type ShareFilePublicMutationVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type ShareFilePublicMutation = { __typename?: 'Mutation', shareFilePublic: string };

export type ShareFolderPublicMutationVariables = Exact<{
  folderId: Scalars['ID']['input'];
}>;


export type ShareFolderPublicMutation = { __typename?: 'Mutation', shareFolderPublic: string };


export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetFolderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFolderDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"realPath"}}]}}]}}]} as unknown as DocumentNode<GetFolderDetailsQuery, GetFolderDetailsQueryVariables>;
export const GetFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilesInFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDate"}}]}}]}}]} as unknown as DocumentNode<GetFilesQuery, GetFilesQueryVariables>;
export const GetFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFoldersInFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFoldersQuery, GetFoldersQueryVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const PreUploadCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PreUploadCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreUploadFileInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preUploadCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}}]}}]}}]}}]} as unknown as DocumentNode<PreUploadCheckMutation, PreUploadCheckMutationVariables>;
export const ConfirmUploadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmUploads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmUploadInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmUploads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploads"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"failedUploads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]} as unknown as DocumentNode<ConfirmUploadsMutation, ConfirmUploadsMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}]}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}]}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const GetFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"uploadDate"}}]}}]}}]} as unknown as DocumentNode<GetFileQuery, GetFileQueryVariables>;
export const ShareFileWithUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShareFileWithUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareFileWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ShareFileWithUserMutation, ShareFileWithUserMutationVariables>;
export const ShareFolderWithUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShareFolderWithUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareFolderWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ShareFolderWithUserMutation, ShareFolderWithUserMutationVariables>;
export const ShareFilePublicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShareFilePublic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareFilePublic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}]}]}}]} as unknown as DocumentNode<ShareFilePublicMutation, ShareFilePublicMutationVariables>;
export const ShareFolderPublicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShareFolderPublic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareFolderPublic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}]}]}}]} as unknown as DocumentNode<ShareFolderPublicMutation, ShareFolderPublicMutationVariables>;