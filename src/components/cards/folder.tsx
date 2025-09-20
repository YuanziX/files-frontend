import { GetFoldersQuery } from "@/__generated__/graphql";
import { formatDate } from "@/utils/formatting.utils";
import { Clock, Folder, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FolderType = GetFoldersQuery["getFoldersInFolder"][0];

export function FolderGridItem({
  folder,
  onNavigate,
}: {
  folder: FolderType;
  onNavigate: (folder: FolderType) => void;
}) {
  return (
    <div
      onClick={() => onNavigate(folder)}
      className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
    >
      <div className="flex items-center space-x-3">
        <Folder className="w-8 h-8 text-blue-500" />
        <p className="text-sm font-medium text-gray-800 truncate">
          {folder.name}
        </p>
      </div>
      <button className="absolute top-2 right-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-opacity">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export function FolderListItem({
  folder,
}: {
  folder: FolderType;
  onNavigate: (folder: FolderType) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/${folder.id}`)}
      className="group flex items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-3 w-1/2">
        <Folder className="w-6 h-6 text-blue-500" />
        <span className="font-medium text-gray-800">{folder.name}</span>
      </div>
      <div className="w-1/4 text-sm text-gray-500 flex items-center gap-2">
        <Clock size={14} />
        <span>{formatDate(folder.createdAt)}</span>
      </div>
      <div className="w-1/4 flex justify-end">
        <button className="p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
