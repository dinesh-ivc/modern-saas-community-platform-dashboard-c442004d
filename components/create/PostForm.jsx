'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 5) {
      toast.error('Title must be at least 5 characters');
      return;
    }

    if (!content.trim() || content.trim().length < 20) {
      toast.error('Content must be at least 20 characters');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      const data = await response.json();
      toast.success('Post created successfully!');
      router.push(`/post/${data.data.id}`);
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter a descriptive title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          className="mt-2"
        />
        <p className="text-sm text-slate-500 mt-1">
          {title.length}/100 characters (minimum 5)
        </p>
      </div>

      <div>
        <Label htmlFor="content">Post Content</Label>
        <Textarea
          id="content"
          placeholder="Share your thoughts, ideas, or questions..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
          rows={12}
          className="mt-2"
        />
        <p className="text-sm text-slate-500 mt-1">
          {content.length} characters (minimum 20)
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
          {submitting ? (
            'Creating...'
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Create Post
            </>
          )}
        </Button>
      </div>
    </form>
  );
}