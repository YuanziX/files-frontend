import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  AlertCircle,
  Download,
  FileText,
  HardDrive,
  Calendar,
  Type,
} from "lucide-react";
import { GET_FILE_QUERY } from "@/hooks/api/files";
import { GetFileQuery } from "@/__generated__/graphql";
import { formatBytes, formatDate } from "@/utils/formatting.utils";
import { getFileIcon } from "@/utils/getIcon.utils";
import React from "react";
import { useDownloadFile } from "@/hooks/use-file-actions";

const FilePreviewIcon = ({ mimeType }: { mimeType: string }) => {
  const icon = getFileIcon(mimeType);
  return React.cloneElement(icon, {
    className: "w-32 h-32 md:w-48 md:h-48 text-gray-300",
  });
};

export default function FileViewerPage() {
  const { fileId, publicToken } = useParams<{
    fileId: string;
    publicToken?: string;
  }>();

  const { data, loading, error } = useQuery<GetFileQuery>(GET_FILE_QUERY, {
    variables: { fileId: fileId!, publicToken },
  });

  const { downloadFile } = useDownloadFile();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 p-8">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">Could not load file</h3>
        <p className="mt-2 text-center">{error.message}</p>
      </div>
    );
  }

  const file = data?.getFile;

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-600 p-8">
        <FileText className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold">File Not Found</h3>
        <p className="mt-2 text-center">
          The requested file does not exist or you do not have permission to
          view it.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side: Preview and Download */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8">
            <FilePreviewIcon mimeType={file.mimeType} />
            <button
              onClick={() => {
                downloadFile(file.id, publicToken);
              }}
              className="mt-8 flex items-center gap-2 w-full justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
          </div>

          {/* Right Side: File Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 break-all">
              {file.filename}
            </h1>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="space-y-4">
                <div className="flex items-start gap-3">
                  <HardDrive size={20} className="text-gray-400 mt-1" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Size</dt>
                    <dd className="text-lg text-gray-800">
                      {formatBytes(file.size)}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Type size={20} className="text-gray-400 mt-1" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="text-lg text-gray-800">{file.mimeType}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-gray-400 mt-1" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Upload Date
                    </dt>
                    <dd className="text-lg text-gray-800">
                      {formatDate(file.uploadDate)}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
