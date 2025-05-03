
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfluencerHeader from "../components/InfluencerHeader";
import InfluencerProducts from "../components/InfluencerProducts";

// Mock database of influencers
const influencerDatabase = [
  {
    id: 1,
    name: "Emma Johnson",
    category: "Fashion & Style",
    followers: "1.2M",
    following: "245",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Fashion enthusiast and style advisor. I help you find the perfect look for any occasion.",
    products: [
      {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: "$249",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        type: "image",
        description: "Premium wireless headphones with active noise cancellation for an immersive listening experience."
      },
      {
        id: 6,
        name: "Designer Sunglasses",
        price: "$175",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        type: "image",
        description: "Stylish designer sunglasses that protect your eyes while making a fashion statement."
      },
      {
        id: 7,
        name: "Summer Collection Review",
        price: "$120-350",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        type: "video",
        description: "Check out my review of this season's must-have summer fashion pieces."
      }
    ]
  },
  {
    id: 2,
    name: "Alex Rivera",
    category: "Fitness & Wellness",
    followers: "850K",
    following: "173",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Certified fitness trainer, wellness advocate and nutrition specialist. Helping you reach your fitness goals.",
    products: [
      {
        id: 2,
        name: "Premium Yoga Mat",
        price: "$89",
        image: "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        type: "image",
        description: "High-quality yoga mat with superior grip and cushioning for your practice."
      },
      {
        id: 5,
        name: "Sustainable Water Bottle",
        price: "$35",
        image: "https://images.unsplash.com/photo-1606767041004-6b387b91e360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        type: "image",
        description: "Eco-friendly insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours."
      },
      {
        id: 8,
        name: "Home Workout Essentials",
        price: "$15-120",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        type: "video",
        description: "Everything you need to create an effective home gym on any budget."
      }
    ]
  },
  {
    id: 3,
    name: "Sarah Chen",
    category: "Beauty & Skincare",
    followers: "2.3M",
    following: "298",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Beauty expert, skincare enthusiast and makeup artist. I share my favorite products and techniques for healthy skin.",
    products: [
      {
        id: 3,
        name: "Hydrating Facial Serum",
        price: "$58",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1912&q=80",
        type: "image",
        description: "Deeply hydrating facial serum with hyaluronic acid and vitamin C for glowing skin."
      },
      {
        id: 9,
        name: "Morning Skincare Routine",
        price: "$30-200",
        image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        type: "video",
        description: "My step-by-step morning skincare routine for radiant, healthy skin."
      }
    ]
  },
  {
    id: 4,
    name: "Marcus Taylor",
    category: "Home & Lifestyle",
    followers: "930K",
    following: "215",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Interior design professional and lifestyle blogger. I help create comfortable, stylish living spaces.",
    products: [
      {
        id: 4,
        name: "Smart Home Assistant",
        price: "$129",
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
        type: "image",
        description: "Voice-controlled smart home assistant that helps manage your daily tasks and controls your smart devices."
      },
      {
        id: 10,
        name: "Home Office Setup Guide",
        price: "$100-500",
        image: "https://images.unsplash.com/photo-1585842630354-448fe6ccbef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        type: "video",
        description: "Create the perfect productive workspace with my complete home office setup guide."
      }
    ]
  }
];

const InfluencerTimeline = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch with setTimeout
    setTimeout(() => {
      const foundInfluencer = influencerDatabase.find(
        (inf) => inf.id === Number(id)
      );
      setInfluencer(foundInfluencer || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading influencer profile...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">Influencer not found</h2>
            <p className="mt-2 text-gray-500">The influencer you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <InfluencerHeader influencer={influencer} />
        <InfluencerProducts products={influencer.products} />
      </main>
      <Footer />
    </div>
  );
};

export default InfluencerTimeline;
