
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-brand-400">InfluStyle</h2>
            <p className="mt-4 text-gray-400">
              Connecting influencers with shoppers through authentic product recommendations.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-400">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400">
                <span className="sr-only">Twitter</span>
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Press</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">For Influencers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">For Shoppers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Brand Partnerships</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Affiliate Disclosure</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} InfluStyle. All rights reserved.
          </p>
          <p className="text-base text-gray-400 mt-2 md:mt-0">
            Designed with ♥ for influencers and shoppers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
