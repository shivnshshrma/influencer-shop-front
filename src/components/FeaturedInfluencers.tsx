
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const influencers = [
  {
    id: 1,
    name: "Emma Johnson",
    category: "Fashion & Style",
    followers: "1.2M",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Alex Rivera",
    category: "Fitness & Wellness",
    followers: "850K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Sarah Chen",
    category: "Beauty & Skincare",
    followers: "2.3M",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "Marcus Taylor",
    category: "Home & Lifestyle",
    followers: "930K",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const FeaturedInfluencers = () => {
  const navigate = useNavigate();

  const handleViewCollections = (influencerId: number) => {
    navigate(`/influencer/${influencerId}`);
  };

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Influencers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover products recommended by these trusted content creators across different categories.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {influencers.map((influencer) => (
            <div key={influencer.id} className="influencer-card group">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md mx-auto mb-4 transition-transform group-hover:scale-105">
                  <img 
                    src={influencer.image} 
                    alt={influencer.name} 
                    className="object-cover"
                  />
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-brand-100 text-brand-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {influencer.followers} followers
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="font-medium text-gray-900">{influencer.name}</h3>
                <p className="text-sm text-gray-500">{influencer.category}</p>
              </div>
              <div className="mt-3 text-center">
                <button 
                  className="text-sm text-brand-600 font-medium hover:text-brand-700 hover:underline"
                  onClick={() => handleViewCollections(influencer.id)}
                >
                  View Collections
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-brand-600 font-medium hover:text-brand-700 hover:underline text-lg">
            View All Influencers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInfluencers;
