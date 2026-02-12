'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User, PenSquare, Home } from 'lucide-react';
import { toast } from 'sonner';
import Avatar from '@/components/shared/Avatar';

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/login');
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/feed" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            Community
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/feed" 
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
            >
              <Home size={18} />
              Feed
            </Link>
            <Link 
              href="/create" 
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
            >
              <PenSquare size={18} />
              Create Post
            </Link>
            <Link 
              href={`/profile/${user?.id}`}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
            >
              <User size={18} />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <Avatar name={user?.full_name} avatarUrl={user?.avatar_url} size="sm" />
              <span className="text-sm font-medium text-slate-900">{user?.full_name}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/feed" 
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <Home size={18} />
                Feed
              </Link>
              <Link 
                href="/create" 
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <PenSquare size={18} />
                Create Post
              </Link>
              <Link 
                href={`/profile/${user?.id}`}
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}