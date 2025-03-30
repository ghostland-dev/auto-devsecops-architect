
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">DevSecOps Generator</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/configurator" className={isActive("/configurator")}>Configurateur</Link>
            <Link to="/documentation" className={isActive("/documentation")}>Documentation</Link>
            <Link to="/pricing" className={isActive("/pricing")}>Tarifs</Link>
            <Link to="/blog" className={isActive("/blog")}>Blog</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-slate-300">
              Connexion
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Essayer Gratuitement
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-slate-700 hover:text-indigo-600" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              <Link to="/configurator" className={`py-2 ${isActive("/configurator")}`}>Configurateur</Link>
              <Link to="/documentation" className={`py-2 ${isActive("/documentation")}`}>Documentation</Link>
              <Link to="/pricing" className={`py-2 ${isActive("/pricing")}`}>Tarifs</Link>
              <Link to="/blog" className={`py-2 ${isActive("/blog")}`}>Blog</Link>
              <div className="pt-3 space-y-2">
                <Button variant="outline" className="w-full border-slate-300">
                  Connexion
                </Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Essayer Gratuitement
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
