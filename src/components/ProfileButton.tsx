
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    avatar: ""
  });
  const [isInfluencer, setIsInfluencer] = useState(false);

  // Load user data from localStorage when component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "user@example.com",
          avatar: parsedUser.avatar || ""
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    setIsInfluencer(localStorage.getItem("isInfluencer") === "true");
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    console.log("Logging out");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isInfluencer");
    // Don't remove userData to persist the user profile
    // Redirect to the landing page after logout
    navigate("/");
  };

  // Get the first letter safely for the avatar fallback
  const getInitial = () => {
    if (user && user.name && typeof user.name === 'string' && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name || "User"} />
            <AvatarFallback className="bg-brand-600 text-white">
              {getInitial()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile/measurements")}>
          My Measurements
        </DropdownMenuItem>
        {isInfluencer && (
          <DropdownMenuItem onClick={() => navigate("/influencer-profile")}>
            Influencer Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
