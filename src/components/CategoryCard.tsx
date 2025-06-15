
import React from "react";

interface CategoryCardProps {
  label: string;
  image: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ label, image, onClick }) => (
  <button
    className="flex flex-col items-center space-y-2 focus:outline-none group"
    onClick={onClick}
    type="button"
  >
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-brand-600 group-hover:scale-105 transition-transform shadow-sm flex items-center justify-center bg-muted">
      <img
        src={image}
        alt={label}
        className="object-cover w-full h-full"
        draggable={false}
      />
    </div>
    <span className="text-sm md:text-base font-medium group-hover:text-brand-600 transition-colors">{label}</span>
  </button>
);

export default CategoryCard;
