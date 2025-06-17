import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.getWishlist(),
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => apiClient.addToWishlist(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Added to wishlist!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to add to wishlist');
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => apiClient.removeFromWishlist(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Removed from wishlist');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to remove from wishlist');
    },
  });
};

export const useCheckWishlist = (postId: string) => {
  return useQuery({
    queryKey: ['wishlist-check', postId],
    queryFn: () => apiClient.checkWishlist(postId),
    enabled: !!postId,
  });
};