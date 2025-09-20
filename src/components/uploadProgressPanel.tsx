import { useState } from "react";
import {
  CheckCircle2,
  File,
  Loader2,
  X,
  ChevronUp,
  ChevronDown,
  XCircle,
} from "lucide-react";
import { useUploadStore, UploadStatus } from "@/store/uploadStore";

const StatusIcon = ({ status }: { status: UploadStatus }) => {
  if (status === "hashing" || status === "pending")
    return <Loader2 className="w-5 h-5 animate-spin text-gray-500" />;
  if (status === "uploading")
    return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
  if (status === "completed")
    return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  if (status === "error") return <XCircle className="w-5 h-5 text-red-500" />;
  return <File className="w-5 h-5 text-gray-400" />;
};

export const UploadProgressPanel = () => {
  const { uploadProgress, isPanelOpen, setPanelOpen, clearUploads } =
    useUploadStore();
  const [isMinimized, setIsMinimized] = useState(false);

  const uploads = Object.values(uploadProgress);
  if (!isPanelOpen || uploads.length === 0) return null;

  const activeUploads = uploads.filter(
    (u) =>
      u.status === "hashing" ||
      u.status === "pending" ||
      u.status === "uploading"
  ).length;
  const isFinished = activeUploads === 0;
  const title = isFinished
    ? "Uploads Complete"
    : `Uploading ${activeUploads} file(s)...`;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 font-sans">
      <header className="flex items-center justify-between p-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button
            onClick={() => (isFinished ? clearUploads() : setPanelOpen(false))}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {!isMinimized && (
        <div className="p-3 max-h-60 overflow-y-auto">
          <ul className="space-y-3">
            {uploads.map(({ file, status, progress, errorMessage }) => (
              <li key={file.name} className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0">
                  <StatusIcon status={status} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  {(status === "uploading" || status === "completed") &&
                    progress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            status === "completed"
                              ? "bg-green-500"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  {status === "error" && (
                    <p className="text-xs text-red-500 mt-1 truncate">
                      {errorMessage || "An unknown error occurred."}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
