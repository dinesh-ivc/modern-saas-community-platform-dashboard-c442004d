'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/posts/' + postId + '/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to post comment');
      }

      setContent('');
      toast.success('Comment posted successfully');
      
      if (onCommentAdded) {
        onCommentAdded();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="mb-3"
        disabled={submitting}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting || !content.trim()}>
          {submitting ? (
            'Posting...'
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Post Comment
            </>
          )}
        </Button>
      </div>
    </form>
  );
}