
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
      <FeaturedInfluencers />
      <HowItWorks />
      <ProductShowcase />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
