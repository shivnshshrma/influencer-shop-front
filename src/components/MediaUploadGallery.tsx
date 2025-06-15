
import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaUploadGalleryProps {
  value: string[] | undefined;
  onChange: (urls: string[]) => void;
  sampleMedia?: string[];
  maxFiles?: number;
}

// Helper: is video by url?
const isVideoUrl = (url: string) =>
  /\.(mp4|webm|ogg)$/i.test(url) ||
  (url.startsWith("blob:") && url.includes("video"));

const MediaUploadGallery: React.FC<MediaUploadGalleryProps> = ({
  value = [],
  onChange,
  sampleMedia = [],
  maxFiles = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    // Only allow up to maxFiles
    const existingCount = value.length;
    const allowedCount = Math.max(0, maxFiles - existingCount);
    const selectedFiles = files.slice(0, allowedCount);

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    // Add to existing value (for incremental uploads)
    onChange([...value, ...urls]);
    // Reset input value so the same file can be selected again if desired
    e.target.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSampleClick = (url: string) => {
    // Avoid duplicates
    if (value.includes(url)) return;
    if (value.length < maxFiles) {
      onChange([...value, url]);
    }
  };

  const handleRemove = (removeUrl: string) => {
    // If blob, revoke object URL
    if (removeUrl.startsWith("blob:")) {
      URL.revokeObjectURL(removeUrl);
    }
    onChange(value.filter((url) => url !== removeUrl));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={handleUploadClick}
          className="flex gap-2 items-center"
        >
          <Upload size={20} />
          Upload Images or Videos
        </Button>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span className="text-sm text-muted-foreground">
          (Choose up to {maxFiles} images or videos, or pick a sample below)
        </span>
      </div>
      {sampleMedia.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {sampleMedia.map((url, index) => (
            <button
              key={index}
              type="button"
              className="border rounded-md p-1 hover:border-brand-600 transition-colors"
              onClick={() => handleSampleClick(url)}
              disabled={value.includes(url) || value.length >= maxFiles}
            >
              {isVideoUrl(url) ? (
                <video
                  src={url}
                  className="h-10 w-10 object-cover"
                  controls={false}
                  muted
                  loop
                />
              ) : (
                <img
                  src={url}
                  alt={`Sample ${index + 1}`}
                  className="h-10 w-10 object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-3">
          {value.map((url, idx) => (
            <div className="relative w-32 h-32" key={idx}>
              {isVideoUrl(url) ? (
                <video
                  src={url}
                  controls
                  className="object-cover w-full h-full border rounded"
                />
              ) : (
                <img
                  src={url}
                  alt={`Uploaded ${idx + 1}`}
                  className="object-cover w-full h-full border rounded"
                />
              )}
              <button
                className="absolute top-1 right-1 text-xs rounded-full bg-red-500 text-white px-2 py-0.5 opacity-80 hover:opacity-100"
                type="button"
                title="Remove"
                onClick={() => handleRemove(url)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploadGallery;
