import React from "react";
import { useQuery } from "@apollo/client/react";
import { Search, FileText, ArrowLeft } from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import { FileGridItem, FileListItem } from "@/components/cards/file";
import { SEARCH_FILES_QUERY } from "@/hooks/api/files";

export const SearchResults: React.FC = () => {
  const globalStore = useGlobalStore();
  const { searchQuery } = globalStore;

  const { data, loading, error } = useQuery(SEARCH_FILES_QUERY, {
    variables: {
      query: searchQuery,
      search: searchQuery,
    },
    skip: !searchQuery.trim(),
  });

  const handleBackToFiles = () => {
    globalStore.clearSearch();
  };

  const searchResults = data?.searchFiles || [];

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Searching for "{searchQuery}"...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackToFiles}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-red-500 mb-4">
            <Search className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            Search Error
          </h3>
          <p className="text-slate-500">
            {error.message || "Something went wrong while searching."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBackToFiles}
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-500" />
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Search Results
            </h1>
            <p className="text-sm text-slate-600">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FileText className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            No files found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search terms or check the spelling.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Files</h2>
          {globalStore.viewType === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map((file) => (
                <FileGridItem key={file.id} file={file} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((file) => (
                <FileListItem key={file.id} file={file} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
