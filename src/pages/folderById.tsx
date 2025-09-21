import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { AlertCircle, Home, ChevronRight } from "lucide-react";
import {
  GET_FILES_QUERY,
  GET_FOLDERS_QUERY,
  CREATE_FOLDER_MUTATION,
  GET_FOLDER_DETAILS_QUERY,
} from "@/hooks/api/files";
import { GetFoldersQuery } from "@/__generated__/graphql";
import useGlobalStore from "@/store/globalStore";
import CreateFolderModal from "@/components/modals/createFolder.modal";
import { FolderGridItem, FolderListItem } from "@/components/cards/folder";
import { FileGridItem, FileListItem } from "@/components/cards/file";
import React from "react";

type FolderType = GetFoldersQuery["getFoldersInFolder"][0];

export default function FolderById() {
  const { id, public_token } = useParams();
  const folderId = id == "" || id == null ? null : id;
  const publicToken = public_token ?? null;

  const navigate = useNavigate();

  const globalStore = useGlobalStore();

  React.useEffect(() => {
    globalStore.SetShowTopBar(publicToken === null);
    globalStore.SetCurrentPublicToken(publicToken);
    globalStore.setCurrentFolderId(folderId);
  }, [folderId, publicToken]);

  const isModalOpen = useGlobalStore((s) => s.triggerCreateFolderModal);

  const {
    data: folderDetailsData,
    loading: folderDetailsLoading,
    error: folderDetailsError,
  } = useQuery(GET_FOLDER_DETAILS_QUERY, {
    variables: {
      folderId: folderId!,
      publicToken: publicToken,
    },
    skip: !folderId,
  });

  const {
    data: filesData,
    loading: filesLoading,
    error: filesError,
  } = useQuery(GET_FILES_QUERY, {
    variables: {
      folderId: folderId,
      publicToken: publicToken,
      filter: globalStore.fileFilterInput,
      sort: globalStore.fileSortInput,
    },
  });

  const {
    data: foldersData,
    loading: foldersLoading,
    error: foldersError,
  } = useQuery(GET_FOLDERS_QUERY, {
    variables: {
      folderId: folderId,
      publicToken: publicToken,
      filter: globalStore.folderFilterInput,
      sort: globalStore.folderSortInput,
    },
  });

  const [
    createFolder,
    { loading: createFolderLoading, error: createFolderError },
  ] = useMutation(CREATE_FOLDER_MUTATION, {
    refetchQueries: ["GetFiles", "GetFolders"],
  });

  const handleCreateFolder = (name: string) => {
    createFolder({
      variables: { name, parentId: folderId },
    });
    globalStore.SetTriggerCreateFolderModal(false);
  };

  // ✅ derive breadcrumb array
  let breadcrumbs: { id: string | null; name: string }[] = [
    { id: null, name: "My Drive" },
  ];

  if (folderId && folderDetailsData?.getFolderDetails) {
    const rawIds = folderDetailsData.getFolderDetails.path.split(".");
    const rawNames = folderDetailsData.getFolderDetails.realPath
      .split("/")
      .filter(Boolean);

    // normalize ids (replace "_" back to "-")
    const ids = rawIds.map((id) => id.replace(/_/g, "-"));

    breadcrumbs = [
      { id: null, name: "My Drive" },
      ...rawNames.map((name, i) => ({
        id: ids[i],
        name,
      })),
    ];
  }

  const handleNavigate = (folder: FolderType) => {
    if (publicToken) {
      navigate(`/share/folder/${publicToken}/${folder.id}`);
    } else {
      navigate(`/dashboard/${folder.id}`);
    }
  };

  const isLoading =
    filesLoading ||
    foldersLoading ||
    createFolderLoading ||
    folderDetailsLoading;
  const error =
    filesError || foldersError || createFolderError || folderDetailsError;

  const files = filesData?.getFilesInFolder ?? [];
  const folders = foldersData?.getFoldersInFolder ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-50 text-red-700 rounded-lg p-8">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">Something went wrong</h3>
        <p className="mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <CreateFolderModal
        isOpen={isModalOpen}
        onClose={() => globalStore.SetTriggerCreateFolderModal(false)}
        onCreate={handleCreateFolder}
        isLoading={createFolderLoading}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Home size={16} className="mr-2" />
        {breadcrumbs.map((p, index) => (
          <div key={p.id || "root"} className="flex items-center">
            <span
              onClick={() => {
                if (publicToken) {
                  navigate(`/share/folder/${publicToken}/${p.id ?? ""}`);
                } else {
                  navigate(`/dashboard/${p.id ?? ""}`);
                }
              }}
              className={`${
                index === breadcrumbs.length - 1
                  ? "font-semibold text-gray-800"
                  : "hover:underline cursor-pointer"
              }`}
            >
              {p.name}
            </span>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={16} className="mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Folders + Files */}
      <div className="space-y-8">
        {folders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Folders
            </h2>
            {globalStore.viewType === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {folders.map((folder) => (
                  <FolderGridItem
                    key={folder.id}
                    folder={folder}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {folders.map((folder) => (
                  <FolderListItem
                    key={folder.id}
                    folder={folder}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {files.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Files</h2>
            {globalStore.viewType === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {files.map((file) => (
                  <FileGridItem key={file.id} file={file} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file) => (
                  <FileListItem key={file.id} file={file} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
