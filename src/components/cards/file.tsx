import { GetFilesQuery } from "@/__generated__/graphql";
import { useDeleteFile } from "@/hooks/use-file-actions";
import { formatBytes, formatDate } from "@/utils/formatting.utils";
import { getFileIcon } from "@/utils/getIcon.utils";
import { Clock, HardDrive, MoreHorizontal, Share2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShareModal } from "../modals/shareModal";
type FileType = GetFilesQuery["getFilesInFolder"][0];

export function FileGridItem({ file }: { file: FileType }) {
  const { deleteFile, loading: isDeleting } = useDeleteFile();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${file.filename}"?`)) {
      deleteFile(file.id);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // <-- Add this state
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if a click occurs outside of it
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
      className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
    >
      <div className="flex items-center space-x-3 mb-2">
        {getFileIcon(file.mimeType)}
        <p className="text-sm font-medium text-gray-800 break-all">
          {file.filename}
        </p>
      </div>
      <div className="text-xs text-gray-500 flex items-center justify-between">
        <span>{formatBytes(file.size)}</span>
        <span>{formatDate(file.uploadDate)}</span>
      </div>

      {/* --- MENU BUTTON --- */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents click from bubbling to the parent div
          setIsMenuOpen(!isMenuOpen);
        }}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-opacity"
      >
        <MoreHorizontal size={18} />
      </button>

      {/* --- DROPDOWN MENU --- */}
      {isMenuOpen && (
        <div className="absolute top-10 right-2 w-fit bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
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
      {isShareModalOpen && (
        <ShareModal
          itemType="file"
          itemId={file.id}
          itemName={file.filename}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}

export function FileListItem({ file }: { file: FileType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if a click occurs outside of it
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
      className="group flex items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative"
    >
      <div className="flex items-center gap-3 w-1/2">
        {getFileIcon(file.mimeType)}
        <span className="font-medium text-gray-800">{file.filename}</span>
      </div>
      <div className="w-1/4 text-sm text-gray-500 flex items-center gap-2">
        <Clock size={14} />
        <span>{formatDate(file.uploadDate)}</span>
      </div>
      <div className="w-1/4 text-sm text-gray-500 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HardDrive size={14} />
          <span>{formatBytes(file.size)}</span>
        </div>

        {/* --- MENU BUTTON --- */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
        >
          <MoreHorizontal size={18} />
        </button>

        {/* --- DROPDOWN MENU --- */}
        {isMenuOpen && (
          <div className="absolute top-10 right-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        )}
        {isShareModalOpen && (
          <ShareModal
            itemType="file"
            itemId={file.id}
            itemName={file.filename}
            onClose={() => setIsShareModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
