import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMyPosts, useDeletePost } from "@/hooks/usePosts";

const InfluencerPosts = () => {
  const { data: postsData, isLoading } = useMyPosts();
  const deletePost = useDeletePost();
  const { toast } = useToast();
  
  const posts = postsData?.posts || [];
  
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost.mutateAsync(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading your posts...</p>
      </div>
    );
  }
  
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
                src={post.media_urls?.[0] || '/placeholder.svg'} 
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
                <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
              </div>
              
              <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <a 
                  href={post.product_link} 
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
                  disabled={deletePost.isPending}
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