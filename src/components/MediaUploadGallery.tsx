
// This component now supports image or video (one file only), and is called MediaUploadGallery.

import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaUploadGalleryProps {
  value: string | undefined;
  onChange: (url: string) => void;
  sampleMedia?: string[];
  maxFiles?: number; // default 10, just for UI
}

const MediaUploadGallery: React.FC<MediaUploadGalleryProps> = ({
  value,
  onChange,
  sampleMedia = [],
  maxFiles = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSampleClick = (url: string) => {
    onChange(url);
  };

  const handleRemove = () => {
    if (value && value.startsWith("blob:")) {
      // Only revoke created local blob URLs
      URL.revokeObjectURL(value);
    }
    onChange("");
  };

  // Helper: is video file?
  const isVideo = value
    ? value.startsWith("blob:") && value.includes("video")
      ? true
      : /\.(mp4|webm|ogg)$/.test(value)
    : false;

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
          Upload Image or Video
        </Button>
        <input
          type="file"
          // Accept both images and video
          accept="image/*,video/*"
          multiple={false}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span className="text-sm text-muted-foreground">
          (Choose one image or video to upload, or pick a sample below)
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
            >
              {/\.(mp4|webm|ogg)$/.test(url) ? (
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
      {value && (
        <div className="mt-2 relative w-32 h-32">
          {isVideo ? (
            <video
              src={value}
              controls
              className="object-cover w-full h-full border rounded"
            />
          ) : (
            <img
              src={value}
              alt="Uploaded"
              className="object-cover w-full h-full border rounded"
            />
          )}
          <button
            className="absolute top-1 right-1 text-xs rounded-full bg-red-500 text-white px-2 py-0.5 opacity-80 hover:opacity-100"
            type="button"
            title="Remove"
            onClick={handleRemove}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaUploadGallery;
