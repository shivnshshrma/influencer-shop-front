
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getUserData, getPostsByAuthor, deletePost, type Post } from "@/utils/localStorage";

const InfluencerPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load posts for current user
    const userData = getUserData();
    const userPosts = getPostsByAuthor(userData.id);
    setPosts(userPosts);
  }, []);
  
  const handleDeletePost = (postId: number) => {
    try {
      // Delete post using utility function
      deletePost(postId);
      
      // Update state
      setPosts(posts.filter(post => post.id !== postId));
      
      // Show success message
      toast({
        title: "Post deleted",
        description: "Your post has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500">You haven't created any posts yet.</p>
        <p className="text-gray-500 mt-1">Use the form above to create your first post!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
              <img 
                src={post.image} 
                alt={post.name}
                className="h-full w-full object-cover"
              />
              {post.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="rounded-full bg-white bg-opacity-80 p-2">
                    <div className="h-6 w-6 text-gray-800">▶</div>
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white rounded-full py-1 px-2">
                <span className="text-sm font-medium">{post.price}</span>
              </div>
            </div>
            
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg">{post.name}</h3>
                <span className="text-sm text-gray-500">{formatDate(post.timestamp)}</span>
              </div>
              
              <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <a 
                  href={post.productLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-brand-600 hover:text-brand-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Product Link
                </a>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfluencerPosts;
