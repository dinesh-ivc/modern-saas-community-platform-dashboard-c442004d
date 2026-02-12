'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, Award, Loader2 } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ProfileHeader({ userId, currentUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      setUser(data.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || 'User not found'}</AlertDescription>
      </Alert>
    );
  }

  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'moderator':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-start gap-6">
        <Avatar 
          name={user.full_name} 
          avatarUrl={user.avatar_url} 
          size="xl" 
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{user.full_name}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
              {user.role}
            </span>
          </div>
          
          {user.bio && (
            <p className="text-slate-600 mb-4">{user.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joined {joinedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span>{user.reputation_points || 0} points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}