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
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      login({
        name: response.name,
        email: response.email,
        role: response.role,
      });
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
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
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
          Login
        </Button>
        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link
            href="/signup"
            sx={{ color: "#000", textDecoration: "underline" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
