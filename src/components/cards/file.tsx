import { GetFilesQuery } from "@/__generated__/graphql";
import { useDeleteFile, useDownloadFile } from "@/hooks/use-file-actions";
import { formatBytes, formatDate } from "@/utils/formatting.utils";
import { getFileIcon, getFileTypeStyle } from "@/utils/getIcon.utils";
import {
  Clock,
  HardDrive,
  MoreHorizontal,
  Share2,
  Trash2,
  Download,
  Copy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShareModal } from "../modals/shareModal";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "@/store/globalStore";
import { toast } from "sonner";
import { BlurFade } from "@/components/ui/blur-fade";

type FileType = GetFilesQuery["getFilesInFolder"][0];

export function FileGridItem({ file }: { file: FileType }) {
  const { deleteFile, loading: isDeleting } = useDeleteFile();
  const { currentPublicToken } = useGlobalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${file.filename}"?`)) {
      deleteFile(file.id);
    }
  };

  const handleFileClick = () => {
    if (currentPublicToken) {
      navigate(`/share/file/${currentPublicToken}/${file.id}`);
    } else {
      navigate(`/file/${file.id}`);
    }
  };

  const { downloadFile } = useDownloadFile();

  // Close menu on outside click
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
      <BlurFade delay={0}>
        <div
          onClick={handleFileClick}
          className="relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 hover:border-blue-300/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
        >
          {/* File Icon with Gradient Background */}
          <div className="relative mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${getFileTypeStyle(
                file.mimeType
              )} rounded-xl flex items-center justify-center shadow-lg mb-3`}
            >
              <div className="text-white">{getFileIcon(file.mimeType, 24)}</div>
            </div>
          </div>

          {/* File Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight">
              {file.filename}
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <HardDrive size={12} />
                <span className="font-medium">{formatBytes(file.size)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatDate(file.uploadDate)}</span>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick Actions */}
          <div
            className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
                downloadFile(file.id, currentPublicToken);
                toast.success("Downloading");
              }}
              className="p-2 bg-white/90 text-slate-600 rounded-lg hover:bg-white hover:text-green-600 transition-colors shadow-sm"
            >
              <Download size={14} />
            </button>
          </div>
        </div>
      </BlurFade>

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
              <span>Share file</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${window.location.origin}/file/${file.id}`
                );
                toast.success("Link copied to clipboard");
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Copy size={16} />
              <span>Copy link</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
                downloadFile(file.id, currentPublicToken);
                toast.success("Downloading");
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
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
              <span>{isDeleting ? "Deleting..." : "Delete file"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
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
  const { deleteFile, loading: isDeleting } = useDeleteFile();
  const { currentPublicToken } = useGlobalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${file.filename}"?`)) {
      deleteFile(file.id);
    }
  };

  const handleFileClick = () => {
    if (currentPublicToken) {
      navigate(`/share/file/${currentPublicToken}/${file.id}`);
    } else {
      navigate(`/file/${file.id}`);
    }
  };

  // Close menu on outside click
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

  // Get file type for styling
  const getFileTypeStyle = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "from-pink-500 to-rose-500";
    if (mimeType.startsWith("video/")) return "from-purple-500 to-indigo-500";
    if (mimeType.startsWith("audio/")) return "from-green-500 to-emerald-500";
    if (mimeType.includes("pdf")) return "from-red-500 to-red-600";
    if (mimeType.includes("document") || mimeType.includes("word"))
      return "from-blue-500 to-blue-600";
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
      return "from-green-600 to-green-700";
    return "from-slate-500 to-slate-600";
  };

  return (
    <div ref={menuRef} className="group relative">
      <div
        onClick={handleFileClick}
        className="flex items-center w-full p-4 rounded-xl hover:bg-white/60 hover:shadow-sm cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-200/60"
      >
        {/* File Icon & Name */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${getFileTypeStyle(
              file.mimeType
            )} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}
          >
            <div className="text-white">{getFileIcon(file.mimeType, 20)}</div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-800 truncate text-sm">
              {file.filename}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {file.mimeType.split("/")[1]?.toUpperCase() || "FILE"}
            </p>
          </div>
        </div>

        {/* Upload Date */}
        <div className="hidden sm:flex items-center gap-2 w-32 flex-shrink-0">
          <Clock size={14} className="text-slate-400" />
          <span className="text-sm text-slate-600">
            {formatDate(file.uploadDate)}
          </span>
        </div>

        {/* File Size */}
        <div className="hidden md:flex items-center gap-2 w-24 flex-shrink-0">
          <HardDrive size={14} className="text-slate-400" />
          <span className="text-sm text-slate-600 font-medium">
            {formatBytes(file.size)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quick Actions */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle download
            }}
            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Download size={16} />
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
              <span>Share file</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${window.location.origin}/file/${file.id}`
                );
                toast.success("Link copied to clipboard");
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Copy size={16} />
              <span>Copy link</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
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
              <span>{isDeleting ? "Deleting..." : "Delete file"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
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
