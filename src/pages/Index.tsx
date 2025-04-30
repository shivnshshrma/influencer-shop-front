
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedInfluencers from "../components/FeaturedInfluencers";
import HowItWorks from "../components/HowItWorks";
import ProductShowcase from "../components/ProductShowcase";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedInfluencers />
      <HowItWorks />
      <ProductShowcase />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
