
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CookiePolicy = () => (
  <div className="bg-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-700">Cookie Policy</h1>
      <p className="text-gray-700 mb-4"><strong>Effective Date: [Insert Date]</strong></p>
      <p className="mb-6">
        This Cookie Policy explains how Influstyle uses cookies and similar technologies to recognize you when you visit our website and how you can manage them.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your browser when you visit a website. They help us recognize you and improve your experience.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Why We Use Cookies</h2>
      <p className="mb-2">We use cookies for several purposes:</p>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li><span className="font-semibold">Essential Cookies:</span> Enable core features like login and page navigation</li>
        <li><span className="font-semibold">Preference Cookies:</span> Remember your site settings (e.g., language, layout)</li>
        <li><span className="font-semibold">Analytics Cookies:</span> Collect data on usage to improve the site</li>
        <li><span className="font-semibold">Marketing Cookies:</span> Track behavior for personalized promotions and affiliate link tracking</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Types of Cookies We Use</h2>
      <table className="table-auto border mb-4 text-gray-700">
        <thead>
          <tr>
            <th className="border px-3 py-2">Type</th>
            <th className="border px-3 py-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-3 py-2">Session</td>
            <td className="border px-3 py-2">Temporary cookies for site functionality</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Persistent</td>
            <td className="border px-3 py-2">Remain after the session to retain settings</td>
          </tr>
          <tr>
            <td className="border px-3 py-2">Third-party</td>
            <td className="border px-3 py-2">From partners like analytics or affiliate platforms</td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Choices</h2>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Accept or reject non-essential cookies via our pop-up banner</li>
        <li>Change cookie preferences anytime in your browser settings</li>
        <li>Delete cookies from your browser history</li>
      </ul>
      <p className="mb-4">
        <span className="font-semibold">Note:</span> Disabling cookies may affect website functionality.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services like:
      </p>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Google Analytics</li>
        <li>Meta Pixel (Facebook)</li>
        <li>Affiliate tracking providers</li>
      </ul>
      <p className="mb-4">
        These partners may set their own cookies. Their usage is governed by their respective privacy policies.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact Us</h2>
      <p className="mb-4">Questions about this Cookie Policy?<br />
        <span className="font-mono">styleinflu@gmail.com</span>
      </p>
    </main>
    <Footer />
  </div>
);

export default CookiePolicy;
