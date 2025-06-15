import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Image, Video, Link as LinkIcon } from "lucide-react";
import { savePost } from "@/utils/localStorage";
import MediaUploadGallery from "./MediaUploadGallery";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  media: z.string().min(1, "Media URL is required"),
  productLink: z.string().url("Please enter a valid URL"),
});

type FormData = z.infer<typeof formSchema>;

// Updated to include video samples if you have any
const sampleMedia = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4", // Video sample
  "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
];

const NewPostForm = () => {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState("");
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      media: "",
      productLink: "",
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      // Use the utility function to save the post
      // Fix: Cast data to the expected type since our form validation ensures all fields are present
      savePost({
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.media,
        productLink: data.productLink,
      });
      
      // Show success message
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
      
      // Reset form
      form.reset();
      setPreviewUrl("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="₹8,299" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell your followers about this product..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <FormControl>
                    <MediaUploadGallery
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        setPreviewUrl(val);
                      }}
                      sampleMedia={sampleMedia}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Link</FormLabel>
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-gray-500" />
                    <FormControl>
                      <Input 
                        placeholder="https://store.com/product" 
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
              <div className="border rounded-lg overflow-hidden bg-gray-50 h-80 flex items-center justify-center">
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    {/\.(mp4|webm|ogg)$/i.test(previewUrl) ? (
                      <video 
                        src={previewUrl} 
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full py-1 px-3">
                      <span className="text-sm font-medium">{form.watch("price")}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Media preview will appear here</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Publish Post
        </Button>
      </form>
    </Form>
  );
};

export default NewPostForm;

// NOTE: This file is now almost 250 lines. Consider refactoring for maintainability.
