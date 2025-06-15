import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MediaUploadGallery from "./MediaUploadGallery";

interface Post {
  id: string;
  userId: string;
  caption: string;
  media: string[];
  createdAt: Date;
}

interface NewPostFormProps {
  // Add any props you need here
}

const NewPostForm: React.FC<NewPostFormProps> = ({}) => {
  const [formData, setFormData] = useState({
    caption: "",
    media: [] as string[],
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMediaChange = (media: string[]) => {
    setFormData({
      ...formData,
      media: media,
    });
  };

  // Fix typing for post creation to allow 'media' property (since Omit<Post, ...> disallows 'media')
  // You should define the `media` field in your actual type or else just use 'any' for the submit field including media.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caption && (!formData.media || formData.media.length === 0)) {
      setError("Please add a caption or at least one photo or video.");
      return;
    }

    setError(undefined);

    const newPost = {
      ...formData, // this contains .media and .caption
      // add any other required properties here
    };

    // Here you would typically send the newPost data to your backend
    console.log("Post submitted:", newPost);

    // Show a success toast
    toast({
      title: "Post Created",
      description: "Your post has been successfully created!",
    });

    // Reset the form
    setFormData({
      caption: "",
      media: [],
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="Write something about your post..."
              className="resize-none"
            />
          </div>

          <div>
            <Label>Media</Label>
            <MediaUploadGallery
              value={formData.media}
              onChange={handleMediaChange}
              maxFiles={5}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Create Post</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
