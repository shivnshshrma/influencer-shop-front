import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAddToWishlist, useRemoveFromWishlist, useCheckWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";

interface WishlistButtonProps {
  postId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const WishlistButton = ({ postId, variant = "outline", size = "sm" }: WishlistButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { data: wishlistCheck } = useCheckWishlist(postId);
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isWishlisted = wishlistCheck?.isInWishlist || false;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist.mutate(postId);
    } else {
      addToWishlist.mutate(postId);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't show wishlist button for unauthenticated users
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className="flex items-center gap-1"
      disabled={addToWishlist.isPending || removeFromWishlist.isPending}
    >
      <Heart 
        className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
      />
      {size !== "icon" && (isWishlisted ? "Wishlisted" : "Wishlist")}
    </Button>
  );
};

export default WishlistButton;