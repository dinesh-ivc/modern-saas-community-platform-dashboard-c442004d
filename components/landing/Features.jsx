import { Zap, Shield, Users, MessageCircle, Award, Search } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Rich Discussions',
    description: 'Engage in meaningful conversations with threaded comments and real-time interactions.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Connect with members who share your interests and build lasting relationships.',
    color: 'green',
  },
  {
    icon: Shield,
    title: 'Moderation Tools',
    description: 'Keep your community safe with powerful moderation and content management features.',
    color: 'purple',
  },
  {
    icon: Award,
    title: 'Reputation System',
    description: 'Earn points and recognition for your valuable contributions to the community.',
    color: 'orange',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find exactly what you need with advanced search and filtering capabilities.',
    color: 'pink',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Stay informed with instant notifications for mentions, replies, and activity.',
    color: 'indigo',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
  indigo: 'bg-indigo-100 text-indigo-600',
};

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything You Need for a Thriving Community
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to help you build, engage, and grow your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200"
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClasses[feature.color]}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}