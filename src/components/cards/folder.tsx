import { useState, useRef, useEffect } from "react";
import { GetFoldersQuery } from "@/__generated__/graphql";
import { formatDate } from "@/utils/formatting.utils";
import {
  Folder,
  MoreHorizontal,
  Trash2,
  Share2,
  Copy,
  FolderOpen,
  Calendar,
} from "lucide-react";
import { useDeleteFolder } from "@/hooks/use-file-actions";
import { ShareModal } from "../modals/shareModal";
import { toast } from "sonner";

type FolderType = GetFoldersQuery["getFoldersInFolder"][0];

export function FolderGridItem({
  folder,
  onNavigate,
}: {
  folder: FolderType;
  onNavigate: (folder: FolderType) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Main Card */}
      <div
        onClick={() => onNavigate(folder)}
        className="relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 hover:border-blue-300/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
      >
        {/* Folder Icon with Minimal Background */}
        <div className="relative mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-slate-300 rounded-xl flex items-center justify-center shadow-sm mb-3">
            <div className="text-slate-600">
              {isHovered ? <FolderOpen size={24} /> : <Folder size={24} />}
            </div>
          </div>
        </div>

        {/* Folder Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight">
            {folder.name}
          </h3>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Folder size={12} />
              <span className="font-medium">Folder</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(folder.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Quick Actions */}
        <div
          className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsShareModalOpen(true);
              }}
              className="p-2 bg-white/90 text-slate-600 rounded-lg hover:bg-white hover:text-blue-600 transition-colors shadow-sm"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle copy link
                navigator.clipboard.writeText(
                  `${window.location.origin}/dashboard/${folder.id}`
                );
                toast.success("Link copied to clipboard");
              }}
              className="p-2 bg-white/90 text-slate-600 rounded-lg hover:bg-white hover:text-slate-700 transition-colors shadow-sm"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={`absolute top-3 right-3 p-2 bg-white/90 text-slate-500 rounded-lg hover:bg-white hover:text-slate-700 transition-all duration-200 shadow-sm ${
          isMenuOpen || isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <MoreHorizontal size={16} />
      </button>

      {/* Enhanced Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-12 right-3 w-48 bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-xl z-20 overflow-hidden">
          <div className="py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsShareModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Share2 size={16} />
              <span>Share folder</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle copy link
                navigator.clipboard.writeText(
                  `${window.location.origin}/dashboard/${folder.id}`
                );
                toast.success("Link copied to clipboard");

                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Copy size={16} />
              <span>Copy link</span>
            </button>
            <hr className="my-2 border-slate-200" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setIsMenuOpen(false);
              }}
              disabled={isDeleting}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={16} />
              <span>{isDeleting ? "Deleting..." : "Delete folder"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          itemType="folder"
          itemId={folder.id}
          itemName={folder.name}
          onClose={() => setIsShareModalOpen(false)}
        />
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={() => onNavigate(folder)}
        className="flex items-center w-full p-4 rounded-xl hover:bg-white/60 hover:shadow-sm cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-200/60"
      >
        {/* Folder Icon & Name */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-slate-300 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <div className="text-slate-600">
              {isHovered ? <FolderOpen size={20} /> : <Folder size={20} />}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-800 truncate text-sm">
              {folder.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">FOLDER</p>
          </div>
        </div>

        {/* Created Date */}
        <div className="hidden sm:flex items-center gap-2 w-32 flex-shrink-0">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-sm text-slate-600">
            {formatDate(folder.createdAt)}
          </span>
        </div>

        {/* Type */}
        <div className="hidden md:flex items-center gap-2 w-24 flex-shrink-0">
          <Folder size={14} className="text-slate-400" />
          <span className="text-sm text-slate-600 font-medium">Folder</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsShareModalOpen(true);
            }}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Share2 size={16} />
          </button>

          {/* Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Enhanced Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-1 w-48 bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-xl z-20 overflow-hidden">
          <div className="py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsShareModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Share2 size={16} />
              <span>Share folder</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle copy link
                navigator.clipboard.writeText(
                  `${window.location.origin}/dashboard/${folder.id}`
                );
                toast.success("Link copied to clipboard");
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Copy size={16} />
              <span>Copy link</span>
            </button>
            <hr className="my-2 border-slate-200" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setIsMenuOpen(false);
              }}
              disabled={isDeleting}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 size={16} />
              <span>{isDeleting ? "Deleting..." : "Delete folder"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          itemType="folder"
          itemId={folder.id}
          itemName={folder.name}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}
