"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import Navbar from "../components/Navbar";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { user, signOut } = useAuth();

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <Navbar page="home" onOpenAuthModal={openAuthModal} />

      {/* Hero Section - REVERTED TO BRAND COLORS */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Brand color pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-emerald/40 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-sage/50 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-emerald/45 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-copper/40 rounded-full"></div>
          <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-sage/40 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald/50 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight lg:-mt-16">
              Automate Your
              <span className="block text-emerald">Sales Outreach</span>
              & Lead Qualification
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform your cold database into qualified appointments. 
              Our AI voice agents call, qualify, and book meetings with prospects automatically - handling 100+ contacts daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => user ? window.location.href = 'https://growthos.n3tworx.io/' : openAuthModal('signup')}
                className="bg-emerald hover:bg-sage text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {user ? 'Launch Campaign' : 'Launch Campaign'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Results That Speak for Themselves
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-emerald mb-2">100+</div>
              <div className="text-gray-300 text-lg">Daily Outreach Calls</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-emerald mb-2">30%</div>
              <div className="text-gray-300 text-lg">Contact Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-emerald mb-2">5x - 10x</div>
              <div className="text-gray-300 text-lg">More Qualified Meetings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-emerald mb-2">24/7</div>
              <div className="text-gray-300 text-lg">Automated Calling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Voice Outreach
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI voice platform transforms cold databases into qualified appointments, handling 100+ calls daily on autopilot.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards with dark theme */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-emerald/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Upload & Launch</h3>
              <p className="text-gray-300 mb-4">Upload your prospect database and configure AI voice campaigns instantly.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload CSV lists instantly
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Set qualification criteria
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Configure call scripts
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Schedule campaign timing
                </li>
              </ul>
            </div>

            {/* Email Campaigns Card */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-emerald/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Voice Outreach</h3>
              <p className="text-gray-300 mb-4">AI agents make natural calls in 30+ languages to qualify prospects automatically</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Natural conversations in 30+ languages
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Intelligent qualification questions
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Objection handling
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Compliance-safe scripting
                </li>
              </ul>
            </div>

            {/* LinkedIn Outreach Card */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-emerald/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automated Booking</h3>
              <p className="text-gray-300 mb-4">Qualified prospects are automatically scheduled directly into your calendar</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Direct calendar integration
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Round-robin assignment
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lead scoring & routing
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time notifications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - DARK */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How Outreach Engine™ Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our automated system works 24/7 to fill your pipeline with qualified prospects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Upload Leads",
                description: "Import your database via CSV.",
                color: "sage"
              },
              {
                step: "02", 
                title: "Configure Agent",
                description: "Set qualification criteria and booking rules.",
                color: "sage"
              },
              {
                step: "03",
                title: "Launch Campaign",
                description: "AI starts calling automatically.",
                color: "sage"
              },
              {
                step: "04",
                title: "Get Appointments",
                description: "Qualified meetings appear in calendars.",
                color: "sage"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-6 border border-gray-700/50 hover:border-emerald/50 transition-all duration-300">
                  <div className={`w-16 h-16 bg-${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Outreach Engine™</h3>
              <p className="text-gray-400 mb-4">
                Automate your entire outreach process and book more meetings with qualified prospects.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-emerald transition-colors">Features</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 Meeting Machine™. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  );
}
