import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const AdminProtection = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for auth to initialize
      if (loading) {
        return;
      }

      // If no user and not loading, redirect to login
      if (!user || !user.uid) {
        console.log('No authenticated user found, redirecting to login');
        router.replace('/admin/login');
        return;
      }

      // User is authenticated
      setIsChecking(false);
    };

    checkAuth();
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If we get here, user is authenticated
  return children;
};

export default AdminProtection;
