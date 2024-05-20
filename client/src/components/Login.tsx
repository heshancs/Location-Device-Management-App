import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error message

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/login`, {
        email,
        password,
      });

      // Assuming the JWT token is in response.data.token
      login(response.data.user);
      localStorage.setItem("token", response.data.token);

      // Navigate to home page on successful login
      navigate('/');
    } catch (e) {
      setError("Login failed. Please try again.");
      console.log(e);
    }
  };

  return (
    <Box bgcolor={"background.default"} color={"text.primary"} sx={{ maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && ( // Conditionally render error message
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin} sx={{ marginTop: 2 }}>
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
};

export default Login;
