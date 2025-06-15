
/**
 * Central source of influencer database for product/shop page logic.
 */
export const influencerDatabase = [
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
        ],
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
        ],
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        caption: "Summer Collection Review: My faves of the season.",
        shopItems: [],
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
        shopItems: [],
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1606767041004-6b387b91e360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        caption: "Eco water bottle—hydrate, stay fit!",
        shopItems: [],
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "Home workout essentials, my top picks.",
        shopItems: [],
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
        shopItems: [],
      },
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "My AM skincare routine for a glow up!",
        shopItems: [],
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
        shopItems: [],
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1585842630354-448fe6ccbef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        caption: "My home office starter kit! #StayProductive",
        shopItems: [],
      },
    ],
  },
];
