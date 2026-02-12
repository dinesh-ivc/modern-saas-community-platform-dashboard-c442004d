import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center shadow-2xl">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Join the Community?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Start connecting with amazing people today. It's free and takes less than a minute to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-2"
          >
            Create Your Account
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/login"
            className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-blue-500"
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </section>
  );
}