import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';

const Summarize = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [savedSummaries, setSavedSummaries] = useState(() => {
    const saved = localStorage.getItem('savedSummaries');
    return saved ? JSON.parse(saved) : [];
  });
  const [summaryName, setSummaryName] = useState('');
  const navigate = useNavigate();

  const handleSummarize = async () => {
    try {
      const summarizer = await ai.summarizer.create();
      const result = await summarizer.summarize(text);
      setSummary(result);
    } catch (error) {
      console.error('Error during summarization:', error);
    }
  };

  const handleSaveSummary = () => {
    if (summary && summaryName) {
      const newSummary = { name: summaryName, text: summary };
      const updatedSummaries = [...savedSummaries, newSummary];
      setSavedSummaries(updatedSummaries);
      localStorage.setItem('savedSummaries', JSON.stringify(updatedSummaries));
      setSummaryName(''); // Reset the name input
    }
  };

  const handleCopyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    alert('Copied to clipboard!');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Go Back Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: '#f1f3f5',
            color: '#343a40',
            '&:hover': {
              backgroundColor: '#e9ecef',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 2, color: '#343a40', fontWeight: 'bold' }}>
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
          '& .MuiOutlinedInput-root': {
            padding: 2,
            '&:hover fieldset': {
              borderColor: '#495057',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007bff',
            },
          },
          '& textarea': {
            overflow: 'auto',
            resize: 'none',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSummarize}
        sx={{ mb: 3 }}
      >
        Summarize
      </Button>
      {summary && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Here’s your summary:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
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
              textTransform: 'none',
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
          {savedSummaries.map((saved, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {saved.name}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
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
                      textTransform: 'none',
                      color: '#495057',
                      '&:hover': {
                        backgroundColor: '#e9ecef',
                      },
                    }}
                  >
                    Copy to Clipboard
                  </Button>
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
