
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedInfluencers from "../components/FeaturedInfluencers";
import HowItWorks from "../components/HowItWorks";
import ProductShowcase from "../components/ProductShowcase";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const productIcons = [
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&q=80",
    alt: "Assorted stylish women's tops",
    label: "Tops",
    key: "tops",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=128&q=80",
    alt: "Woman wearing a skirt",
    label: "Skirts",
    key: "skirts",
  },
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=128&q=80",
    alt: "Woman in a jacket",
    label: "Jackets",
    key: "jackets",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=128&q=80",
    alt: "Makeup and dress",
    label: "Dresses",
    key: "dresses",
  },
  {
    src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=128&q=80",
    alt: "Woman in jeans",
    label: "Jeans",
    key: "jeans",
  },
];

const categoryProducts: Record<
  string,
  { name: string; image: string }[]
> = {
  tops: [
    {
      name: "White Crop Top",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Floral Blouse",
      image:
        "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Sleeveless Tank Top",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Black Basic Tee",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=180&q=80",
    },
  ],
  skirts: [
    {
      name: "Pleated Skirt",
      image:
        "https://images.unsplash.com/photo-1484517186945-6a6a2b22c74e?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Denim Mini Skirt",
      image:
        "https://images.unsplash.com/photo-1507238692201-883b6b34be94?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Checked A-line Skirt",
      image:
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=180&q=80",
    },
  ],
  jackets: [
    {
      name: "Blue Denim Jacket",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Leather Biker Jacket",
      image:
        "https://images.unsplash.com/photo-1469398715555-76331a14b376?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Bomber Jacket",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=180&q=80",
    },
  ],
  dresses: [
    {
      name: "Summer Floral Dress",
      image:
        "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Red Bodycon Dress",
      image:
        "https://images.unsplash.com/photo-1513109240410-bf7e1fc97368?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Evening Gown",
      image:
        "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=180&q=80",
    },
  ],
  jeans: [
    {
      name: "Classic Blue Jeans",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "High Waist Skinny",
      image:
        "https://images.unsplash.com/photo-1506719040632-0122a817c203?auto=format&fit=crop&w=180&q=80",
    },
    {
      name: "Distressed Boyfriend Jeans",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=180&q=80",
    },
  ],
};

const Index = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryKey: string) => {
    setExpandedCategory((prev) => (prev === categoryKey ? null : categoryKey));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          className="flex items-center gap-2 !bg-brand-600 text-white hover:!bg-brand-700 shadow-lg text-lg px-8 py-4 rounded-full transition"
          onClick={() => navigate("/shop")}
          aria-label="Shop the Latest Posts"
        >
          <ShoppingBag className="mr-2 h-6 w-6" />
          Shop the Latest Posts
        </Button>
      </div>
      {/* Product icon row */}
      <div className="mt-8 mb-2 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Trending Products</h3>
          <div className="flex gap-6 overflow-x-auto py-2 justify-center">
            {productIcons.map((icon, idx) => (
              <button
                key={icon.key}
                className={`flex flex-col items-center min-w-[96px] focus:outline-none group transition-transform ${
                  expandedCategory === icon.key ? "scale-110" : "hover:scale-105"
                }`}
                onClick={() => handleCategoryClick(icon.key)}
                aria-expanded={expandedCategory === icon.key}
              >
                <div
                  className={`rounded-full border-2 shadow bg-white
                  p-2 mb-1 w-20 h-20 flex items-center justify-center transition-all duration-200
                  ${expandedCategory === icon.key ? "border-brand-600" : "border-gray-200"}`}
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-16 h-16 rounded-full object-cover"
                    draggable={false}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors">
                  {icon.label}
                </span>
              </button>
            ))}
          </div>
          {expandedCategory && (
            <div className="w-full mt-4 mb-2">
              <div className="flex gap-4 overflow-x-auto py-2 px-1">
                {categoryProducts[expandedCategory]?.map((prod, i) => (
                  <div
                    key={prod.name}
                    className="flex flex-col items-center min-w-[112px] bg-white border border-border rounded-lg p-2 shadow transition hover:shadow-md relative"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-20 object-cover rounded"
                      draggable={false}
                    />
                    <span className="mt-2 text-xs text-center text-gray-600">{prod.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <FeaturedInfluencers />
      <HowItWorks />
      <ProductShowcase />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;

