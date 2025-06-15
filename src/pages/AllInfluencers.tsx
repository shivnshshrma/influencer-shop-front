
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";

const influencers = [
  {
    id: 1,
    name: "Emma Johnson",
    category: "Fashion & Style",
    followers: "1.2M",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Alex Rivera",
    category: "Fitness & Wellness",
    followers: "850K",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Sarah Chen",
    category: "Beauty & Skincare",
    followers: "2.3M",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Marcus Taylor",
    category: "Home & Lifestyle",
    followers: "930K",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const AllInfluencers = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            All Influencers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {influencers.map((influencer) => (
              <div
                key={influencer.id}
                className="group p-6 rounded-lg border border-gray-100 shadow hover:shadow-md transition cursor-pointer bg-gray-50"
                onClick={() => navigate(`/influencer/${influencer.id}`)}
              >
                <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-white shadow transition-transform group-hover:scale-105">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="object-cover"
                  />
                </Avatar>
                <div className="text-center">
                  <h2 className="font-semibold text-gray-900">
                    {influencer.name}
                  </h2>
                  <p className="text-sm text-gray-500">{influencer.category}</p>
                  <span className="inline-block mt-2 bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {influencer.followers} followers
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInfluencers;
