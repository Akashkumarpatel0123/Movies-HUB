import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

const AuthPage = () => {
  const { type } = useParams()
  const { user, login, signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = async (credentials) => {
    try {
      setError('')
      let result
      
      if (type === 'login') {
        result = await login(credentials)
      } else if (type === 'signup') {
        result = await signup(credentials)
      }

      if (!result.success) {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <AuthForm 
          type={type} 
          onSubmit={handleSubmit}
        />

        <div className="text-center">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/auth/signup')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/auth/login')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage