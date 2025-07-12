import Link from 'next/link';
import { ArrowRight, Users, RefreshCw, Star, TrendingUp } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Active Users', value: '2,500+', icon: Users },
    { label: 'Skills Exchanged', value: '15,000+', icon: RefreshCw },
    { label: 'Average Rating', value: '4.8/5', icon: Star },
    { label: 'Success Rate', value: '92%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Exchange Skills,
            <span className="text-indigo-600"> Grow Together</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with like-minded learners and professionals. Share your expertise, 
            learn new skills, and build meaningful relationships in our thriving community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors gap-2"
            >
              Start Browsing Skills
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-300 transition-colors"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How SkillSwap Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these three easy steps to begin your skill exchange journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                List your skills and what you'd like to learn. Add your availability and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Matches</h3>
              <p className="text-gray-600">
                Browse our community and discover people who have what you need and want what you offer.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Learning</h3>
              <p className="text-gray-600">
                Connect with your matches, schedule sessions, and begin exchanging knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of learners who are already growing their skills through peer-to-peer exchange.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg transition-colors gap-2"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}