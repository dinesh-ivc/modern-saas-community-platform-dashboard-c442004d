'use client';

import { useState, useEffect } from 'react';
import Comment from '@/components/post/Comment';
import { Loader2, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CommentList({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?post_id=${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      setComments(data.data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin text-blue-600" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <MessageSquare className="mx-auto mb-2" size={32} />
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          currentUser={currentUser}
          onDelete={handleCommentDeleted}
        />
      ))}
    </div>
  );
}