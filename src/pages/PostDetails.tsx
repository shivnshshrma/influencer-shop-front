import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// For demonstration reuse the influencerDatabase as in Shop
const influencerDatabase = [
  // ... same as Shop.tsx for quick stub/fake data (real app: refactor as util)
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Fashion & Style",
    products: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "Premium wireless headphones for your style.",
        shopItems: [
          {
            id: "shirt",
            title: "Navy Polo Shirt",
            image: "https://images.unsplash.com/photo-1469398715555-76331e9cc3da?auto=format&fit=crop&w=500&q=80",
            link: "#"
          },
          {
            id: "jeans",
            title: "Classic Blue Jeans",
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
            link: "#"
          },
          {
            id: "watch",
            title: "Silver Watch",
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=500&q=80",
            link: "#"
          },
          {
            id: "shoes",
            title: "White Sneakers",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
            link: "#"
          },
        ]
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        caption: "Designer sunglasses—ultimate fashion statement!",
        shopItems: [
          {
            id: "sunglasses",
            title: "Designer Sunglasses",
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
            link: "#"
          }
        ]
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        caption: "Summer Collection Review: My faves of the season.",
        shopItems: []
      },
    ],
  },
  {
    id: 2,
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Fitness & Wellness",
    products: [
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1611741385334-864f40e100b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "My daily yoga mat pick for pro grip.",
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1606767041004-6b387b91e360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        caption: "Eco water bottle—hydrate, stay fit!",
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "Home workout essentials, my top picks.",
      },
    ],
  },
  {
    id: 3,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Beauty & Skincare",
    products: [
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1912&q=80",
        caption: "Hydrating facial serum for radiant skin 💧",
      },
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "My AM skincare routine for a glow up!",
      },
    ],
  },
  {
    id: 4,
    name: "Marcus Taylor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    category: "Home & Lifestyle",
    products: [
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
        caption: "Smart home assistant: organize life, hands-free.",
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1585842630354-448fe6ccbef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "My home office starter kit! #StayProductive",
      },
    ],
  },
];

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
            {post.shopItems && post.shopItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {post.shopItems.map(item => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col bg-white border rounded-lg overflow-hidden shadow group hover:shadow-lg transition gap-1"
                    title={item.title}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between py-2 px-2">
                      <span className="text-sm font-medium text-center">{item.title}</span>
                      <button
                        tabIndex={-1}
                        className="self-center text-gray-400 hover:text-brand-600 transition text-xl mt-1"
                        aria-label="Add to wishlist"
                        style={{pointerEvents: 'none'}}
                      >♡</button>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded border border-dashed p-6 text-muted-foreground text-center">
                Product recommendations will appear here!
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetails;
