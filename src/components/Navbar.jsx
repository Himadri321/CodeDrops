import { useState } from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { ScrollText, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ScrollText className="text-blue-400" size={24} />
          <span className="text-white font-semibold text-xl">CodeDrops</span>
        </div>

        {/* Center - NavLinks */}
        <div className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 gap-6 text-lg">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500  font-semibold border-b-2 border-blue-500 pb-[2px]"
                  : "text-white hover:text-blue-400 transition-colors duration-300"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        {/* Right - Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 px-4 py-3 space-y-2">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-400 font-semibold"
                  : "block text-white hover:text-blue-400 transition duration-200"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
