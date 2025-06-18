import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MediaUploadGallery from "./MediaUploadGallery";
import { useCreatePost } from "@/hooks/usePosts";

const sampleMedia = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
];

const NewPostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    product_link: "",
    media_urls: [] as string[],
    type: "image" as "image" | "video",
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const createPost = useCreatePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMediaChange = (media: string[]) => {
    setFormData({
      ...formData,
      media_urls: media,
    });
  };

  const handleTypeChange = (type: "image" | "video") => {
    setFormData({
      ...formData,
      type,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!formData.price.trim()) {
      setError("Price is required");
      return;
    }

    if (!formData.product_link.trim()) {
      setError("Product link is required");
      return;
    }

    if (!formData.media_urls || formData.media_urls.length === 0) {
      setError("At least one image or video is required");
      return;
    }

    setError(undefined);

    try {
      await createPost.mutateAsync(formData);
      
      // Reset the form
      setFormData({
        name: "",
        description: "",
        price: "",
        product_link: "",
        media_urls: [],
        type: "image",
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              className="resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="₹1,999"
              required
            />
          </div>

          <div>
            <Label htmlFor="product_link">Product Link</Label>
            <Input
              id="product_link"
              name="product_link"
              placeholder="https://example.com/product"
              type="url"
              value={formData.product_link}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Content Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Media</Label>
            <MediaUploadGallery
              value={formData.media_urls}
              onChange={handleMediaChange}
              sampleMedia={sampleMedia}
              maxFiles={10}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button 
            type="submit" 
            disabled={createPost.isPending}
            className="w-full"
          >
            {createPost.isPending ? "Creating Post..." : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;