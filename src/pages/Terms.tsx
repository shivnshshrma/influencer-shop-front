import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Terms = () => <div className="bg-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-700">Influstyle – Terms and Conditions</h1>
      <p className="text-gray-700 mb-4"><strong>Effective Date: [Insert Date]</strong></p>
      <p className="mb-6">
        Welcome to Influstyle. These Terms and Conditions (“Terms”) govern your access to and use of our website and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Overview</h2>
      <p className="mb-4">
        Influstyle is a platform that connects influencers with shoppers by offering personalized fashion recommendations. We provide users with curated content, product suggestions, and affiliate links tailored to their preferences and interests.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. User Data and Personalization</h2>
      <h3 className="font-semibold">2.1 Collection of Information</h3>
      <p className="mb-4">
        By using our platform, you agree to provide certain information such as name, email, gender, age, height, weight, skin tone, body measurements, preferences, and browsing behavior. This data helps us improve your experience.
      </p>
      <h3 className="font-semibold">2.2 Use of Information</h3>
      <p>
        You acknowledge and agree that Influstyle may use the data you provide to:
      </p>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Generate personalized product recommendations</li>
        <li>Curate influencer content tailored to your profile</li>
        <li>Optimize your feed and improve recommendation accuracy</li>
        <li>Send relevant offers, promotions, and style suggestions</li>
      </ul>
      <p className="mb-4">
        Your data will not be sold to third parties but may be shared with our trusted partners and affiliates for the sole purpose of delivering better personalization and functionality.
      </p>
      <h3 className="font-semibold">2.3 Data Protection</h3>
      <p className="mb-4">
        We follow industry best practices to safeguard your information. For details, please refer to our <a href="/privacy-policy" className="underline text-brand-600 hover:text-brand-700">Privacy Policy</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Provide accurate and up-to-date information</li>
        <li>Use the website for lawful purposes only</li>
        <li>Not impersonate another person or provide false data</li>
        <li>Not attempt to hack, disrupt, or misuse the service</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Affiliate Disclosure</h2>
      <p className="mb-4">
        Influstyle earns commissions on some of the products listed via affiliate programs. This does not affect your cost but helps support our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Intellectual Property</h2>
      <p className="mb-4">
        All content on Influstyle—including logos, designs, product data, text, and graphics—is the property of Influstyle or its partners. You may not use, reproduce, or distribute this content without prior written permission.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Account Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your account at our discretion, especially in cases of policy violations or misuse.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        Influstyle is not responsible for any direct or indirect damages arising from the use of the site, including but not limited to recommendation accuracy, third-party purchases, or influencer claims.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Modifications</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Continued use of the website constitutes acceptance of any revised Terms. We recommend checking this page periodically.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and interpreted in accordance with the laws of [Your Country/State], without regard to conflict of law principles.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have questions about these Terms, contact us at:<br />
        <span className="font-mono">📧 styleinflu@gmail.com</span>
      </p>
    </main>
    <Footer />
  </div>;
export default Terms;