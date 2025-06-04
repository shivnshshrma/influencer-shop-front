
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { getWishlistItems, removeFromWishlist, WishlistItem } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWishlistItems(getWishlistItems());
  }, []);

  const handleRemoveItem = (itemId: number) => {
    removeFromWishlist(itemId);
    setWishlistItems(getWishlistItems());
  };

  const handleInfluencerClick = (influencerId?: number) => {
    if (influencerId) {
      navigate(`/influencer/${influencerId}`);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding products you love to your wishlist and they'll appear here.
          </p>
          <Button onClick={() => navigate("/")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
        <span className="text-muted-foreground">({wishlistItems.length} items)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="product-card group border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              {item.influencer && (
                <div 
                  className="absolute top-4 right-4 flex items-center space-x-1 bg-background/90 rounded-full py-1 px-3 cursor-pointer hover:bg-background"
                  onClick={() => handleInfluencerClick(item.influencerId)}
                >
                  {item.influencerImage && (
                    <img 
                      src={item.influencerImage} 
                      alt={item.influencer}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  )}
                  <span className="text-xs font-medium text-foreground">{item.influencer}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground">{item.name}</h3>
              <p className="text-lg font-semibold text-primary mt-1">{item.price}</p>
              {item.category && (
                <span className="text-sm text-muted-foreground">{item.category}</span>
              )}
              <div className="mt-4 flex justify-between items-center">
                <Button size="sm">
                  Shop Now
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleRemoveItem(item.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
