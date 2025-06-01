/**
 * LocalStorage utility functions for managing application data
 */

// User related types and functions
export interface UserData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isInfluencer?: boolean;
  measurements?: {
    height?: string;
    chest?: string;
    waist?: string;
    hips?: string;
    shoeSize?: string;
    skinTone?: string;
  };
}

// Default user for when nothing is in localStorage
const defaultUser: UserData = {
  id: 0,
  name: "User",
  email: "user@example.com",
  phone: "",
  avatar: "",
  measurements: {
    height: "",
    chest: "",
    waist: "",
    hips: "",
    shoeSize: "",
    skinTone: "",
  }
};

/**
 * Get user data from localStorage with proper error handling
 */
export const getUserData = (): UserData => {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) return { ...defaultUser };
    
    const parsedUser = JSON.parse(userData);
    
    // Ensure all required fields exist
    return {
      id: parsedUser.id || 0,
      name: parsedUser.name || defaultUser.name,
      email: parsedUser.email || defaultUser.email,
      phone: parsedUser.phone || "",
      avatar: parsedUser.avatar || "",
      isInfluencer: parsedUser.isInfluencer || false,
      measurements: {
        height: parsedUser.measurements?.height || "",
        chest: parsedUser.measurements?.chest || "",
        waist: parsedUser.measurements?.waist || "",
        hips: parsedUser.measurements?.hips || "",
        shoeSize: parsedUser.measurements?.shoeSize || "",
        skinTone: parsedUser.measurements?.skinTone || "",
      }
    };
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return { ...defaultUser };
  }
};

/**
 * Save user data to localStorage
 */
export const saveUserData = (userData: Partial<UserData>): void => {
  try {
    // Get current data to merge with updates
    const currentData = getUserData();
    
    // Merge existing and new data
    const updatedData = {
      ...currentData,
      ...userData,
      // Special handling for nested measurements object
      measurements: {
        ...currentData.measurements,
        ...(userData.measurements || {})
      }
    };
    
    localStorage.setItem("userData", JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

/**
 * Set logged in status
 */
export const setLoggedIn = (status: boolean): void => {
  localStorage.setItem("isLoggedIn", status ? "true" : "false");
};

/**
 * Check if user is an influencer
 */
export const isInfluencer = (): boolean => {
  // Check both dedicated flag and user data
  return localStorage.getItem("isInfluencer") === "true" || getUserData().isInfluencer === true;
};

/**
 * Set influencer status
 */
export const setInfluencer = (status: boolean): void => {
  localStorage.setItem("isInfluencer", status ? "true" : "false");
  
  // Also update in user data for consistency
  const userData = getUserData();
  saveUserData({
    ...userData,
    isInfluencer: status
  });
};

// Wishlist related types and functions
export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
  influencer?: string;
  influencerId?: number;
  influencerImage?: string;
}

/**
 * Get all wishlist items
 */
export const getWishlistItems = (): WishlistItem[] => {
  try {
    const items = localStorage.getItem("wishlistItems");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error retrieving wishlist items:", error);
    return [];
  }
};

/**
 * Add item to wishlist
 */
export const addToWishlist = (item: WishlistItem): void => {
  try {
    const currentItems = getWishlistItems();
    const isAlreadyInWishlist = currentItems.some(wishlistItem => wishlistItem.id === item.id);
    
    if (!isAlreadyInWishlist) {
      const updatedItems = [...currentItems, item];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedItems));
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};

/**
 * Remove item from wishlist
 */
export const removeFromWishlist = (itemId: number): void => {
  try {
    const currentItems = getWishlistItems();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};

/**
 * Check if item is in wishlist
 */
export const isInWishlist = (itemId: number): boolean => {
  const wishlistItems = getWishlistItems();
  return wishlistItems.some(item => item.id === itemId);
};

// Post related types and functions
export interface Post {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  productLink: string;
  type: 'image' | 'video';
  authorId: number;
  authorName: string;
  authorImage?: string;
  timestamp: string;
}

/**
 * Get all posts
 */
export const getAllPosts = (): Post[] => {
  try {
    const posts = localStorage.getItem("influencerPosts");
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return [];
  }
};

/**
 * Get posts by author ID
 */
export const getPostsByAuthor = (authorId: number): Post[] => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.authorId === authorId);
};

/**
 * Save a new post
 */
export const savePost = (post: Omit<Post, "id" | "timestamp" | "authorId" | "authorName" | "authorImage">): Post => {
  try {
    const allPosts = getAllPosts();
    const userData = getUserData();
    
    const newPost: Post = {
      id: Date.now(),
      ...post,
      authorId: userData.id,
      authorName: userData.name,
      authorImage: userData.avatar,
      timestamp: new Date().toISOString(),
    };
    
    // Add new post at the beginning
    const updatedPosts = [newPost, ...allPosts];
    localStorage.setItem("influencerPosts", JSON.stringify(updatedPosts));
    
    return newPost;
  } catch (error) {
    console.error("Error saving post:", error);
    throw new Error("Failed to save post");
  }
};

/**
 * Delete a post by ID
 */
export const deletePost = (postId: number): void => {
  try {
    const allPosts = getAllPosts();
    const updatedPosts = allPosts.filter(post => post.id !== postId);
    localStorage.setItem("influencerPosts", JSON.stringify(updatedPosts));
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
};
