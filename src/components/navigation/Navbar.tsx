import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Sparkles, 
  ShieldCheck,
  Info,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COMPANY_CONFIG } from '../../data/company';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 shadow-md">
        {/* Prototype Banner */}
        <div className="bg-gradient-to-r from-orange-950/40 via-blue-950/50 to-orange-950/40 text-orange-200 text-xs py-1.5 px-4 text-center border-b border-orange-500/20 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
          <span>
            <strong>Interactive Prototype:</strong> Localized feasibility evaluation, deterministic pricing estimations, and mock appointment system.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Wordmark - NaveenSolutions (Orange & Blue) */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform p-0.5">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-base bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                    NS
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors flex items-center">
                  <span>Naveen</span>
                  <span className="text-blue-400">Solutions</span>
                </div>
                <span className="text-[10px] text-orange-300/80 font-medium -mt-1 tracking-wider uppercase">
                  Engineering Labs
                </span>
              </div>
            </Link>

            {/* Right side corner controls: Contact Icon, Login / Dashboard */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Contact Sales Icon */}
              <Link
                to="/contact-sales"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-blue-400 text-xs font-medium transition-colors"
                title="Contact Solutions Desk"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Contact</span>
              </Link>

              {/* Login or User Status */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 text-xs hover:bg-slate-800 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
                    <span>Dashboard</span>
                  </Link>
                  <div className="text-right hidden lg:block">
                    <div className="text-xs font-semibold text-white">{user?.fullName}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[110px]">{user?.companyName}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="pl-2 border-l border-slate-800">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-800"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/contact-sales"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Contact Solutions Desk</span>
            </Link>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-200 bg-slate-800/80 font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4 text-orange-400" />
                    <span>Dashboard ({user?.fullName})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:bg-slate-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-2 rounded-lg text-slate-300 border border-slate-700 hover:bg-slate-800 text-sm font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
