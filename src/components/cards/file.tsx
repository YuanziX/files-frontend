import { GetFilesQuery } from "@/__generated__/graphql";
import { formatBytes, formatDate } from "@/utils/formatting.utils";
import { getFileIcon } from "@/utils/getIcon.utils";
import { Clock, HardDrive, MoreHorizontal } from "lucide-react";
type FileType = GetFilesQuery["getFilesInFolder"][0];

export function FileGridItem({ file }: { file: FileType }) {
  return (
    <div className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-500 cursor-pointer transition-all">
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
      <button className="absolute top-2 right-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-opacity">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export function FileListItem({ file }: { file: FileType }) {
  return (
    <div className="group flex items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
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
        <button className="p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
