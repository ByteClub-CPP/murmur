import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthStatus } from './components/AuthStatus';
import { LogoutButton } from './components/LogoutButton';
import { useEffect, useState } from 'react';
import { addCaregiverProfile, getCaregiverProfiles, updateCaregiverProfile, deleteCaregiverProfile } from './config/firestoreServices';

function App() {
  const [data, setData] = useState<any[]>([]); // State to store Firestore data
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch caregiver profiles from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const profiles = await getCaregiverProfiles(); // Fetch all caregiver profiles
      setData(profiles);
    } catch (error) {
      console.error('Error fetching caregiver profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new caregiver profile
  const handleAdd = async () => {
    try {
      const newProfile = {
        caregiverName: 'New Caregiver',
        childName: 'New Child',
        childAgeRange: '5-7',
        diagnoses: ['Diagnosis 1'],
        communicationStyle: 'Verbal',
        language: 'English',
      }; // Example data
      await addCaregiverProfile(newProfile);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding caregiver profile:', error);
    }
  };

  // Update an existing caregiver profile
  const handleUpdate = async (id: string) => {
    try {
      const updatedProfile = {
        caregiverName: 'Updated Caregiver',
        childName: 'Updated Child',
        childAgeRange: '8-10',
        diagnoses: ['Updated Diagnosis'],
        communicationStyle: 'Non-verbal',
        language: 'Spanish',
      }; // Example data
      await updateCaregiverProfile(id, updatedProfile);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating caregiver profile:', error);
    }
  };

  // Delete a caregiver profile
  const handleDelete = async (id: string) => {
    try {
      await deleteCaregiverProfile(id);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting caregiver profile:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

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
                  <AuthStatus />
                  <h1>Firestore CRUD Operations</h1>
                  <button onClick={handleAdd}>Add Caregiver Profile</button>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <ul>
                      {data.map((item) => (
                        <li key={item.id}>
                          {JSON.stringify(item)}
                          <button onClick={() => handleUpdate(item.id)}>Update</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  )}
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