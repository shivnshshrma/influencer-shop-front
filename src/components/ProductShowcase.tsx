import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: "₹20,699",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    influencer: "Emma Johnson",
    influencerId: 1,
    influencerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Tech"
  },
  {
    id: 2,
    name: "Premium Yoga Mat",
    price: "₹7,399",
    image: "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    influencer: "Alex Rivera",
    influencerId: 2,
    influencerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Fitness"
  },
  {
    id: 3,
    name: "Hydrating Facial Serum",
    price: "₹4,819",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1912&q=80",
    influencer: "Sarah Chen",
    influencerId: 3,
    influencerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Beauty"
  },
  {
    id: 4,
    name: "Smart Home Assistant",
    price: "₹10,719",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    influencer: "Marcus Taylor",
    influencerId: 4,
    influencerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Home"
  },
  {
    id: 5,
    name: "Sustainable Water Bottle",
    price: "₹2,909",
    image: "https://images.unsplash.com/photo-1606767041004-6b387b91e360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    influencer: "Alex Rivera",
    influencerId: 2,
    influencerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Lifestyle"
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: "₹14,539",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    influencer: "Emma Johnson",
    influencerId: 1,
    influencerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Fashion"
  }
];

const categories = ["All", "Tech", "Fashion", "Beauty", "Fitness", "Home", "Lifestyle"];

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleInfluencerClick = (influencerId: number) => {
    navigate(`/influencer/${influencerId}`);
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover trending items personally recommended by top influencers.
          </p>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 p-1 bg-gray-100 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-white shadow text-brand-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />
                <div 
                  className="absolute top-4 right-4 flex items-center space-x-1 bg-white bg-opacity-90 rounded-full py-1 px-3 cursor-pointer hover:bg-opacity-100"
                  onClick={() => handleInfluencerClick(product.influencerId)}
                >
                  <img 
                    src={product.influencerImage} 
                    alt={product.influencer}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium">{product.influencer}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-lg font-semibold text-brand-600 mt-1">{product.price}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Link className="h-4 w-4 mr-1" />
                    Shop Now
                  </Button>
                  <span 
                    className="text-sm text-gray-500 cursor-pointer hover:text-brand-600 hover:underline"
                    onClick={() => handleInfluencerClick(product.influencerId)}
                  >
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
