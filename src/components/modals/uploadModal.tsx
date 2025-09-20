import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client/react";
import { UploadCloud, X } from "lucide-react";
import { useUploadStore } from "@/store/uploadStore";
import useGlobalStore from "@/store/globalStore";
import {
  PRE_UPLOAD_CHECK_MUTATION,
  CONFIRM_UPLOADS_MUTATION,
} from "@/hooks/api/files";
import { uploadFileWithProgress } from "@/utils/upload";
import { calculateFileHash } from "@/utils/hash";

export const UploadModal = () => {
  const { startUploads, updateFileProgress } = useUploadStore();
  const setIsUploadModalOpen = useGlobalStore(
    (state) => state.setIsUploadModalOpen
  );
  const currentFolderId = useGlobalStore((state) => state.currentFolderId);

  const [preUploadCheck] = useMutation(PRE_UPLOAD_CHECK_MUTATION);
  const [confirmUploads] = useMutation(CONFIRM_UPLOADS_MUTATION, {
    refetchQueries: ["GetFiles", "GetFolders"],
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsUploadModalOpen(false);
      startUploads(acceptedFiles);

      try {
        const filesWithHashes = await Promise.all(
          acceptedFiles.map(async (file) => {
            const hash = await calculateFileHash(file);
            updateFileProgress(file.name, { status: "pending" });
            return { file, hash };
          })
        );

        const { data } = await preUploadCheck({
          variables: {
            files: filesWithHashes.map(({ file, hash }) => ({
              filename: file.name,
              hash,
              folderId: currentFolderId,
            })),
          },
        });

        if (!data || !data.preUploadCheck) {
          throw new Error("Pre-upload check failed: No response data.");
        }
        const preUploadResponse = data.preUploadCheck;

        preUploadResponse.completedFiles.forEach(
          (file: { filename: string }) => {
            updateFileProgress(file.filename, {
              status: "completed",
              progress: 100,
            });
          }
        );

        const uploadPromises = preUploadResponse.newFiles.map(
          (newFile: { filename: string; uploadURL: string; hash: string }) => {
            const originalFile = filesWithHashes.find(
              (f) => f.file.name === newFile.filename
            );
            if (!originalFile) return Promise.reject("File mismatch");

            return uploadFileWithProgress(
              newFile.uploadURL,
              originalFile.file,
              (progress) =>
                updateFileProgress(originalFile.file.name, {
                  progress,
                  status: "uploading",
                })
            ).then(() => ({
              filename: originalFile.file.name,
              hash: newFile.hash,
              size: originalFile.file.size,
              mimeType: originalFile.file.type,
              folderId: currentFolderId,
            }));
          }
        );

        const confirmedUploadsInput = await Promise.all(uploadPromises);

        if (confirmedUploadsInput.length > 0) {
          const { data: confirmData } = await confirmUploads({
            variables: { uploads: confirmedUploadsInput },
          });

          if (!confirmData || !confirmData.confirmUploads) {
            throw new Error("Server did not return a confirmation response.");
          }

          const failedUploadsMap = new Map(
            confirmData.confirmUploads.failedUploads.map(
              (failure: { hash: string; reason: string }) => [
                failure.hash,
                failure.reason,
              ]
            )
          );

          confirmedUploadsInput.forEach((upload) => {
            if (failedUploadsMap.has(upload.hash)) {
              updateFileProgress(upload.filename, {
                status: "error",
                errorMessage:
                  failedUploadsMap.get(upload.hash) ||
                  "Failed to process on server.",
              });
            } else {
              updateFileProgress(upload.filename, { status: "completed" });
            }
          });
        }
      } catch (error) {
        console.error("Upload process failed:", error);
        acceptedFiles.forEach((file) => {
          updateFileProgress(file.name, {
            status: "error",
            errorMessage: (error as Error).message,
          });
        });
      }
    },
    [
      currentFolderId,
      setIsUploadModalOpen,
      startUploads,
      updateFileProgress,
      preUploadCheck,
      confirmUploads,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Upload Files</h3>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div
            {...getRootProps()}
            className={`p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-gray-500">
              <UploadCloud className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">
                Drop files here or{" "}
                <span className="text-blue-600">click to browse</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
