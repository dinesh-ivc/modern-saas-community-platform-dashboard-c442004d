'use client';

import Link from 'next/link';
import { MessageSquare, Heart, Calendar } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import UserMeta from '@/components/shared/UserMeta';

export default function PostCard({ post }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/post/${post.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          <Avatar 
            name={post.user?.full_name} 
            avatarUrl={post.user?.avatar_url} 
            size="md" 
          />
          
          <div className="flex-1 min-w-0">
            <UserMeta 
              name={post.user?.full_name}
              role={post.user?.role}
              timestamp={formattedDate}
            />
            
            <h2 className="text-xl font-semibold text-slate-900 mt-3 mb-2 hover:text-blue-600 transition">
              {post.title}
            </h2>
            
            <p className="text-slate-600 line-clamp-3 mb-4">
              {post.content}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>{post.comment_count || 0} comments</span>
              </div>
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
        </div>
      </div>
    </Link>
  );
}