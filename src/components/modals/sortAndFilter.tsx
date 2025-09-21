import { useState, useEffect } from "react";
import { X, Filter, ArrowUpDown, RotateCcw, Folder, File } from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import {
  FileSortField,
  FolderSortField,
  SortOrder,
  FileFilterInput,
  FolderFilterInput,
} from "@/__generated__/graphql";

interface SortFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SortFilterModal({
  isOpen,
  onClose,
}: SortFilterModalProps) {
  const {
    fileSortInput,
    setFileSortInput,
    fileFilterInput,
    setFileFilterInput,
    folderSortInput,
    setFolderSortInput,
    folderFilterInput,
    setFolderFilterInput,
    clearAllFiltersAndSorts,
  } = useGlobalStore();

  const [localFileSortField, setLocalFileSortField] = useState<FileSortField>(
    FileSortField.Filename
  );
  const [localFileSortOrder, setLocalFileSortOrder] = useState<SortOrder>(
    SortOrder.Asc
  );
  const [localFolderSortField, setLocalFolderSortField] =
    useState<FolderSortField>(FolderSortField.Name);
  const [localFolderSortOrder, setLocalFolderSortOrder] = useState<SortOrder>(
    SortOrder.Asc
  );

  const [localFileFilter, setLocalFileFilter] = useState<FileFilterInput>({});
  const [localFolderFilter, setLocalFolderFilter] = useState<FolderFilterInput>(
    {}
  );

  useEffect(() => {
    if (fileSortInput) {
      setLocalFileSortField(fileSortInput.field);
      setLocalFileSortOrder(fileSortInput.order);
    }
    if (folderSortInput) {
      setLocalFolderSortField(folderSortInput.field);
      setLocalFolderSortOrder(folderSortInput.order);
    }
    setLocalFileFilter(fileFilterInput || {});
    setLocalFolderFilter(folderFilterInput || {});
  }, [
    isOpen,
    fileSortInput,
    fileFilterInput,
    folderSortInput,
    folderFilterInput,
  ]);

  const handleApply = () => {
    // Apply file sort
    setFileSortInput({
      field: localFileSortField,
      order: localFileSortOrder,
    });

    // Apply folder sort
    setFolderSortInput({
      field: localFolderSortField,
      order: localFolderSortOrder,
    });

    const cleanedFileFilter: FileFilterInput = {};
    if (localFileFilter.filename?.trim())
      cleanedFileFilter.filename = localFileFilter.filename.trim();
    if (localFileFilter.mimeType?.trim())
      cleanedFileFilter.mimeType = localFileFilter.mimeType.trim();
    if (
      localFileFilter.minSize !== undefined &&
      localFileFilter.minSize != null &&
      localFileFilter.minSize > 0
    )
      cleanedFileFilter.minSize = localFileFilter.minSize;
    if (
      localFileFilter.maxSize !== undefined &&
      localFileFilter.maxSize != null &&
      localFileFilter.maxSize > 0
    )
      cleanedFileFilter.maxSize = localFileFilter.maxSize;
    if (localFileFilter.uploadedAfter?.trim())
      cleanedFileFilter.uploadedAfter = localFileFilter.uploadedAfter.trim();
    if (localFileFilter.uploadedBefore?.trim())
      cleanedFileFilter.uploadedBefore = localFileFilter.uploadedBefore.trim();

    setFileFilterInput(
      Object.keys(cleanedFileFilter).length > 0 ? cleanedFileFilter : null
    );

    const cleanedFolderFilter: FolderFilterInput = {};
    if (localFolderFilter.name?.trim())
      cleanedFolderFilter.name = localFolderFilter.name.trim();
    if (localFolderFilter.createdAfter?.trim())
      cleanedFolderFilter.createdAfter = localFolderFilter.createdAfter.trim();
    if (localFolderFilter.createdBefore?.trim())
      cleanedFolderFilter.createdBefore =
        localFolderFilter.createdBefore.trim();

    setFolderFilterInput(
      Object.keys(cleanedFolderFilter).length > 0 ? cleanedFolderFilter : null
    );

    onClose();
  };

  const handleReset = () => {
    clearAllFiltersAndSorts();
    setLocalFileSortField(FileSortField.Filename);
    setLocalFileSortOrder(SortOrder.Asc);
    setLocalFolderSortField(FolderSortField.Name);
    setLocalFolderSortOrder(SortOrder.Asc);
    setLocalFileFilter({});
    setLocalFolderFilter({});
  };

  const updateFileFilter = (key: keyof FileFilterInput, value: any) => {
    setLocalFileFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateFolderFilter = (key: keyof FolderFilterInput, value: any) => {
    setLocalFolderFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Sort & Filter
              </h2>
              <p className="text-sm text-gray-600">
                Organize your files and folders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-8">
            {/* Sort Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <ArrowUpDown size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sort Options</h3>
                  <p className="text-sm text-gray-600">
                    Choose how to order your content
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Sort */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <File size={18} className="mr-3 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Files</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort by
                      </label>
                      <select
                        value={localFileSortField}
                        onChange={(e) =>
                          setLocalFileSortField(e.target.value as FileSortField)
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      >
                        <option value={FileSortField.Filename}>Filename</option>
                        <option value={FileSortField.Size}>Size</option>
                        <option value={FileSortField.MimeType}>Type</option>
                        <option value={FileSortField.UploadDate}>
                          Upload Date
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <select
                        value={localFileSortOrder}
                        onChange={(e) =>
                          setLocalFileSortOrder(e.target.value as SortOrder)
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      >
                        <option value={SortOrder.Asc}>Ascending (A → Z)</option>
                        <option value={SortOrder.Desc}>
                          Descending (Z → A)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Folder Sort */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <Folder size={18} className="mr-3 text-yellow-600" />
                    <h4 className="font-medium text-gray-900">Folders</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort by
                      </label>
                      <select
                        value={localFolderSortField}
                        onChange={(e) =>
                          setLocalFolderSortField(
                            e.target.value as FolderSortField
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm"
                      >
                        <option value={FolderSortField.Name}>Name</option>
                        <option value={FolderSortField.CreatedAt}>
                          Created Date
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <select
                        value={localFolderSortOrder}
                        onChange={(e) =>
                          setLocalFolderSortOrder(e.target.value as SortOrder)
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm"
                      >
                        <option value={SortOrder.Asc}>Ascending (A → Z)</option>
                        <option value={SortOrder.Desc}>
                          Descending (Z → A)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Filter size={18} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Filter Options
                  </h3>
                  <p className="text-sm text-gray-600">
                    Narrow down your search results
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Filters */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <File size={18} className="mr-3 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Files</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filename contains
                      </label>
                      <input
                        type="text"
                        value={localFileFilter.filename || ""}
                        onChange={(e) =>
                          updateFileFilter("filename", e.target.value)
                        }
                        placeholder="Search in filenames..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File type (MIME)
                      </label>
                      <input
                        type="text"
                        value={localFileFilter.mimeType || ""}
                        onChange={(e) =>
                          updateFileFilter("mimeType", e.target.value)
                        }
                        placeholder="e.g., image/jpeg, application/pdf"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min size (bytes)
                        </label>
                        <input
                          type="number"
                          value={localFileFilter.minSize || ""}
                          onChange={(e) =>
                            updateFileFilter(
                              "minSize",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="0"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max size (bytes)
                        </label>
                        <input
                          type="number"
                          value={localFileFilter.maxSize || ""}
                          onChange={(e) =>
                            updateFileFilter(
                              "maxSize",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="No limit"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Uploaded after
                        </label>
                        <input
                          type="datetime-local"
                          value={localFileFilter.uploadedAfter || ""}
                          onChange={(e) =>
                            updateFileFilter("uploadedAfter", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Uploaded before
                        </label>
                        <input
                          type="datetime-local"
                          value={localFileFilter.uploadedBefore || ""}
                          onChange={(e) =>
                            updateFileFilter("uploadedBefore", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Folder Filters */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <Folder size={18} className="mr-3 text-yellow-600" />
                    <h4 className="font-medium text-gray-900">Folders</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Folder name contains
                      </label>
                      <input
                        type="text"
                        value={localFolderFilter.name || ""}
                        onChange={(e) =>
                          updateFolderFilter("name", e.target.value)
                        }
                        placeholder="Search in folder names..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Created after
                      </label>
                      <input
                        type="datetime-local"
                        value={localFolderFilter.createdAfter || ""}
                        onChange={(e) =>
                          updateFolderFilter("createdAfter", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Created before
                      </label>
                      <input
                        type="datetime-local"
                        value={localFolderFilter.createdBefore || ""}
                        onChange={(e) =>
                          updateFolderFilter("createdBefore", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={handleReset}
            className="flex items-center px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={16} className="mr-2" />
            Reset All
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
