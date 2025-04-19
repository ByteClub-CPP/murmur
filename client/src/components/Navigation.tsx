import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const Navigation = () => {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Murmur
        </Link>
        <div className="space-x-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};