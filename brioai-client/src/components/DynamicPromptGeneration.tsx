import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Define a type for grouped prompts
interface PromptGroup {
  heading: string;
  prompts: string[];
}

const DynamicPromptGeneration: React.FC = () => {
  const [context, setContext] = useState<string>(""); // Context input
  const [useCase, setUseCase] = useState<string>(""); // Selected use case
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [structuredPrompts, setStructuredPrompts] = useState<PromptGroup[]>([]); // Grouped prompts

  // Function to handle prompt generation
  const handleGeneratePrompts = async () => {
    if (!context.trim() || !useCase.trim()) {
      alert("Please provide a context and select a use case.");
      return;
    }

    setLoading(true);

    try {
      // Check if AI capabilities are available
      const capabilities = await (window as any).ai.languageModel.capabilities();
      if (capabilities.available !== "readily") {
        alert("The language model is not readily available.");
        setLoading(false);
        return;
      }

      // Create a new session with the AI model
      const session = await (window as any).ai.languageModel.create();

      // Send a prompt to the model
      const promptText = `Generate prompts for the use case "${useCase}" in the context: "${context}"`;
      const result: string = await session.prompt(promptText);

      // Process the response and structure prompts
      const prompts = result.split("\n").reduce<PromptGroup[]>(
        (acc: PromptGroup[], line: string) => {
          if (line.startsWith("**")) {
            acc.push({ heading: line.replace("**", "").trim(), prompts: [] });
          } else if (acc.length > 0 && line.trim()) {
            acc[acc.length - 1].prompts.push(line.trim());
          }
          return acc;
        },
        []
      );

      setStructuredPrompts(prompts);
    } catch (error) {
      console.error("Error generating prompts:", error);
      alert("Failed to generate prompts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to copy a prompt to the clipboard
  const handleCopyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    alert("Copied to clipboard!");
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
        Dynamic Prompt Generation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Get context-based prompts for various use cases. Write a description of the context you're
        in, and select a use case to generate prompts.
      </Typography>

      {/* Context Input */}
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Context"
        placeholder="Write a description of the context you're in."
        value={context}
        onChange={(e) => setContext(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Use Case Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="use-case-label">Use Case</InputLabel>
        <Select
          labelId="use-case-label"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <MenuItem value="feedback_email">Feedback Email</MenuItem>
          <MenuItem value="invitation_email">Invitation Email</MenuItem>
          <MenuItem value="announcement_email">Announcement Email</MenuItem>
          <MenuItem value="product_review">Product Review</MenuItem>
        </Select>
      </FormControl>

      {/* Generate Prompts Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGeneratePrompts}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : "Generate Prompts"}
      </Button>

      {/* Suggested Prompts */}
      {structuredPrompts.length > 0 && (
        <Box>
          {structuredPrompts.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {group.heading}
              </Typography>
              {group.prompts.map((prompt, promptIndex) => (
                <Card key={promptIndex} sx={{ mb: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {prompt}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleCopyToClipboard(prompt)}
                    >
                      Copy to Clipboard
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default DynamicPromptGeneration;
