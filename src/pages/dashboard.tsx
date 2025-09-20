import {
  LayoutGrid,
  List,
  UploadCloud,
  FolderPlus,
  Search,
} from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import { UploadModal } from "@/components/modals/uploadModal";
import { UploadProgressPanel } from "@/components/uploadProgressPanel";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const globalStore = useGlobalStore();

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}

        {globalStore.showTopBar && (
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-600">FileVault</h1>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => globalStore.setIsUploadModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UploadCloud size={18} />
                Upload
              </button>
              <button
                onClick={() => globalStore.SetTriggerCreateFolderModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FolderPlus size={18} />
                New Folder
              </button>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => globalStore.SetViewType("grid")}
                  className={`p-2 rounded-l-md transition-colors ${
                    globalStore.viewType === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => globalStore.SetViewType("list")}
                  className={`p-2 rounded-r-md transition-colors ${
                    globalStore.viewType === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </header>
        )}
        {children}
      </main>
      {globalStore.isUploadModalOpen && <UploadModal />}
      <UploadProgressPanel />
    </div>
  );
}
