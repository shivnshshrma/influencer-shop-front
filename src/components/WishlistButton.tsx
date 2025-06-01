
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist, WishlistItem } from "@/utils/localStorage";

interface WishlistButtonProps {
  item: WishlistItem;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const WishlistButton = ({ item, variant = "outline", size = "sm" }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(item.id));
  }, [item.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(item.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(item);
      setIsWishlisted(true);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className="flex items-center gap-1"
    >
      <Heart 
        className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
      />
      {size !== "icon" && (isWishlisted ? "Wishlisted" : "Wishlist")}
    </Button>
  );
};

export default WishlistButton;
