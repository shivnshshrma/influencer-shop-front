import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MeasurementGuide from "../components/MeasurementGuide";
import Navbar from "../components/Navbar";

// Profile form schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone must be 10 digits" }).optional(),
});

// Measurements form schema
const measurementsSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  chest: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  shoeSize: z.string().optional(),
  skinTone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type MeasurementsFormValues = z.infer<typeof measurementsSchema>;

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize with default values to prevent undefined issues
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    phone: "9876543210",
    avatar: "",
    measurements: {
      height: "170",
      chest: "90",
      waist: "75",
      hips: "95",
      shoeSize: "9",
      skinTone: "medium",
    }
  });

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure measurements object exists with default values if missing
        const measurements = parsedUser.measurements || {};
        
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "user@example.com",
          phone: parsedUser.phone || "9876543210",
          avatar: parsedUser.avatar || "",
          measurements: {
            height: measurements.height || "170",
            chest: measurements.chest || "90",
            waist: measurements.waist || "75",
            hips: measurements.hips || "95",
            shoeSize: measurements.shoeSize || "9",
            skinTone: measurements.skinTone || "medium",
          }
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Keep default values in case of error
      }
    }
  }, []);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    }
  });

  // Update form values when user data changes
  useEffect(() => {
    profileForm.setValue("name", user.name);
    profileForm.setValue("email", user.email);
    profileForm.setValue("phone", user.phone || "");
  }, [user, profileForm]);

  const measurementsForm = useForm<MeasurementsFormValues>({
    resolver: zodResolver(measurementsSchema),
    defaultValues: {
      height: user.measurements.height,
      chest: user.measurements.chest,
      waist: user.measurements.waist,
      hips: user.measurements.hips,
      shoeSize: user.measurements.shoeSize,
      skinTone: user.measurements.skinTone,
    }
  });

  // Update measurements form when user data changes
  useEffect(() => {
    if (user.measurements) {
      measurementsForm.setValue("height", user.measurements.height || "");
      measurementsForm.setValue("chest", user.measurements.chest || "");
      measurementsForm.setValue("waist", user.measurements.waist || "");
      measurementsForm.setValue("hips", user.measurements.hips || "");
      measurementsForm.setValue("shoeSize", user.measurements.shoeSize || "");
      measurementsForm.setValue("skinTone", user.measurements.skinTone || "");
    }
  }, [user, measurementsForm]);

  // Handle avatar upload
  const handleAvatarClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newUser = { ...user, avatar: e.target?.result as string };
      setUser(newUser);
      localStorage.setItem("userData", JSON.stringify(newUser));
      toast.success("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile data:", data);
    // In a real app, you'd update the user profile here
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone || user.phone,
    };
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setIsEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleMeasurementsSubmit = (data: MeasurementsFormValues) => {
    console.log("Measurements data:", data);
    // In a real app, you'd update the user measurements here
    const updatedUser = {
      ...user,
      measurements: {
        height: data.height,
        chest: data.chest || user.measurements.chest,
        waist: data.waist || user.measurements.waist,
        hips: data.hips || user.measurements.hips,
        shoeSize: data.shoeSize || user.measurements.shoeSize,
        skinTone: data.skinTone || user.measurements.skinTone,
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    toast.success("Measurements updated successfully!");
  };

  // Get the first letter safely for the avatar fallback
  const getInitial = () => {
    if (user && user.name && typeof user.name === 'string' && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 bg-brand-50">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div 
                className={`relative ${isEditMode ? "cursor-pointer" : ""}`}
                onClick={handleAvatarClick}
              >
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-brand-600 text-white text-2xl">
                    {getInitial()}
                  </AvatarFallback>
                </Avatar>
                {isEditMode && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <Camera className="text-white" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <Button 
                onClick={() => setIsEditMode(!isEditMode)}
                variant={isEditMode ? "outline" : "default"}
              >
                {isEditMode ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="p-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="measurements">Body Measurements</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            disabled={!isEditMode}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            {...field} 
                            disabled={true} // Always disabled to restrict editing
                            className="bg-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-gray-100">+91</div>
                            <Input 
                              placeholder="9876543210" 
                              className="rounded-l-none" 
                              maxLength={10}
                              {...field} 
                              disabled={!isEditMode}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isEditMode && (
                    <Button type="submit" className="w-full md:w-auto">Save Changes</Button>
                  )}
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="measurements" className="mt-6">
              <Form {...measurementsForm}>
                <form onSubmit={measurementsForm.handleSubmit(handleMeasurementsSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={measurementsForm.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="170" 
                              type="number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={measurementsForm.control}
                      name="chest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chest/Bust (cm)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="90" 
                              type="number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={measurementsForm.control}
                      name="waist"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waist (cm)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="75" 
                              type="number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={measurementsForm.control}
                      name="hips"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hips (cm)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="95" 
                              type="number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={measurementsForm.control}
                      name="shoeSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shoe Size</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="9" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={measurementsForm.control}
                      name="skinTone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skin Tone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select skin tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="olive">Olive</SelectItem>
                              <SelectItem value="tan">Tan</SelectItem>
                              <SelectItem value="deep">Deep</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Update Measurements</Button>
                  
                  <MeasurementGuide />
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
