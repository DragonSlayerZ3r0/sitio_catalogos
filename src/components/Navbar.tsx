import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">TravelCatalog</Link>
        <div className="space-x-4">
          <Link to="/destinations" className="hover:text-blue-200">Destinations</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="hover:text-blue-200">Admin</Link>}
              <button onClick={logout} className="hover:text-blue-200 flex items-center">
                <LogOut size={18} className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-200 flex items-center">
              <User size={18} className="mr-1" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;