import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import EditIcon from "@mui/icons-material/Edit";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TranslateIcon from "@mui/icons-material/Translate";
import UpgradeIcon from "@mui/icons-material/Upgrade";
 
import summarizeImage from "../assets/images/summarize_content.png";
import rewriteImage from "../assets/images/rewrite_content.png";
import generatePromptsImage from "../assets/images/generate_prompts.png";
import translateImage from "../assets/images/translate_content.png";

const Dashboard: React.FC = () => {
  // const { user } = useAuth();

  const features = [
    { title: "Summarize Content", image: summarizeImage, link: "/summarize" },
    { title: "Rewrite Content", image: rewriteImage, link: "/rewrite" },
    {
      title: "Generate Prompts",
      image: generatePromptsImage,
      link: "/generate-prompts",
    },
    { title: "Translate Content", image: translateImage, link: "/translate" },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          minWidth: "280px",
          maxWidth: "320px",
          backgroundColor: "#f8f9fa",
          padding: 3,
          borderRight: "1px solid #e0e0e0",
          borderRadius: 1,
          height: "calc(100vh - 32px)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#444" }}
        >
          BrioAI
        </Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ color: "#666" }}>
          Free Plan
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/summarize"
              sx={{ color: "#444", "&:hover": { backgroundColor: "#e9ecef" } }}
            >
              <ListItemIcon sx={{ color: "#444" }}>
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary="Summarize Content" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/rewrite"
              sx={{ color: "#444", "&:hover": { backgroundColor: "#e9ecef" } }}
            >
              <ListItemIcon sx={{ color: "#444" }}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Rewrite Content" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/generate-prompts"
              sx={{ color: "#444", "&:hover": { backgroundColor: "#e9ecef" } }}
            >
              <ListItemIcon sx={{ color: "#444" }}>
                <LightbulbIcon />
              </ListItemIcon>
              <ListItemText primary="Generate Prompts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/translate"
              sx={{ color: "#444", "&:hover": { backgroundColor: "#e9ecef" } }}
            >
              <ListItemIcon sx={{ color: "#444" }}>
                <TranslateIcon />
              </ListItemIcon>
              <ListItemText primary="Translate Content" />
            </ListItemButton>
          </ListItem>
        </List>
        <Button
          variant="contained"
          sx={{
            mt: "auto",
            backgroundColor: "#343a40",
            color: "white", // Ensure text is white
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#495057",
            },
          }}
          startIcon={<UpgradeIcon />}
        >
          Upgrade to Pro
        </Button>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, paddingLeft: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dashboard
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            "Content Summarization",
            "Content Rewriting",
            "Dynamic Prompt Generation",
            "Multilingual Translation",
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Typography variant="h5" sx={{ color: "#343a40" }}>
                  10
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {stat}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions Section */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    src={feature.image}
                    sx={{ width: "100%", height: 140, mb: 2, borderRadius: 1 }}
                    variant="rounded"
                  />
                  <Typography variant="h6" sx={{ color: "#343a40" }}>
                    {feature.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      color: "white", // White text color for buttons in quick actions
                      backgroundColor: "#343a40", // Background color for better contrast
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#495057",
                      },
                    }}
                    href={feature.link}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
