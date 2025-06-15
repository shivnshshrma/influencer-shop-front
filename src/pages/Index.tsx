
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
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=96&q=80",
    alt: "Black and brown round fruit",
    label: "Organic Fruits",
  },
  {
    src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=96&q=80",
    alt: "Orange and white tabby cat",
    label: "Pet Accessories",
  },
  {
    src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=96&q=80",
    alt: "Grey tabby kitten",
    label: "Toys",
  },
  {
    src: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=96&q=80",
    alt: "Brown ox on mountain",
    label: "Outdoors",
  },
  {
    src: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=96&q=80",
    alt: "Monkey holding banana",
    label: "Fun Stuff",
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
