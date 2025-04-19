import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthStatus } from './components/AuthStatus';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="p-4">
                  <AuthStatus />
                  {/* Your protected content here */}
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
