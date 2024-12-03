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
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MultilingualTranslation: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [sourceLang, setSourceLang] = useState<string>("auto");
  const [targetLang, setTargetLang] = useState<string>("en");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const supportedLanguages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
  ];

  const handleDetectLanguage = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to detect the language.");
      return;
    }

    setLoading(true);
    try {
      const detector = await (window as any).translation.createDetector();
      const results = await detector.detect(inputText);

      if (results.length > 0) {
        setDetectedLanguage(results[0].detectedLanguage || "Unknown");
        setConfidence(results[0].confidence || 0);
      } else {
        setDetectedLanguage("Unknown");
        setConfidence(null);
      }
    } catch (error) {
      console.error("Language detection error:", error);
      alert("Failed to detect the language. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert("Please enter text to translate.");
      return;
    }
  
    if (!targetLang) {
      alert("Please select a target language.");
      return;
    }
  
    setLoading(true);
    try {
      const canTranslate = await (window as any).translation.canTranslate?.();
      if (!canTranslate || canTranslate === "no") {
        alert("Translation API is not available in your environment.");
        setTranslatedText("Translation is not supported in this setup.");
        setLoading(false);
        return;
      }
  
      if (canTranslate === "after-download") {
        alert("Translation resources are still downloading. Please wait.");
        setTranslatedText("Translation resources are downloading. Try again later.");
        setLoading(false);
        return;
      }
  
      const session = await (window as any).translation.createSession();
      const translationResult = await session.translate(inputText, {
        from: sourceLang === "auto" ? undefined : sourceLang,
        to: targetLang,
      });
  
      setTranslatedText(translationResult || "Translation failed.");
    } catch (error) {
      console.error("Translation error:", error);
      alert("Failed to translate the text. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
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

      <Typography variant="h4" gutterBottom>
        Multilingual Translation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Translate text between multiple languages or detect the language of your input text.
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Enter text to translate or detect"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleDetectLanguage}
        disabled={loading}
        sx={{ mb: 3, mr: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Detect Language"}
      </Button>
      {detectedLanguage && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          Detected Language: <strong>{detectedLanguage}</strong> (Confidence:{" "}
          {confidence ? `${(confidence * 100).toFixed(2)}%` : "N/A"}).
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="source-lang-label">Translate From</InputLabel>
          <Select
            labelId="source-lang-label"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <MenuItem value="auto">Auto Detect</MenuItem>
            {supportedLanguages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="target-lang-label">Translate To</InputLabel>
          <Select
            labelId="target-lang-label"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {supportedLanguages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleTranslate}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : "Translate"}
      </Button>

      {translatedText && (
        <Card>
          <CardContent>
            <Typography variant="h6">Translation Result</Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", mt: 2, color: "#495057" }}
            >
              {translatedText}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default MultilingualTranslation;
