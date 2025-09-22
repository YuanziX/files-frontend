import { useState } from "react";
import { X, User, Globe, Copy, Check } from "lucide-react";
import {
  useShareFilePublic,
  useShareFolderPublic,
  useShareFileWithUser,
  useShareFolderWithUser,
} from "@/hooks/use-share-actions";
import { toast } from "sonner";

type ShareModalProps = {
  itemType: "file" | "folder";
  itemId: string;
  itemName: string;
  onClose: () => void;
};

export const ShareModal = ({
  itemType,
  itemId,
  itemName,
  onClose,
}: ShareModalProps) => {
  const [activeTab, setActiveTab] = useState<"public" | "user">("public");
  const [email, setEmail] = useState("");
  const [sharedLink, setSharedLink] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  const { shareFilePublic, loading: loadingFilePublic } = useShareFilePublic();
  const { shareFolderPublic, loading: loadingFolderPublic } =
    useShareFolderPublic();
  const { shareFileWithUser, loading: loadingFileUser } =
    useShareFileWithUser();
  const { shareFolderWithUser, loading: loadingFolderUser } =
    useShareFolderWithUser();

  const isLoading =
    loadingFilePublic ||
    loadingFolderPublic ||
    loadingFileUser ||
    loadingFolderUser;

  const handleGeneratePublicLink = async () => {
    try {
      let result;
      if (itemType === "file") {
        result = await shareFilePublic({ variables: { fileId: itemId } });
        const token = result.data?.shareFilePublic;
        if (token)
          setSharedLink(
            `${window.location.origin}/share/file/${token}/${itemId}`
          );
      } else {
        result = await shareFolderPublic({ variables: { folderId: itemId } });
        const token = result.data?.shareFolderPublic;
        if (token)
          setSharedLink(
            `${window.location.origin}/share/folder/${token}/${itemId}`
          );
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate public link.");
    }
  };

  const handleShareWithUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      if (itemType === "file") {
        await shareFileWithUser({ variables: { fileId: itemId, email } });
        setSharedLink(`${window.location.origin}/file/${itemId}`);
      } else {
        await shareFolderWithUser({
          variables: { folderId: itemId, email: email },
        });
        setSharedLink(`${window.location.origin}/dashboard/${itemId}`);
      }
      setEmail("");
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharedLink);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold truncate pr-4">
            Share "{itemName}"
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-100">
          <button
            onClick={() => setActiveTab("public")}
            className={`flex-1 p-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${
              activeTab === "public" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            <Globe size={16} /> Public Link
          </button>
          <button
            onClick={() => setActiveTab("user")}
            className={`flex-1 p-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${
              activeTab === "user" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            <User size={16} /> Specific User
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "public" ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Anyone with the link can view this {itemType}.
              </p>
              {sharedLink ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sharedLink}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {hasCopied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGeneratePublicLink}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Generate Public Link"}
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleShareWithUser}>
              <p className="text-sm text-gray-600 mb-4">
                Enter the email of the person you want to share with.
              </p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              {sharedLink ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sharedLink}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {hasCopied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Sharing..." : `Share ${itemType}`}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
