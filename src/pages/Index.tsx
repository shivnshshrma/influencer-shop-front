
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

const productIcons = [
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80",
    alt: "Assorted stylish women's tops",
    label: "Tops",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=96&q=80",
    alt: "Woman wearing a skirt",
    label: "Skirts",
  },
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=96&q=80",
    alt: "Woman in a jacket",
    label: "Jackets",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=96&q=80",
    alt: "Makeup and dress",
    label: "Dresses",
  },
  {
    src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=96&q=80",
    alt: "Woman in jeans",
    label: "Jeans",
  },
];

const Index = () => {
  const navigate = useNavigate();

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
      <div className="mt-6 mb-2 px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Trending Products</h3>
          <div className="flex gap-4 overflow-x-auto py-2 justify-center">
            {productIcons.map((icon, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center min-w-[80px]"
              >
                <div className="rounded-full border shadow bg-white p-2 mb-1 w-16 h-16 flex items-center justify-center">
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-12 h-12 rounded-full object-cover"
                    draggable={false}
                  />
                </div>
                <span className="text-xs text-gray-500 text-center">{icon.label}</span>
              </div>
            ))}
          </div>
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
