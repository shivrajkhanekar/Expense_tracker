import Link from "next/link";
import { ArrowRight, PieChart, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
          SpendSync
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl">
          Take control of your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500">
            financial future.
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Track expenses, monitor your income, and stay on top of your financial goals with SpendSync—the beautifully simple expense tracker.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30"
          >
            Get Started Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <PieChart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Insights</h3>
            <p className="text-gray-600">Understand your spending habits at a glance with beautiful, interactive charts.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Add transactions in seconds and experience a snappy, responsive interface.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
            <p className="text-gray-600">Your financial data is encrypted and secure, accessible only to you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
