import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  List,
  UploadCloud,
  FolderPlus,
  Search,
  Filter,
  HardDrive,
  LogOut,
  X,
} from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import { UploadModal } from "@/components/modals/uploadModal";
import { UploadProgressPanel } from "@/components/uploadProgressPanel";
import SortFilterModal from "@/components/modals/sortAndFilter";
import { SearchResults } from "@/components/searchResults";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const globalStore = useGlobalStore();
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        handleClearSearch();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      globalStore.setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, globalStore]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    globalStore.clearSearch();
    searchInputRef.current?.blur();
  };

  // Check if any filters or sorts are active
  const hasActiveFilters =
    globalStore.fileSortInput ||
    globalStore.fileFilterInput ||
    globalStore.folderSortInput ||
    globalStore.folderFilterInput;

  const isSearchActive = globalStore.searchQuery.length > 0;

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <main className="flex-1 flex flex-col">
        {/* Enhanced Top Bar */}
        {globalStore.showTopBar && (
          <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Left Section - Branding & Search */}
                <div className="flex items-center gap-6">
                  {/* Enhanced Logo */}
                  <BlurFade delay={0.1}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <HardDrive className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          FileVault
                        </h1>
                        <p className="text-xs text-slate-500 font-medium">
                          Cloud Storage
                        </p>
                      </div>
                    </div>
                  </BlurFade>

                  {/* Enhanced Search */}
                  <BlurFade delay={0.2}>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search
                          className={`w-5 h-5 transition-colors ${
                            isSearchActive
                              ? "text-blue-500"
                              : "text-slate-400 group-focus-within:text-blue-500"
                          }`}
                        />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search files and folders..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className={`w-80 pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400 ${
                          isSearchActive
                            ? "bg-white border-blue-300 shadow-sm"
                            : "bg-slate-100/60 border-slate-200/60 focus:bg-white/80"
                        }`}
                      />
                      {isSearchActive && (
                        <button
                          onClick={handleClearSearch}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {!isSearchActive && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/60 border border-slate-300/60 rounded-md">
                            ⌘K
                          </kbd>
                        </div>
                      )}
                    </div>
                  </BlurFade>
                </div>

                {/* Right Section - Actions & Profile */}
                <div className="flex items-center gap-3">
                  {/* Action Buttons */}
                  <BlurFade delay={0.3}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => globalStore.setIsUploadModalOpen(true)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                      >
                        <UploadCloud size={18} />
                        Upload
                      </button>

                      <button
                        onClick={() =>
                          globalStore.SetTriggerCreateFolderModal(true)
                        }
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-medium shadow-sm"
                      >
                        <FolderPlus size={18} />
                        New Folder
                      </button>

                      <button
                        onClick={() =>
                          globalStore.setIsSortFilterModalOpen(true)
                        }
                        className={`hidden sm:flex items-center gap-2 px-4 py-2.5 border rounded-xl transition-all duration-200 font-medium shadow-sm relative ${
                          hasActiveFilters
                            ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <Filter size={18} />
                        Sort & Filter
                        {hasActiveFilters && (
                          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
                        )}
                      </button>
                    </div>
                  </BlurFade>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

                  {/* View Toggle - Enhanced */}
                  <BlurFade delay={0.4}>
                    <div className="flex items-center bg-slate-100/60 border border-slate-200/60 rounded-xl p-1">
                      <button
                        onClick={() => globalStore.SetViewType("grid")}
                        className={`p-2.5 rounded-lg transition-all duration-200 ${
                          globalStore.viewType === "grid"
                            ? "bg-white text-blue-600 shadow-sm border border-slate-200/60"
                            : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                        }`}
                      >
                        <LayoutGrid size={18} />
                      </button>
                      <button
                        onClick={() => globalStore.SetViewType("list")}
                        className={`p-2.5 rounded-lg transition-all duration-200 ${
                          globalStore.viewType === "list"
                            ? "bg-white text-blue-600 shadow-sm border border-slate-200/60"
                            : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </BlurFade>

                  {/* Logout Button */}
                  <BlurFade delay={0.5}>
                    <button
                      onClick={() => {
                        // Clear user data and redirect to login
                        globalStore.logout();
                        window.location.href = "/login";
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-medium shadow-sm"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </BlurFade>
                </div>
              </div>
            </div>

            {/* Mobile Actions Bar */}
            <div className="sm:hidden px-6 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => globalStore.setIsUploadModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium whitespace-nowrap"
                >
                  <UploadCloud size={16} />
                  Upload
                </button>

                <button
                  onClick={() => globalStore.SetTriggerCreateFolderModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium whitespace-nowrap"
                >
                  <FolderPlus size={16} />
                  Folder
                </button>

                <button
                  onClick={() => globalStore.setIsSortFilterModalOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium whitespace-nowrap relative ${
                    hasActiveFilters
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  <Filter size={16} />
                  Filter
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Enhanced Content Area */}
        <div className="flex-1 bg-gradient-to-b from-transparent to-slate-50/30">
          {isSearchActive ? <SearchResults /> : children}
        </div>
      </main>

      {/* Modals */}
      {globalStore.isUploadModalOpen && <UploadModal />}
      {globalStore.isSortFilterModalOpen && (
        <SortFilterModal
          isOpen={globalStore.isSortFilterModalOpen}
          onClose={() => globalStore.setIsSortFilterModalOpen(false)}
        />
      )}
      <UploadProgressPanel />
    </div>
  );
}
