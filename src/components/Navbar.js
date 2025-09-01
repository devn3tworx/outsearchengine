'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar({ page = 'home', onOpenAuthModal }) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const openAuthModal = (mode) => {
    if (onOpenAuthModal) {
      onOpenAuthModal(mode);
    }
    setMobileMenuOpen(false);
  };

  const isDashboard = page === 'dashboard';

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl sm:text-2xl font-bold text-white cursor-pointer">
                    Outreach Engine™
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isDashboard && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-300 hover:text-emerald transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-emerald transition-colors">
                  How It Works
                </a>
              </div>
            </div>
          )}

          {/* Desktop User Info / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {!isDashboard && (
                  <a href="https://growthos.n3tworx.io/" className="text-gray-300 hover:text-emerald transition-colors font-medium">
                    Dashboard
                  </a>
                )}
                <span className="text-gray-300 truncate max-w-48">
                  Welcome, {user.firstName} {user.lastName}
                </span>
                <button 
                  onClick={handleSignOut}
                  className={`${isDashboard 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg font-medium' 
                    : 'text-gray-300 hover:text-emerald font-medium'
                  } transition-colors`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              !isDashboard && (
                <>
                  <button 
                    onClick={() => openAuthModal('signin')}
                    className="text-gray-300 hover:text-emerald transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="bg-emerald hover:bg-sage text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-emerald transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/90 backdrop-blur-md rounded-lg mt-2 border border-gray-700/50">
              {/* Mobile Navigation Links for Homepage */}
              {!isDashboard && (
                <>
                  <a 
                    href="#features" 
                    className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#how-it-works" 
                    className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                </>
              )}
              
              {/* Mobile Auth Section */}
              {user ? (
                <>
                  <div className={`${!isDashboard ? 'border-t border-gray-700 pt-3 mt-3' : ''}`}>
                    <div className="px-3 py-2">
                      <p className="text-gray-300 text-sm truncate">
                        Welcome, {user.firstName} {user.lastName}
                      </p>
                    </div>
                    {!isDashboard && (
                      <a 
                        href="https://growthos.n3tworx.io/" 
                        className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </a>
                    )}
                    {isDashboard && (
                      <Link 
                        href="/" 
                        className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                !isDashboard && (
                  <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                    <button 
                      onClick={() => openAuthModal('signin')}
                      className="text-gray-300 hover:text-emerald block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => openAuthModal('signup')}
                      className="bg-emerald hover:bg-sage text-white px-3 py-2 rounded-md font-medium transition-all duration-300 w-full text-left"
                    >
                      Get Started
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
