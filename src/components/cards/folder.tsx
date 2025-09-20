import { useState, useRef, useEffect } from "react";
import { GetFoldersQuery } from "@/__generated__/graphql";
import { formatDate } from "@/utils/formatting.utils";
import { Clock, Folder, MoreHorizontal, Trash2, Share2 } from "lucide-react";
import { useDeleteFolder } from "@/hooks/use-file-actions"; // Your custom hook

type FolderType = GetFoldersQuery["getFoldersInFolder"][0];

export function FolderGridItem({
  folder,
  onNavigate,
}: {
  folder: FolderType;
  onNavigate: (folder: FolderType) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { deleteFolder, loading: isDeleting } = useDeleteFolder();

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${folder.name}"? This cannot be undone.`
      )
    ) {
      deleteFolder(folder.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      onClick={() => onNavigate(folder)}
      className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
    >
      <div className="flex items-center space-x-3">
        <Folder className="w-8 h-8 text-blue-500" />
        <p className="text-sm font-medium text-gray-800 truncate">
          {folder.name}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-opacity"
      >
        <MoreHorizontal size={18} />
      </button>

      {isMenuOpen && (
        <div className="absolute top-10 right-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={16} />
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function FolderListItem({
  folder,
  onNavigate,
}: {
  folder: FolderType;
  onNavigate: (folder: FolderType) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { deleteFolder, loading: isDeleting } = useDeleteFolder();

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${folder.name}"? This cannot be undone.`
      )
    ) {
      deleteFolder(folder.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      onClick={() => onNavigate(folder)}
      className="group flex items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative"
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
        >
          <MoreHorizontal size={18} />
        </button>

        {isMenuOpen && (
          <div className="absolute top-10 right-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
