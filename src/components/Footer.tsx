
import { Facebook, Instagram, Twitter } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Social */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-brand-400">InfluStyle</h2>
            <p className="mt-4 text-gray-400">
              Connecting influencers with shoppers through authentic product recommendations.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-400 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-400 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-400 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
            </div>
          </div>
          {/* Accordions */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Company Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="about">
                <AccordionTrigger className="text-gray-100">
                  About Us
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  At Influstyle, we empower influencers to share real product recommendations that inspire trust and authenticity. Our platform bridges the gap between style creators and shoppers by making curated fashion accessible, relatable, and personal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="careers">
                <AccordionTrigger className="text-gray-100">
                  Careers
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We're building the future of influencer-driven commerce. Join our passionate team of designers, developers, marketers, and dreamers. At Influstyle, your work has direct impact. Explore open roles and grow with us.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="press">
                <AccordionTrigger className="text-gray-100">
                  Press
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  For press inquiries, interviews, or brand assets, please reach out to our media relations team. We love collaborating with journalists and industry insiders to tell the story of fashion and influence done right.<br />
                  <span className="block mt-2">Contact: <a href="mailto:styleinflu@gmail.com" className="underline text-brand-400">styleinflu@gmail.com</a></span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="blog">
                <AccordionTrigger className="text-gray-100">
                  Blog
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Stay inspired with the latest in style, shopping tips, influencer journeys, and tech behind the trends. Our blog brings you closer to the voices and stories shaping modern fashion.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Resources Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="influencers">
                <AccordionTrigger className="text-gray-100">
                  For Influencers
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Monetize your style effortlessly. Influstyle gives you tools to recommend products, track performance, and grow your brand. Join a network where authenticity drives earnings.<br />
                  <a
                    href="/auth?tab=signup"
                    className="inline-block mt-2 px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 transition"
                  >Start Now &rarr;</a>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shoppers">
                <AccordionTrigger className="text-gray-100">
                  For Shoppers
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Discover your style through curated picks from people you trust. Explore fashion that fits your taste and body, with AI-powered suggestions tailored to you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="help-center">
                <AccordionTrigger className="text-gray-100">
                  Help Center
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Need assistance? Visit our Help Center for FAQs, account guidance, order support, and more. We're here to make your Influstyle experience seamless.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brand-partnerships">
                <AccordionTrigger className="text-gray-100">
                  Brand Partnerships
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Collaborate with top influencers and reach engaged audiences. Partner with Influstyle to drive sales through authentic fashion storytelling.<br />
                  <span className="block mt-2">Email us at: <a href="mailto:styleinflu@gmail.com" className="underline text-brand-400">styleinflu@gmail.com</a></span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Legal Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="privacy-policy">
                <AccordionTrigger className="text-gray-100">
                  Privacy Policy
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We are committed to protecting your privacy. Learn how we collect, use, and secure your data while you interact with Influstyle.<br />
                  <a href="/privacy-policy" className="underline text-brand-400">Read our Privacy Policy &rarr;</a>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="terms">
                <AccordionTrigger className="text-gray-100">
                  Terms of Service
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Review the rules and expectations when using our platform. By accessing Influstyle, you agree to our terms, conditions, and community standards.<br />
                  <a href="/terms" className="underline text-brand-400">View Terms of Service &rarr;</a>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cookie-policy">
                <AccordionTrigger className="text-gray-100">
                  Cookie Policy
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Influstyle uses cookies to personalize your experience and analyze site usage. Learn more about how cookies help us serve you better.<br />
                  <a href="/cookie-policy" className="underline text-brand-400">Cookie Policy Details &rarr;</a>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="affiliate-disclosure">
                <AccordionTrigger className="text-gray-100">
                  Affiliate Disclosure
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Some of the links on Influstyle are affiliate links. This means we may earn a small commission at no extra cost to you when you buy through them. Our goal is always to bring you genuine and valuable recommendations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
