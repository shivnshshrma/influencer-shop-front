
import React from "react";

interface ShopItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

interface ShopThisPostProps {
  items: ShopItem[];
}

const ShopThisPost: React.FC<ShopThisPostProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="rounded border border-dashed p-6 text-muted-foreground text-center">
        Product recommendations will appear here!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col bg-white border rounded-lg overflow-hidden shadow group hover:shadow-lg transition gap-1"
          title={item.title}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full aspect-square object-cover"
          />
          <div className="flex-1 flex flex-col justify-between py-2 px-2">
            <span className="text-sm font-medium text-center">{item.title}</span>
            <button
              tabIndex={-1}
              className="self-center text-gray-400 hover:text-brand-600 transition text-xl mt-1"
              aria-label="Add to wishlist"
              style={{ pointerEvents: "none" }}
            >
              ♡
            </button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ShopThisPost;
