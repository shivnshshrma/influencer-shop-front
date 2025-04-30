
import { Check } from "lucide-react";

const Benefits = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InfluStyle</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building a better way to connect influencers and shoppers through authentic recommendations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="text-brand-600 mr-2">For Influencers</span>
            </h3>
            
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Monetize Your Influence</p>
                  <p className="mt-1 text-gray-600">Earn commissions from products you already use and love</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Simple Link Management</p>
                  <p className="mt-1 text-gray-600">Create and manage all your product links in one place</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Performance Analytics</p>
                  <p className="mt-1 text-gray-600">Track clicks, conversions and commission with detailed insights</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Build Your Brand</p>
                  <p className="mt-1 text-gray-600">Create a curated collection that reflects your unique style</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="text-brand-600 mr-2">For Shoppers</span>
            </h3>
            
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Trusted Recommendations</p>
                  <p className="mt-1 text-gray-600">Products recommended by influencers you know and follow</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Discover New Products</p>
                  <p className="mt-1 text-gray-600">Find unique items across multiple categories in one place</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Authentic Reviews</p>
                  <p className="mt-1 text-gray-600">See real experiences with products before you buy</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-brand-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Support Your Favorites</p>
                  <p className="mt-1 text-gray-600">Help support content creators when you shop through their links</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
