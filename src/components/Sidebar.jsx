import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, BarChart2, ChevronLeft, ChevronRight, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // tailwind 'sm' breakpoint
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-close sidebar on route change in mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
        ${isMobile ? "bg-slate-900" : "bg-slate-800"}
        text-white p-4 shadow-lg
      `}
    >
      {/* Top Toggle/Close Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={toggleSidebar}
          className="text-slate-300 hover:text-white"
        >
          {isMobile && isOpen ? <X size={20} /> : isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        <SidebarLink to="/" icon={<Home size={18} />} label="Dashboard" isOpen={isOpen} />
        <SidebarLink to="/query-interface" icon={<Search size={18} />} label="Query Interface" isOpen={isOpen} />
        <SidebarLink to="/query-history" icon={<BarChart2 size={18} />} label="Query History" isOpen={isOpen} />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, isOpen }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
