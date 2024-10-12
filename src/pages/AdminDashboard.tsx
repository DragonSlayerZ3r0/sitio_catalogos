import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, MapPin, Key } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Destination {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
      fetchDestinations();
      fetchRoles();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/destinations');
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="text-center mt-10">Access denied. Admin only.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
        <Shield className="mr-2" /> Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Users
          </h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.email} - {user.role}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2" /> Destinations
          </h2>
          <ul>
            {destinations.map((destination) => (
              <li key={destination.id} className="mb-2">
                {destination.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Key className="mr-2" /> Roles
          </h2>
          <ul>
            {roles.map((role) => (
              <li key={role.id} className="mb-2">
                {role.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;