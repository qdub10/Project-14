import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthService from "../utils/auth"; // Corrected import for AuthService
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      const data = await login(loginData); // Call the login API
      console.log('Login successful, token:', data.token); // Debug log
      AuthService.login(data.token); // Store token and manage session
      navigate('/'); // Redirect to the Kanban board page
    } catch (err) {
      if (err instanceof Error) {
        console.error('Failed to login:', err.message); // Log detailed error
        setError(err.message); // Display error message
      } else {
        console.error('Failed to login:', err); // Log detailed error
        setError('Login failed'); // Display error message
      }
      setError(err instanceof Error ? err.message : 'Login failed'); // Display error message
    }
  };
  

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ''}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ''}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Login;
