import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const usePosts = (params?: { page?: number; limit?: number; category?: string; influencer_id?: string }) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => apiClient.getPosts(params),
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => apiClient.getPost(id),
    enabled: !!id,
  });
};

export const useMyPosts = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['my-posts', params],
    queryFn: () => apiClient.getMyPosts(params),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: string;
      product_link: string;
      media_urls: string[];
      type: 'image' | 'video';
    }) => apiClient.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create post');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiClient.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update post');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
    },
  });
};