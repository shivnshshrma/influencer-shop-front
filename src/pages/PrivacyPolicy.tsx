
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => (
  <div className="bg-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-700">Privacy Policy</h1>
      <p className="text-gray-700 mb-4"><strong>Effective Date: [Insert Date]</strong><br/><strong>Last Updated: [Insert Date]</strong></p>
      <p className="mb-6">
        At Influstyle, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines what data we collect, how we use it, and your rights in relation to your information.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-2">When you use Influstyle, we collect the following types of information:</p>
      <h3 className="font-semibold">1.1 Personal Information</h3>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Name</li>
        <li>Email address</li>
        <li>Gender</li>
        <li>Age</li>
        <li>Body measurements (e.g., height, weight, size, skin tone)</li>
        <li>Location (optional)</li>
      </ul>
      <h3 className="font-semibold">1.2 Usage Data</h3>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Browsing behavior on our site</li>
        <li>Clicks on product links</li>
        <li>Interaction with influencer pages</li>
        <li>Time spent on site</li>
        <li>Device and browser type</li>
      </ul>
      <h3 className="font-semibold">1.3 Cookies and Tracking Technologies</h3>
      <p className="mb-4">
        We use cookies to store preferences, improve performance, and personalize recommendations. Read more in our <a href="/cookie-policy" className="underline text-brand-600 hover:text-brand-700">Cookie Policy</a>.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Provide personalized fashion and product recommendations</li>
        <li>Customize your feed and influencer content</li>
        <li>Track and analyze site usage to improve features</li>
        <li>Communicate with you about new collections, promotions, and content</li>
        <li>Operate affiliate links and track commission-based sales</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your data. However, we may share it with:
      </p>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Affiliate partners (to track product clicks and purchases)</li>
        <li>Third-party services we use for personalization, analytics, and communication (e.g., email platforms)</li>
        <li>Legal authorities, if required by law or to protect our rights</li>
      </ul>
      <p className="mb-4">
        All partners are under strict agreements to safeguard your data.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Rights</h2>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Access or update your personal information</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of promotional emails</li>
        <li>Disable cookies in your browser</li>
      </ul>
      <p className="mb-4">
        For any requests, email us at: <span className="font-mono">styleinflu@gmail.com</span>
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Retention</h2>
      <p className="mb-4">
        We keep your data only as long as needed for personalization and platform improvement. You can delete your account and data anytime upon request.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Children's Privacy</h2>
      <p className="mb-4">
        Influstyle is not intended for users under 13. We do not knowingly collect data from children. If you're a parent or guardian and believe your child has shared personal data, please contact us.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy. Significant changes will be communicated on our website or via email. Continued use implies acceptance.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact</h2>
      <p className="mb-4">
        For any concerns or inquiries:<br/>
        <span className="font-mono">styleinflu@gmail.com</span>
      </p>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
