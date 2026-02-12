'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Heart, Trash2, Loader2 } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import UserMeta from '@/components/shared/UserMeta';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PostDetail({ postId, currentUser }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      
      const data = await response.json();
      setPost(data.data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      toast.success('Post deleted successfully');
      router.push('/feed');
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || 'Post not found'}</AlertDescription>
      </Alert>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const canDelete = currentUser?.id === post.user_id || ['admin', 'moderator'].includes(currentUser?.role);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          <Avatar 
            name={post.user?.full_name} 
            avatarUrl={post.user?.avatar_url} 
            size="lg" 
          />
          <div>
            <UserMeta 
              name={post.user?.full_name}
              role={post.user?.role}
              timestamp={formattedDate}
            />
          </div>
        </div>
        
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            {deleting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
          </Button>
        )}
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        {post.title}
      </h1>

      <div className="prose max-w-none mb-6">
        <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="flex items-center gap-6 text-sm text-slate-500 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <Heart size={16} />
          <span>{post.likes_count || 0} likes</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}