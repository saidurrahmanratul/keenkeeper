import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
      isActive ? 'bg-[#2d5a4e] text-white' : 'text-gray-600 hover:text-gray-900'
    }`;

  const links = [
    { to: '/', end: true, icon: <Home size={15} />, label: 'Home' },
    { to: '/timeline', icon: <Clock size={15} />, label: 'Timeline' },
    { to: '/stats', icon: <BarChart2 size={15} />, label: 'Stats' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src="/logo.png" alt="KeenKeeper" className="h-7" />
        </NavLink>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map(({ to, end, icon, label }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {icon}{label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded text-gray-600 hover:text-gray-900"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(({ to, end, icon, label }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
              {icon}{label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
