
import React from "react";

interface ShopPostCardProps {
  post: {
    id: number;
    image: string;
    influencer: {
      name: string;
      avatar: string;
    };
    caption: string;
    category: string;
  };
  onClick?: () => void;
}

const ShopPostCard: React.FC<ShopPostCardProps> = ({ post, onClick }) => (
  <button
    className="flex flex-col bg-card rounded-lg overflow-hidden shadow group hover:scale-105 transition-transform w-64 min-w-[16rem]"
    onClick={onClick}
    type="button"
  >
    <div className="relative h-48 w-full overflow-hidden">
      <img
        src={post.image}
        alt={post.caption}
        className="object-cover h-full w-full transition-transform group-hover:scale-105"
        draggable={false}
      />
    </div>
    <div className="flex items-center p-3 space-x-3">
      <img
        src={post.influencer.avatar}
        alt={post.influencer.name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-foreground">{post.influencer.name}</p>
        <p className="text-xs text-muted-foreground">{post.category}</p>
      </div>
    </div>
    <div className="px-3 pb-3">
      <p className="text-sm text-foreground line-clamp-2">{post.caption}</p>
    </div>
  </button>
);

export default ShopPostCard;
