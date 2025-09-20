import {
  File,
  FileText,
  ImageIcon,
  Video,
  AudioWaveform,
  Archive,
} from "lucide-react";

// Helper to get an appropriate icon based on MIME type
export function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/"))
    return <ImageIcon className="w-6 h-6 text-blue-500" />;
  if (mimeType.startsWith("video/"))
    return <Video className="w-6 h-6 text-red-500" />;
  if (mimeType.startsWith("audio/"))
    return <AudioWaveform className="w-6 h-6 text-purple-500" />;
  if (
    mimeType.startsWith("application/zip") ||
    mimeType.startsWith("application/x-rar")
  )
    return <Archive className="w-6 h-6 text-yellow-600" />;
  if (mimeType.startsWith("text/") || mimeType === "application/pdf")
    return <FileText className="w-6 h-6 text-green-500" />;
  return <File className="w-6 h-6 text-gray-500" />;
}
