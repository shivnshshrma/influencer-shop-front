
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";

// You can update these categories and their images as needed
const categories = [
  {
    label: "Summer Trends",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Home",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Accessories",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Makeup",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Skincare",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Fashion",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  // Optionally, handle card click to navigate or filter results
  const handleCategoryClick = (category: string) => {
    // Example: navigate to `/for-you?category=Summer Trends`
    navigate(`/for-you?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Discover by Category
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.label}
              label={cat.label}
              image={cat.image}
              onClick={() => handleCategoryClick(cat.label)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
