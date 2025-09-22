import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  AlertCircle,
  Download,
  FileText,
  HardDrive,
  Calendar,
  Type,
  Share2,
  ArrowLeft,
  Copy,
  ExternalLink,
  Info,
} from "lucide-react";
import { GET_FILE_QUERY } from "@/hooks/api/files";
import { GetFileQuery } from "@/__generated__/graphql";
import { formatBytes, formatDate } from "@/utils/formatting.utils";
import { getFileIcon, getFileTypeDisplayName } from "@/utils/getIcon.utils";
import React, { useState } from "react";
import { useDownloadFile } from "@/hooks/use-file-actions";
import { useNavigate } from "react-router-dom";
import { ShareModal } from "@/components/modals/shareModal";

const FilePreviewIcon = ({ mimeType }: { mimeType: string }) => {
  const icon = getFileIcon(mimeType, 80);
  return (
    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-lg">
      <div className="text-slate-600">
        {React.cloneElement(icon, { size: 80 })}
      </div>
    </div>
  );
};

export default function FileViewerPage() {
  const { fileId, publicToken } = useParams<{
    fileId: string;
    publicToken?: string;
  }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data, loading, error } = useQuery<GetFileQuery>(GET_FILE_QUERY, {
    variables: { fileId: fileId!, publicToken },
  });

  const { downloadFile } = useDownloadFile();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-900 mb-3">
            Could not load file
          </h3>
          <p className="text-red-700 mb-6">{error.message}</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const file = data?.getFile;

  if (!file) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            File Not Found
          </h3>
          <p className="text-slate-600 mb-6">
            The requested file does not exist or you do not have permission to
            view it.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fileTypeName = getFileTypeDisplayName(file.mimeType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-4 font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/60 rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-3 bg-white/60 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              {copied ? <ExternalLink size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side: Preview and Actions */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-slate-50/50 to-white/50 flex flex-col items-center justify-center border-r border-slate-200/60">
              <div className="text-center">
                <FilePreviewIcon mimeType={file.mimeType} />

                {/* Action Buttons */}
                <div className="mt-8 space-y-3 w-full max-w-sm">
                  <button
                    onClick={() => downloadFile(file.id, publicToken)}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <Download size={20} />
                    <span>Download File</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsShareModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-slate-700 border border-slate-200 text-black font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: File Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                {/* File Name */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 break-all leading-tight">
                    {file.filename}
                  </h1>
                  <p className="text-slate-500 mt-2 font-medium">
                    File Details
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-6 pt-6 border-t border-slate-200/60">
                  <div className="grid gap-6">
                    {/* File Size */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <HardDrive size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                          File Size
                        </dt>
                        <dd className="text-xl font-bold text-slate-900 mt-1">
                          {formatBytes(file.size)}
                        </dd>
                        <dd className="text-sm text-slate-500 mt-1">
                          {file.size.toLocaleString()} bytes
                        </dd>
                      </div>
                    </div>

                    {/* File Type */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Type size={20} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                          File Type
                        </dt>
                        <dd className="text-xl font-bold text-slate-900 mt-1">
                          {fileTypeName}
                        </dd>
                        <dd className="text-sm text-slate-500 mt-1 font-mono">
                          {file.mimeType}
                        </dd>
                      </div>
                    </div>

                    {/* Upload Date */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                          Upload Date
                        </dt>
                        <dd className="text-xl font-bold text-slate-900 mt-1">
                          {formatDate(file.uploadDate)}
                        </dd>
                        <dd className="text-sm text-slate-500 mt-1">
                          {new Date(file.uploadDate).toLocaleString()}
                        </dd>
                      </div>
                    </div>

                    {/* File ID */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info size={20} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                          File ID
                        </dt>
                        <dd className="text-lg font-mono text-slate-700 mt-1 break-all">
                          {file.id}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          itemType="file"
          itemId={file.id}
          itemName={file.filename}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* Toast for copied link */}
      {copied && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
