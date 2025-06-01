import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";
import WishlistButton from "./WishlistButton";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  type: 'image' | 'video';
  description: string;
}

interface InfluencerProductsProps {
  products: Product[];
}

const InfluencerProducts = ({ products }: InfluencerProductsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  const imageProducts = products.filter(product => product.type === "image");
  const videoProducts = products.filter(product => product.type === "video");
  
  const displayProducts = activeTab === "all" 
    ? products 
    : activeTab === "images" 
      ? imageProducts 
      : videoProducts;

  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products & Content</h2>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <Image className="h-4 w-4" /> Products
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1">
                <Video className="h-4 w-4" /> Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="product-card group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />
                {product.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="rounded-full bg-white bg-opacity-80 p-3">
                      <Video className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full py-1 px-3">
                  <span className="text-sm font-medium">{product.price}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Button size="sm" variant={product.type === "video" ? "secondary" : "default"}>
                    {product.type === "video" ? "Watch Review" : "Shop Now"}
                  </Button>
                  <WishlistButton 
                    item={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    }}
                    size="icon"
                    variant="ghost"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No {activeTab === "images" ? "product" : "video"} content available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfluencerProducts;
