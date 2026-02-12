import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import Navbar from '@/components/navigation/Navbar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserPosts from '@/components/profile/UserPosts';

export default async function ProfilePage({ params }) {
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
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProfileHeader userId={id} currentUser={user} />
        <UserPosts userId={id} />
      </div>
    </div>
  );
}