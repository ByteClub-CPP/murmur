import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthStatus } from './components/AuthStatus';
import { LogoutButton } from './components/LogoutButton';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirect root to signin */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <AuthStatus />
                    <LogoutButton />
                  </div>
                  {/* Your other dashboard content */}
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
