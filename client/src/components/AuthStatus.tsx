import { useAuthContext } from '../auth/AuthContext'

export const AuthStatus = () => {
  const { user, loading, error } = useAuthContext()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {user ? (
        <p>Logged in as: {user.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}