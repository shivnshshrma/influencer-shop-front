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

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().min(1, "Image URL is required"),
  productLink: z.string().url("Please enter a valid URL"),
  type: z.enum(["image", "video"]),
});

type FormData = z.infer<typeof formSchema>;

// Sample image URLs that could be used
const sampleImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
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
      image: "",
      productLink: "",
      type: "image",
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
        image: data.image,
        productLink: data.productLink,
        type: data.type,
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

  const handleImageUrlChange = (value: string) => {
    form.setValue("image", value);
    setPreviewUrl(value);
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                    />
                  </FormControl>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sampleImages.map((url, index) => (
                      <button
                        key={index}
                        type="button"
                        className="border rounded-md p-1 hover:border-brand-600 transition-colors"
                        onClick={() => handleImageUrlChange(url)}
                      >
                        <img src={url} alt={`Sample ${index + 1}`} className="h-10 w-10 object-cover" />
                      </button>
                    ))}
                  </div>
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

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="image" id="image" />
                        <label htmlFor="image" className="flex items-center">
                          <Image className="h-4 w-4 mr-1" />
                          <span>Image</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="video" />
                        <label htmlFor="video" className="flex items-center">
                          <Video className="h-4 w-4 mr-1" />
                          <span>Video</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
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
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    {form.watch("type") === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="rounded-full bg-white bg-opacity-80 p-3">
                          <Video className="h-8 w-8 text-gray-800" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full py-1 px-3">
                      <span className="text-sm font-medium">{form.watch("price")}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Image preview will appear here</p>
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
