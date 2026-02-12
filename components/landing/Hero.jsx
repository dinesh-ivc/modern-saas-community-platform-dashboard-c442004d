import Link from 'next/link';
import { ArrowRight, Users, MessageSquare, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Users size={16} />
          Join thousands of community members
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Connect, Share, and Grow Together
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          A modern platform for meaningful discussions, collaborative learning, and building lasting connections with like-minded individuals.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/login"
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Users className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">10k+</h3>
            <p className="text-slate-600">Active Members</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <MessageSquare className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">50k+</h3>
            <p className="text-slate-600">Discussions</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <TrendingUp className="text-purple-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">95%</h3>
            <p className="text-slate-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}