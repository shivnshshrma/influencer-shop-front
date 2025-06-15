
import React, { useRef, useState } from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImportImageGallery = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages: string[] = [];
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages.push(url);
    });
    setImages(newImages);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (url: string) => {
    setImages((imgs) => imgs.filter((img) => img !== url));
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={handleImportClick}
          className="flex gap-2 items-center"
        >
          <Image size={20} />
          Import Images
        </Button>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <span className="text-sm text-muted-foreground">
          (Select up to 10 images)
        </span>
      </div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group border rounded-md overflow-hidden">
              <img 
                src={img} 
                alt={`Imported ${idx + 1}`} 
                className="object-cover w-full h-32"
              />
              <button
                className="absolute top-2 right-2 text-xs rounded-full bg-red-500 text-white px-2 py-0.5 opacity-80 hover:opacity-100"
                type="button"
                title="Remove"
                onClick={() => handleRemove(img)}
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

export default ImportImageGallery;
