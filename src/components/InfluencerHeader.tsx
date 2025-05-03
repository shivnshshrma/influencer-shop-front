
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InfluencerHeaderProps {
  influencer: {
    id: number;
    name: string;
    category: string;
    followers: string;
    following: string;
    image: string;
    bio: string;
  };
}

const InfluencerHeader = ({ influencer }: InfluencerHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already following this influencer
    const followedInfluencers = JSON.parse(localStorage.getItem("followedInfluencers") || "[]");
    setIsFollowing(followedInfluencers.includes(influencer.id));
  }, [influencer.id]);

  const handleFollowToggle = () => {
    // Get current followed influencers
    const followedInfluencers = JSON.parse(localStorage.getItem("followedInfluencers") || "[]");
    
    // Toggle follow status
    if (isFollowing) {
      // Unfollow
      const updatedFollowed = followedInfluencers.filter((id: number) => id !== influencer.id);
      localStorage.setItem("followedInfluencers", JSON.stringify(updatedFollowed));
      setIsFollowing(false);
      toast({
        title: "Unfollowed",
        description: `You have unfollowed ${influencer.name}.`,
      });
    } else {
      // Follow
      const updatedFollowed = [...followedInfluencers, influencer.id];
      localStorage.setItem("followedInfluencers", JSON.stringify(updatedFollowed));
      setIsFollowing(true);
      toast({
        title: "Following!",
        description: `You are now following ${influencer.name}.`,
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-brand-50 to-white">
      <div className="container py-12 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Avatar className="h-36 w-36 border-4 border-white shadow-lg">
            <img 
              src={influencer.image} 
              alt={influencer.name}
              className="object-cover"
            />
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{influencer.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{influencer.category}</p>
                <p className="text-gray-700 mt-4 max-w-2xl">{influencer.bio}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button
                  onClick={handleFollowToggle}
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "border-brand-600 text-brand-600" : ""}
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start space-x-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">{influencer.followers}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">{influencer.following}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerHeader;
