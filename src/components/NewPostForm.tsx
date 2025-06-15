
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
  link?: string;
  createdAt: Date;
}

interface NewPostFormProps {
  // Add any props you need here
}

const NewPostForm: React.FC<NewPostFormProps> = ({}) => {
  const [formData, setFormData] = useState({
    caption: "",
    media: [] as string[],
    link: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Require at least one: caption, media, or link
    if (
      !formData.caption &&
      (!formData.media || formData.media.length === 0) &&
      !formData.link
    ) {
      setError("Please add a caption, a link, or at least one photo or video.");
      return;
    }

    setError(undefined);

    const newPost = {
      ...formData, // contains .media, .caption, .link
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
      link: "",
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
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              name="link"
              placeholder="Paste your product or promo link (optional)"
              type="url"
              value={formData.link}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div>
            <Label>Media</Label>
            <MediaUploadGallery
              value={formData.media}
              onChange={handleMediaChange}
              maxFiles={10}
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

