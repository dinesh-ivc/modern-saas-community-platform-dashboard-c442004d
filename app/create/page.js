import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import Navbar from '@/components/navigation/Navbar';
import PostForm from '@/components/create/PostForm';

export default async function CreatePostPage() {
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
          <p className="text-slate-600 mt-1">Share your thoughts with the community</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <PostForm />
        </div>
      </div>
    </div>
  );
}