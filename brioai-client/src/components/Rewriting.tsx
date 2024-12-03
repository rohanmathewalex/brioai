import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const WritingAndRewriting: React.FC = () => {
  const [mode, setMode] = useState<string>("rewrite"); // Options: "write" or "rewrite"
  const [inputText, setInputText] = useState<string>(""); // Input text
  const [rewrittenText, setRewrittenText] = useState<string>(""); // Output text
  const [context, setContext] = useState<string>(""); // Context for write
  const [tone, setTone] = useState<string>("neutral");
  const [format, setFormat] = useState<string>("plain-text");
  const [length, setLength] = useState<string>("medium");
  const [loading, setLoading] = useState<boolean>(false);
  const [writer, setWriter] = useState<any>(null); // Writer instance
  const [rewriter, setRewriter] = useState<any>(null); // Rewriter instance

  // Initialize APIs
  useEffect(() => {
    const initializeAPIs = async () => {
      try {
        const writerInstance = await (window as any).ai.writer.create();
        const rewriterInstance = await (window as any).ai.rewriter.create();
        setWriter(writerInstance);
        setRewriter(rewriterInstance);
      } catch (error) {
        console.error("Error initializing APIs:", error);
        alert("Failed to initialize Writer and Rewriter APIs. Please check your setup.");
      }
    };
    initializeAPIs();
  }, []);

  const handleAction = async () => {
    if (!inputText.trim()) {
      alert(mode === "write" ? "Please enter a writing task." : "Please enter text to rewrite.");
      return;
    }

    if ((mode === "write" && !writer) || (mode === "rewrite" && !rewriter)) {
      alert(`${mode === "write" ? "Writer" : "Rewriter"} API is not ready. Please try again later.`);
      return;
    }

    setLoading(true);
    try {
      let result;
      if (mode === "write") {
        // Call Writer API
        result = await writer.write(inputText, {
          context: context || undefined,
          tone,
          format,
          length,
        });
      } else {
        // Call Rewriter API (Minimal Parameters)
        result = await rewriter.rewrite(inputText);
      }

      setRewrittenText(result);
    } catch (error: any) {
      console.error("Action Error:", error);
      alert(
        `Failed to ${
          mode === "write" ? "write" : "rewrite"
        } the text. Error: ${error.message || "Unknown error occurred."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Go Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={() => window.history.back()}
          sx={{
            backgroundColor: "#f1f3f5",
            color: "#343a40",
            "&:hover": { backgroundColor: "#e9ecef" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 2, color: "#343a40", fontWeight: "bold" }}>
          Go Back
        </Typography>
      </Box>

      {/* Heading */}
      <Typography variant="h4" gutterBottom>
        Content Writing and Rewriting
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Choose between creating new content or rewriting existing text with improved clarity, tone, and length.
      </Typography>

      {/* Mode Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="mode-label">Select Mode</InputLabel>
        <Select
          labelId="mode-label"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value="write">Write</MenuItem>
          <MenuItem value="rewrite">Rewrite</MenuItem>
        </Select>
      </FormControl>

      {/* Input Text */}
      <TextField
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        placeholder={
          mode === "write"
            ? "Enter a task for writing (e.g., Write an enquiry email about a product)"
            : "Enter the text you'd like rewritten"
        }
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Context */}
      {mode === "write" && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter context (e.g., I'm a long-standing customer)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          sx={{ mb: 3 }}
        />
      )}

      {/* Options: Tone, Format, Length */}
      {mode === "write" && (
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="tone-label">Tone</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="format-label">Format</InputLabel>
            <Select
              labelId="format-label"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <MenuItem value="plain-text">Plain Text</MenuItem>
              <MenuItem value="markdown">Markdown</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="length-label">Length</InputLabel>
            <Select
              labelId="length-label"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <MenuItem value="short">Short</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="long">Long</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAction}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : mode === "write" ? "Write" : "Rewrite"}
      </Button>

      {/* Rewritten/Generated Text */}
      {rewrittenText && (
        <Card sx={{ mt: 3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {mode === "write" ? "Generated Content" : "Rewritten Text"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", mb: 2, color: "#495057" }}
            >
              {rewrittenText}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WritingAndRewriting;
