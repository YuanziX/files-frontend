import {
  File,
  FileText,
  Image as ImageIcon,
  Video,
  AudioWaveform,
  Archive,
  FileCode,
  FileSpreadsheet,
  Presentation,
  Music,
  Package,
  Database,
  Bookmark,
  Calendar,
  Mail,
  PenTool,
  Palette,
  Book,
  Settings,
  Terminal,
  Globe,
  Layers,
  HardDrive,
  Lock,
  Zap,
} from "lucide-react";

export function getFileIcon(mimeType: string, size: number = 20) {
  const iconProps = {
    size,
    className: `w-${Math.ceil(size / 4)} h-${Math.ceil(size / 4)}`,
  };

  // Images
  if (mimeType.startsWith("image/")) {
    if (mimeType.includes("svg")) {
      return (
        <Palette
          {...iconProps}
          className={`${iconProps.className} text-orange-400`}
        />
      );
    }
    return (
      <ImageIcon
        {...iconProps}
        className={`${iconProps.className} text-emerald-400`}
      />
    );
  }

  // Videos
  if (mimeType.startsWith("video/")) {
    return (
      <Video
        {...iconProps}
        className={`${iconProps.className} text-violet-400`}
      />
    );
  }

  // Audio
  if (mimeType.startsWith("audio/")) {
    if (mimeType.includes("mp3") || mimeType.includes("mpeg")) {
      return (
        <Music
          {...iconProps}
          className={`${iconProps.className} text-pink-400`}
        />
      );
    }
    return (
      <AudioWaveform
        {...iconProps}
        className={`${iconProps.className} text-rose-400`}
      />
    );
  }

  // Archives & Compressed Files
  if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("7z") ||
    mimeType.includes("tar") ||
    mimeType.includes("gzip") ||
    mimeType.includes("bzip")
  ) {
    return (
      <Archive
        {...iconProps}
        className={`${iconProps.className} text-amber-400`}
      />
    );
  }

  // Package files
  if (
    mimeType.includes("deb") ||
    mimeType.includes("rpm") ||
    mimeType.includes("msi") ||
    mimeType.includes("pkg") ||
    mimeType.includes("dmg")
  ) {
    return (
      <Package
        {...iconProps}
        className={`${iconProps.className} text-indigo-400`}
      />
    );
  }

  // Documents
  if (mimeType === "application/pdf") {
    return (
      <FileText
        {...iconProps}
        className={`${iconProps.className} text-red-400`}
      />
    );
  }

  // Microsoft Office & Google Docs
  if (
    mimeType.includes("word") ||
    mimeType.includes("document") ||
    mimeType.includes("rtf") ||
    mimeType.includes("odt")
  ) {
    return (
      <FileText
        {...iconProps}
        className={`${iconProps.className} text-blue-400`}
      />
    );
  }

  if (
    mimeType.includes("sheet") ||
    mimeType.includes("excel") ||
    mimeType.includes("calc") ||
    mimeType.includes("csv")
  ) {
    return (
      <FileSpreadsheet
        {...iconProps}
        className={`${iconProps.className} text-green-400`}
      />
    );
  }

  if (
    mimeType.includes("presentation") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("impress")
  ) {
    return (
      <Presentation
        {...iconProps}
        className={`${iconProps.className} text-orange-400`}
      />
    );
  }

  // Code Files
  if (
    mimeType.includes("javascript") ||
    mimeType.includes("json") ||
    mimeType.includes("typescript") ||
    mimeType.includes("python") ||
    mimeType.includes("java") ||
    mimeType.includes("cpp") ||
    mimeType.includes("c++") ||
    mimeType.includes("csharp") ||
    mimeType.includes("php") ||
    mimeType.includes("ruby") ||
    mimeType.includes("go") ||
    mimeType.includes("rust") ||
    mimeType.includes("swift") ||
    mimeType.includes("kotlin") ||
    mimeType.startsWith("text/x-") ||
    mimeType.includes("sql")
  ) {
    return (
      <FileCode
        {...iconProps}
        className={`${iconProps.className} text-cyan-400`}
      />
    );
  }

  // Web Files
  if (
    mimeType.includes("html") ||
    mimeType.includes("css") ||
    mimeType.includes("xml") ||
    mimeType.includes("xhtml")
  ) {
    return (
      <Globe
        {...iconProps}
        className={`${iconProps.className} text-teal-400`}
      />
    );
  }

  // Configuration Files
  if (
    mimeType.includes("yaml") ||
    mimeType.includes("yml") ||
    mimeType.includes("toml") ||
    mimeType.includes("ini") ||
    mimeType.includes("conf") ||
    mimeType.includes("config")
  ) {
    return (
      <Settings
        {...iconProps}
        className={`${iconProps.className} text-slate-400`}
      />
    );
  }

  // Database Files
  if (
    mimeType.includes("sqlite") ||
    mimeType.includes("database") ||
    mimeType.includes("db") ||
    mimeType.includes("sql")
  ) {
    return (
      <Database
        {...iconProps}
        className={`${iconProps.className} text-purple-400`}
      />
    );
  }

  // Executable Files
  if (
    mimeType.includes("executable") ||
    mimeType.includes("application/x-") ||
    mimeType.includes("octet-stream")
  ) {
    return (
      <Terminal
        {...iconProps}
        className={`${iconProps.className} text-gray-500`}
      />
    );
  }

  // Font Files
  if (
    mimeType.includes("font") ||
    mimeType.includes("truetype") ||
    mimeType.includes("opentype") ||
    mimeType.includes("woff")
  ) {
    return (
      <PenTool
        {...iconProps}
        className={`${iconProps.className} text-purple-400`}
      />
    );
  }

  // 3D & Design Files
  if (
    mimeType.includes("model") ||
    mimeType.includes("stl") ||
    mimeType.includes("obj") ||
    mimeType.includes("blend") ||
    mimeType.includes("fbx")
  ) {
    return (
      <Layers
        {...iconProps}
        className={`${iconProps.className} text-pink-400`}
      />
    );
  }

  // Adobe Files
  if (
    mimeType.includes("photoshop") ||
    mimeType.includes("illustrator") ||
    mimeType.includes("indesign") ||
    mimeType.includes("after-effects")
  ) {
    return (
      <Palette
        {...iconProps}
        className={`${iconProps.className} text-blue-400`}
      />
    );
  }

  // eBook Files
  if (
    mimeType.includes("epub") ||
    mimeType.includes("mobi") ||
    mimeType.includes("azw") ||
    mimeType.includes("kindle")
  ) {
    return (
      <Book
        {...iconProps}
        className={`${iconProps.className} text-amber-400`}
      />
    );
  }

  // Calendar Files
  if (mimeType.includes("calendar") || mimeType.includes("ics")) {
    return (
      <Calendar
        {...iconProps}
        className={`${iconProps.className} text-blue-400`}
      />
    );
  }

  // Email Files
  if (
    mimeType.includes("email") ||
    mimeType.includes("message") ||
    mimeType.includes("eml")
  ) {
    return (
      <Mail
        {...iconProps}
        className={`${iconProps.className} text-indigo-400`}
      />
    );
  }

  // Disk Images
  if (
    mimeType.includes("iso") ||
    mimeType.includes("img") ||
    mimeType.includes("dmg") ||
    mimeType.includes("vdi") ||
    mimeType.includes("vmdk")
  ) {
    return (
      <HardDrive
        {...iconProps}
        className={`${iconProps.className} text-slate-400`}
      />
    );
  }

  // Encrypted/Security Files
  if (
    mimeType.includes("pgp") ||
    mimeType.includes("gpg") ||
    mimeType.includes("encrypted") ||
    mimeType.includes("keystore")
  ) {
    return (
      <Lock {...iconProps} className={`${iconProps.className} text-red-400`} />
    );
  }

  // Bookmark Files
  if (mimeType.includes("bookmark") || mimeType.includes("url")) {
    return (
      <Bookmark
        {...iconProps}
        className={`${iconProps.className} text-blue-400`}
      />
    );
  }

  // Binary/System Files
  if (
    mimeType.includes("binary") ||
    mimeType.includes("firmware") ||
    mimeType.includes("bios")
  ) {
    return (
      <Zap
        {...iconProps}
        className={`${iconProps.className} text-yellow-400`}
      />
    );
  }

  // Plain Text Files
  if (mimeType.startsWith("text/")) {
    return (
      <FileText
        {...iconProps}
        className={`${iconProps.className} text-slate-400`}
      />
    );
  }

  // Default fallback
  return (
    <File {...iconProps} className={`${iconProps.className} text-slate-400`} />
  );
}

export function getFileTypeDisplayName(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word") || mimeType.includes("document"))
    return "Document";
  if (mimeType.includes("sheet") || mimeType.includes("excel"))
    return "Spreadsheet";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
    return "Presentation";
  if (
    mimeType.includes("zip") ||
    mimeType.includes("rar") ||
    mimeType.includes("archive")
  )
    return "Archive";
  if (
    mimeType.includes("javascript") ||
    mimeType.includes("python") ||
    mimeType.includes("code")
  )
    return "Code";
  if (mimeType.includes("html") || mimeType.includes("css")) return "Web";
  if (mimeType.startsWith("text/")) return "Text";

  const parts = mimeType.split("/");
  if (parts.length > 1) {
    return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  }

  return "File";
}

export const getFileTypeStyle = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "from-zinc-200 to-slate-300";
  if (mimeType.startsWith("video/")) return "from-blue-200 to-indigo-300";
  if (mimeType.startsWith("audio/")) return "from-purple-200 to-violet-300";
  if (mimeType.includes("pdf")) return "from-red-200 to-rose-300";
  if (mimeType.includes("document") || mimeType.includes("word"))
    return "from-sky-200 to-blue-300";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "from-green-200 to-emerald-300";
  return "from-gray-200 to-slate-300";
};
