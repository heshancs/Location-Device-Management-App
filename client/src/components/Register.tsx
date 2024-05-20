import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from '../AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });

      // Assuming the JWT token is in response.data.token
    //   const token = response.data.token;

      login(response.data.user);
      setSuccess("Registration successful!");
      localStorage.setItem("token",response.data.token)
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ maxWidth: 400, margin: "auto", marginTop: "100px" }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <Button
        variant="contained"
        onClick={handleRegister}
        sx={{ marginTop: 2 }}
      >
        Register
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
