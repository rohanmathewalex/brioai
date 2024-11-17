import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const SignupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({ name, email, password });
      setSuccess("Registration successful!");
      setError("");

      // Log the user in and redirect to the dashboard
      login({
        name: response.name,
        email: response.email,
        role: response.role,
      });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" },
          }}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link
            href="/login"
            sx={{ color: "#000", textDecoration: "underline" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;
