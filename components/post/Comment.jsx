'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import UserMeta from '@/components/shared/UserMeta';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Comment({ comment, currentUser, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      toast.success('Comment deleted successfully');
      if (onDelete) {
        onDelete(comment.id);
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      toast.error('Failed to delete comment');
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = new Date(comment.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const canDelete = currentUser?.id === comment.user_id || ['admin', 'moderator'].includes(currentUser?.role);

  return (
    <div className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
      <Avatar 
        name={comment.user?.full_name} 
        avatarUrl={comment.user?.avatar_url} 
        size="sm" 
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <UserMeta 
            name={comment.user?.full_name}
            role={comment.user?.role}
            timestamp={formattedDate}
          />
          
          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 -mt-1"
            >
              {deleting ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Trash2 size={14} />
              )}
            </Button>
          )}
        </div>
        
        <p className="text-slate-700 mt-2 whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}