import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import Navbar from '@/components/navigation/Navbar';
import FeedList from '@/components/feed/FeedList';

export default async function FeedPage() {
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
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Community Feed</h1>
            <p className="text-slate-600 mt-1">Discover what's happening in the community</p>
          </div>
        </div>

        <FeedList />
      </div>
    </div>
  );
}