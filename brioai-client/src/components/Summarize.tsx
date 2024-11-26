import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

interface SavedSummary {
  name: string;
  text: string;
}

const Summarize: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [savedSummaries, setSavedSummaries] = useState<SavedSummary[]>(() => {
    const saved = localStorage.getItem("savedSummaries");
    return saved ? JSON.parse(saved) : [];
  });
  const [summaryName, setSummaryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const ai = (window as any).ai; // Replace this with actual Summarizer API setup if needed
  const [summarizer, setSummarizer] = useState<any>(null);

  useEffect(() => {
    // Create summarizer instance only once
    const initializeSummarizer = async () => {
      try {
        const instance = await ai.summarizer.create();
        setSummarizer(instance);
      } catch (error) {
        console.error("Error initializing summarizer:", error);
      }
    };
    initializeSummarizer();
  }, []);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }
    if (!summarizer) {
      alert("Summarizer is not ready. Please try again later.");
      return;
    }
    setLoading(true); // Show loading spinner
    try {
      const result = await summarizer.summarize(text);
      setSummary(result);
    } catch (error) {
      console.error("Error during summarization:", error);
      alert("Failed to summarize the text. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleSaveSummary = () => {
    if (summary && summaryName) {
      const newSummary: SavedSummary = { name: summaryName, text: summary };
      const updatedSummaries = [...savedSummaries, newSummary];
      setSavedSummaries(updatedSummaries);
      localStorage.setItem("savedSummaries", JSON.stringify(updatedSummaries));
      setSummaryName(""); // Reset the name input
      setSummary(""); // Clear the summary text
      setText(""); // Clear the text input
    } else {
      alert("Please provide a name for the summary before saving.");
    }
  };

  const handleCopyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard!");
  };

  const handleDeleteSummary = (index: number) => {
    const updatedSummaries = savedSummaries.filter((_, i) => i !== index);
    setSavedSummaries(updatedSummaries);
    localStorage.setItem("savedSummaries", JSON.stringify(updatedSummaries));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Go Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={() => navigate("/dashboard")}
          sx={{
            backgroundColor: "#f1f3f5",
            color: "#343a40",
            "&:hover": {
              backgroundColor: "#e9ecef",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{ ml: 2, color: "#343a40", fontWeight: "bold" }}
        >
          Go Back to Dashboard
        </Typography>
      </Box>

      {/* Summarization Content */}
      <Typography variant="h4" gutterBottom>
        Summarize your content
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Get concise, clear summaries of any text.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        placeholder="Type or paste your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            padding: 2,
            "&:hover fieldset": {
              borderColor: "#495057",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#007bff",
            },
          },
          "& textarea": {
            overflow: "auto",
            resize: "none",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSummarize}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : "Summarize"}
      </Button>
      {summary && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Here’s your summary:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
            {summary}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter a name for this summary"
            value={summaryName}
            onChange={(e) => setSummaryName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveSummary}
            sx={{
              textTransform: "none",
              mt: 2,
            }}
          >
            Save Summary
          </Button>
        </Box>
      )}

      {/* Saved Summaries Section */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Saved Summaries
      </Typography>
      {savedSummaries.length > 0 ? (
        <Grid container spacing={3}>
          {savedSummaries.map((saved: SavedSummary, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {saved.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap", mb: 2 }}
                  >
                    {saved.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleCopyToClipboard(saved.text)}
                    startIcon={<ContentCopyIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#495057",
                      "&:hover": {
                        backgroundColor: "#e9ecef",
                      },
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                  <IconButton
                    onClick={() => handleDeleteSummary(index)}
                    sx={{
                      color: "#ff1744",
                      "&:hover": {
                        backgroundColor: "#ffebee",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No saved summaries yet.
        </Typography>
      )}
    </Container>
  );
};

export default Summarize;
