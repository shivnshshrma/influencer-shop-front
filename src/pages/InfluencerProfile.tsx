import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import NewPostForm from "../components/NewPostForm";
import InfluencerPosts from "../components/InfluencerPosts";
import ImportImageGallery from "../components/ImportImageGallery";

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    
    if (!loggedIn) {
      toast({
        title: "Not logged in",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    // Check if user is an influencer
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const isInfluencer = localStorage.getItem("isInfluencer") === "true";
    
    if (!isInfluencer) {
      // If not an influencer, update their status
      localStorage.setItem("isInfluencer", "true");
      
      // Update userData with influencer fields if they don't exist
      if (!userData.bio) {
        userData.bio = "";
      }
      if (!userData.category) {
        userData.category = "Fashion & Style";
      }
      if (!userData.followers) {
        userData.followers = "0";
      }
      if (!userData.following) {
        userData.following = "0";
      }
      
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: "Welcome Influencer!",
        description: "Your account has been upgraded to an influencer account.",
      });
    }
    
    setUser(userData);
    setIsLoading(false);
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Influencer Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your content, view analytics, and grow your audience
          </p>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Profile Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            {/* --- Add import images UI/option here --- */}
            <ImportImageGallery />
            {/* --- Existing Create New Post/Posts UI below --- */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <NewPostForm />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <InfluencerPosts />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center">
                  <p className="text-gray-500">Analytics features coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={user?.category || "Fashion & Style"}
                      onChange={(e) => {
                        const updatedUser = {...user, category: e.target.value};
                        setUser(updatedUser);
                        localStorage.setItem("userData", JSON.stringify(updatedUser));
                      }}
                    >
                      <option value="Fashion & Style">Fashion & Style</option>
                      <option value="Beauty & Skincare">Beauty & Skincare</option>
                      <option value="Fitness & Wellness">Fitness & Wellness</option>
                      <option value="Home & Lifestyle">Home & Lifestyle</option>
                      <option value="Tech & Gadgets">Tech & Gadgets</option>
                      <option value="Food & Cooking">Food & Cooking</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full border rounded-md p-2 min-h-32"
                      value={user?.bio || ""}
                      onChange={(e) => {
                        const updatedUser = {...user, bio: e.target.value};
                        setUser(updatedUser);
                        localStorage.setItem("userData", JSON.stringify(updatedUser));
                      }}
                      placeholder="Tell your followers about yourself..."
                    />
                  </div>
                  
                  <Button onClick={() => {
                    toast({
                      title: "Profile Updated",
                      description: "Your influencer profile has been updated.",
                    });
                  }}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default InfluencerProfile;
