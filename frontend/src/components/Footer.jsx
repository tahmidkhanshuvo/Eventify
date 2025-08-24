import React, { useState } from "react";
import { Box, Container, Grid, Typography, IconButton, TextField, Button, styled } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const StyledFooter = styled(Box)(({ theme }) => ({
  background: "linear-gradient(145deg, #1a237e, #283593)",
  backdropFilter: "blur(10px)",
  color: "#ffffff",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  borderTop: "1px solid rgba(66, 165, 245, 0.2)",
  fontFamily: "'Sora', sans-serif",
}));

const FooterLink = styled(Typography)({
  cursor: "pointer",
  color: "#ffffff",
  transition: "all 0.3s ease",
  fontFamily: "'Sora', sans-serif",
  "&:hover": {
    color: "#42a5f5",
    textDecoration: "underline",
    transform: "translateY(-2px)",
  },
});

const SocialIcon = styled(IconButton)({
  color: "#ffffff",
  margin: "0 8px",
  transition: "transform 0.2s",
  fontFamily: "'Sora', sans-serif",
  "&:hover": {
    transform: "scale(1.3)",
    color: "#42a5f5",
  },
});

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with email:", email);
      setEmail("");
      alert("Thank you for subscribing to Eventify updates!");
    }
  };

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo, Info, and Newsletter Section */}
          <Grid item xs={12} md={6}>
            <Box mb={3} textAlign="left">
              <Box display="flex" alignItems="center" mb={2}>
                <Box 
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #42a5f5, #2962ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    mr: 2
                  }}
                >
                  E
                </Box>
                <Typography variant="h5" fontWeight="bold" color="white" fontFamily="'Sora', sans-serif">
                  Eventify
                </Typography>
              </Box>
              <Typography variant="body2" color="#e3f2fd" style={{ maxWidth: "300px" }} fontFamily="'Sora', sans-serif">
                Connecting university clubs and students through seamless event management and discovery.
              </Typography>

              {/* Newsletter Subscription */}
              <Box mt={4}>
                <Typography variant="h6" color="#42a5f5" gutterBottom fontFamily="'Sora', sans-serif">
                  Stay Updated
                </Typography>
                <form onSubmit={handleSubscribe}>
                  <Box display="flex" flexDirection="column" gap={2} sx={{ maxWidth: "300px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#42a5f5",
                          },
                          "&:hover fieldset": {
                            borderColor: "#42a5f5",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                          fontFamily: "'Sora', sans-serif",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#42a5f5",
                        color: "#ffffff",
                        fontFamily: "'Sora', sans-serif",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {/* Features Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom color="#42a5f5" fontFamily="'Sora', sans-serif">
                  Features
                </Typography>
                <FooterLink variant="body2" paragraph>Event Creation</FooterLink>
                <FooterLink variant="body2" paragraph>Event Discovery</FooterLink>
                <FooterLink variant="body2" paragraph>Registration Management</FooterLink>
                <FooterLink variant="body2" paragraph>Club Dashboards</FooterLink>
                <FooterLink variant="body2" paragraph>Notifications</FooterLink>
              </Grid>

              {/* Resources Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom color="#42a5f5" fontFamily="'Sora', sans-serif">
                  Resources
                </Typography>
                <FooterLink variant="body2" paragraph>Help Center</FooterLink>
                <FooterLink variant="body2" paragraph>Community Forums</FooterLink>
                <FooterLink variant="body2" paragraph>API Documentation</FooterLink>
                <FooterLink variant="body2" paragraph>FAQs</FooterLink>
                <FooterLink variant="body2" paragraph>Tutorials</FooterLink>
              </Grid>

              {/* Company Section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom color="#42a5f5" fontFamily="'Sora', sans-serif">
                  Company
                </Typography>
                <FooterLink variant="body2" paragraph>About Us</FooterLink>
                <FooterLink variant="body2" paragraph>Careers</FooterLink>
                <FooterLink variant="body2" paragraph>Contact Us</FooterLink>
                <FooterLink variant="body2" paragraph>Privacy Policy</FooterLink>
                <FooterLink variant="body2" paragraph>Terms of Service</FooterLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box mt={4} pt={4} borderTop={1} borderColor="rgba(255,255,255,0.1)">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="#e3f2fd" sx={{ mb: { xs: 2, md: 0 } }} fontFamily="'Sora', sans-serif">
                © 2023 Eventify. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }}>
                <SocialIcon aria-label="Facebook">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon aria-label="Twitter">
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon aria-label="Instagram">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon aria-label="LinkedIn">
                  <LinkedInIcon />
                </SocialIcon>
                <SocialIcon aria-label="GitHub">
                  <GitHubIcon />
                </SocialIcon>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;