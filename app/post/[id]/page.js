import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import Navbar from '@/components/navigation/Navbar';
import PostDetail from '@/components/post/PostDetail';
import CommentList from '@/components/post/CommentList';
import CommentForm from '@/components/post/CommentForm';

export default async function PostDetailPage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user = null;
  try {
    const decoded = await verifyToken(token);
    user = decoded;
  } catch (error) {
    redirect('/login');
  }

  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PostDetail postId={id} currentUser={user} />
        
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Comments</h2>
          <CommentForm postId={id} />
          <CommentList postId={id} currentUser={user} />
        </div>
      </div>
    </div>
  );
}