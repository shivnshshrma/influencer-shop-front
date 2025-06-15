
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { influencerDatabase } from "../utils/influencerDatabase";
import ShopThisPost from "../components/ShopThisPost";

// Find post and influencer by product id
const findPostById = (id: string | undefined) => {
  if (!id) return null;
  for (const inf of influencerDatabase) {
    const product = inf.products.find((p) => String(p.id) === id);
    if (product) {
      return {
        image: product.image,
        caption: product.caption,
        influencer: {
          name: inf.name,
          avatar: inf.avatar,
        },
        category: inf.category,
        shopItems: product.shopItems || [],
      };
    }
  }
  return null;
};

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = findPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div>
            <h2 className="text-xl font-bold mb-2 text-center">Post Not Found</h2>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 px-4 py-2 bg-brand-600 text-white rounded"
            >
              Back to Shop
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row container py-10 md:py-16 gap-8">
        <div className="md:w-2/3 flex items-center justify-center">
          <img
            src={post.image}
            alt={post.caption}
            className="rounded-lg shadow-lg max-h-[500px] object-cover w-full"
          />
        </div>
        <div className="md:w-1/3 flex flex-col justify-start">
          <div className="flex items-center mb-4">
            <img src={post.influencer.avatar} alt={post.influencer.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div>
              <div className="font-semibold text-lg">{post.influencer.name}</div>
              <div className="text-sm text-muted-foreground">{post.category}</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Post</h2>
          <p className="mb-4">{post.caption}</p>
          {/* Shop this post area */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-lg">Shop this post</div>
              <span className="text-xs text-muted-foreground">Paid links</span>
            </div>
            <ShopThisPost items={post.shopItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetails;
