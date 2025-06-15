
export function generateAIResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  
  if (input.includes("headphone") || input.includes("audio")) {
    return "I'd recommend our Wireless Noise-Cancelling Headphones for ₹20,699. They offer excellent sound quality and comfort. Would you like to know more about their features?";
  }
  
  if (input.includes("yoga") || input.includes("fitness")) {
    return "For fitness enthusiasts, we have a Premium Yoga Mat for ₹7,399. It's eco-friendly and provides excellent grip. We also have other fitness products. What specific fitness equipment are you looking for?";
  }
  
  if (input.includes("beauty") || input.includes("skincare")) {
    return "Our Hydrating Facial Serum for ₹4,819 is very popular! It's recommended by beauty influencer Sarah Chen. Would you like recommendations for other skincare products?";
  }
  
  if (input.includes("price") || input.includes("budget")) {
    return "I can help you find products within your budget! What's your price range? We have products from ₹2,909 to ₹20,699 across various categories.";
  }
  
  if (input.includes("smart home") || input.includes("home")) {
    return "Check out our Smart Home Assistant for ₹10,719! It can control your lights, music, and answer questions. Perfect for making your home smarter.";
  }
  
  return "That's a great question! I can help you find the perfect product. Could you tell me more about what you're looking for? I can search through our tech, fashion, beauty, fitness, home, and lifestyle categories.";
}
