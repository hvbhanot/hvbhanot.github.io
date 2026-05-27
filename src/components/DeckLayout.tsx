import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, User, FolderOpen, FlaskConical, Mail, Home as HomeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/resume';

interface DeckLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'OVERVIEW', href: '/', icon: HomeIcon },
  { label: 'PERSONNEL', href: '/about', icon: User },
  { label: 'PROJECTS', href: '/projects', icon: FolderOpen },
  { label: 'RESEARCH', href: '/research', icon: FlaskConical },
  { label: 'COMMS', href: '/contact', icon: Mail },
];

export default function DeckLayout({ children }: DeckLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e8f0ff] flex flex-col">
      {/* Top System Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-[#1f2a3f] bg-[#05070a]/95 backdrop-blur-md flex items-center px-4 text-xs font-mono tracking-[0.12em]">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00eaff] animate-pulse" />
            <span className="font-semibold text-[#00eaff]">HVB.SIGNAL</span>
          </div>
          <div className="hidden sm:block text-[#4a5a70]">// RESEARCH OPERATIONS TERMINAL</div>
        </div>

        <div className="flex items-center gap-4 text-[#8a9ab0]">
          <div className="hidden md:block">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="hidden sm:block">CLEARANCE: LEVEL 4</div>
          <div className="text-[#00eaff]">{profile.shortName.split(' ')[0].toUpperCase()}</div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ml-4 p-2 text-[#8a9ab0] lg:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="flex flex-1 pt-12">
        {/* Left Sidebar Navigation */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed lg:sticky top-12 left-0 z-40 h-[calc(100vh-3rem)] w-60 border-r border-[#1f2a3f] bg-[#05070a] p-4 lg:translate-x-0"
            >
          <div className="mb-6 px-3 pt-4">
            <div className="text-[10px] tracking-[0.2em] text-[#4a5a70]">SYSTEM MODULES</div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded ${
                    isActive
                      ? 'bg-[#0f141f] text-[#00eaff] border-l-2 border-[#00eaff]'
                      : 'text-[#8a9ab0] hover:text-[#e8f0ff] hover:bg-[#0b0f17]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-4 right-4 border-t border-[#1f2a3f] pt-4 text-[10px] text-[#4a5a70]">
            v4.2.6 — STABLE
          </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 lg:pl-60">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>

      {/* JARVIS-style Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-9 border-t border-[#1f2a3f] bg-[#05070a]/95 backdrop-blur-md text-[10px] font-mono tracking-[0.1em] text-[#4a5a70] flex items-center px-4 lg:pl-[calc(15rem+1rem)]">
        <div className="flex items-center gap-6 w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#00eaff]">●</span> 
            <span>SYSTEM NOMINAL</span>
          </div>
          <div className="hidden sm:block">LAST SYNC: JUST NOW</div>
          <div className="hidden md:block">LOCATION: {profile.location}</div>
          <div className="flex-1" />
          <div className="hidden lg:block text-right">
            HVB.SIGNAL v4.2.6 — RESEARCH OPS TERMINAL
          </div>
        </div>
      </div>
    </div>
  );
}
