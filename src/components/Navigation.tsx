import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  onLoginClick: () => void;
  onSignUpClick: () => void; // ✅ added
}

export default function Navigation({ onLoginClick, onSignUpClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl text-teal-600 tracking-tight">MindCare</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-700 hover:text-teal-600 px-3 py-2 transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 px-3 py-2 transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-teal-600 px-3 py-2 transition-colors">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-teal-600"
              onClick={onLoginClick}
            >
              Login
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={onSignUpClick} // ✅ triggers signup
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#home" className="text-gray-700 hover:text-teal-600 block px-3 py-2 transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 block px-3 py-2 transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-teal-600 block px-3 py-2 transition-colors">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 block px-3 py-2 transition-colors">
                Contact
              </a>
              <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-gray-700 hover:text-teal-600"
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    onSignUpClick(); // ✅ triggers signup page
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
