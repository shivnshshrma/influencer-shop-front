
import React, { useRef } from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImportImageGalleryProps {
  value: string | undefined;
  onChange: (url: string) => void;
  sampleImages?: string[];
  maxImages?: number; // default 10, just for UI
}

const ImportImageGallery: React.FC<ImportImageGalleryProps> = ({
  value,
  onChange,
  sampleImages = [],
  maxImages = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const handleImportClick = () => {
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={handleImportClick}
          className="flex gap-2 items-center"
        >
          <Image size={20} />
          Import Image
        </Button>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span className="text-sm text-muted-foreground">
          (Choose one image or pick a sample below)
        </span>
      </div>
      {sampleImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {sampleImages.map((url, index) => (
            <button
              key={index}
              type="button"
              className="border rounded-md p-1 hover:border-brand-600 transition-colors"
              onClick={() => handleSampleClick(url)}
            >
              <img src={url} alt={`Sample ${index + 1}`} className="h-10 w-10 object-cover" />
            </button>
          ))}
        </div>
      )}
      {value && (
        <div className="mt-2 relative w-32 h-32">
          <img
            src={value}
            alt="Selected"
            className="object-cover w-full h-full border rounded"
          />
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

export default ImportImageGallery;
