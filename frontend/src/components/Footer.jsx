import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  styled,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const PRIMARY = "#3fc3b1";
const SECONDARY = "#7d9dd2";

/* ===== Wrapper (dark + glassmorphism) ===== */
const StyledFooter = styled(Box)(() => ({
  position: "relative",
  color: "#fff",
  padding: "40px 0 22px",
  background: "linear-gradient(180deg, rgba(7,10,18,0.95), rgba(7,10,18,0.98))",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  fontFamily: "'Sora', sans-serif",
}));

/* Links */
const FooterLink = styled(Typography)(() => ({
  cursor: "pointer",
  color: "rgba(255,255,255,0.85)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
  marginBottom: 10, // comfortable gap between links
  transition: "all 0.25s ease",
  "&:hover": {
    color: "#fff",
    transform: "translateY(-1px)",
  },
  fontFamily: "'Sora', sans-serif",
}));

/* Socials */
const SocialIcon = styled(IconButton)(() => ({
  color: "#fff",
  margin: "0 6px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  transition: "transform 180ms ease, background 180ms ease, border 180ms ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${SECONDARY}22, ${PRIMARY}22)`,
    transform: "translateY(-2px) scale(1.05)",
    border: "1px solid rgba(255,255,255,0.25)",
  },
}));

/* Compact glass input */
const GlassInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: 38,
    borderRadius: 10,
    fontSize: "0.9rem",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontFamily: "'Sora', sans-serif",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.15)",
    },
    "&:hover fieldset": {
      borderColor: PRIMARY,
    },
    "&.Mui-focused fieldset": {
      borderColor: PRIMARY,
      boxShadow: `0 0 0 2px ${PRIMARY}33`,
    },
    "& input": {
      color: "#fff",
      fontFamily: "'Sora', sans-serif",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Sora', sans-serif",
  },
}));

/* Subscribe button (gradient + subtle lift) */
const SubscribeBtn = styled("button")(() => ({
  padding: "8px 14px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: "0.9rem",
  background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
  border: "none",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.25s ease",
  fontFamily: "'Sora', sans-serif",
  "&:hover": {
    color: "#000",
    transform: "translateY(-1px)",
  },
}));

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  return (
    <StyledFooter>
      <Container maxWidth="lg" sx={{ fontFamily: "'Sora', sans-serif" }}>
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ fontFamily: "'Sora', sans-serif" }}
        >
          {/* LEFT: Brand image + description + newsletter */}
          <Grid item xs={12} md={5}>
            <Box mb={2} display="flex" alignItems="center">
              {/* Replace letter mark with your image */}
              <Box
                component="img"
                src="https://ik.imagekit.io/qlaegzdb2/Eventify.png?updatedAt=1756037096246"
                alt="Eventify"
                sx={{
                  height: 36,
                  width: "auto",
                  mr: 1.5,
                  borderRadius: 1.5,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                maxWidth: 300,
                color: "rgba(255,255,255,0.75)",
                mb: 2,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Connecting university clubs and students through seamless event
              management and discovery.
            </Typography>

            {/* Newsletter */}
            <Box component="form" onSubmit={handleSubscribe}>
              <Box display="flex" gap={1.2} flexWrap="wrap">
                <GlassInput
                  size="small"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SubscribeBtn type="submit">Subscribe</SubscribeBtn>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: Columns pinned to the right with ample gap */}
          <Grid item xs={12} md={7} sx={{ ml: "auto" }}>
            <Grid
              container
              justifyContent="flex-end"
              columnSpacing={8}     // bigger gap between columns
              rowSpacing={0}
              wrap="nowrap"         // keep them side-by-side
              sx={{ fontFamily: "'Sora', sans-serif" }}
            >
              <Grid item xs={4} sx={{ minWidth: 180 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: SECONDARY,
                    fontWeight: 700,
                    mb: 1.2,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  Features
                </Typography>
                <FooterLink>Event Creation</FooterLink>
                <FooterLink>Event Discovery</FooterLink>
                <FooterLink>Registration</FooterLink>
                <FooterLink>Dashboards</FooterLink>
                <FooterLink>Notifications</FooterLink>
              </Grid>

              <Grid item xs={4} sx={{ minWidth: 180 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: SECONDARY,
                    fontWeight: 700,
                    mb: 1.2,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  Resources
                </Typography>
                <FooterLink>Help Center</FooterLink>
                <FooterLink>Community</FooterLink>
                <FooterLink>API Docs</FooterLink>
                <FooterLink>FAQs</FooterLink>
                <FooterLink>Tutorials</FooterLink>
              </Grid>

              <Grid item xs={4} sx={{ minWidth: 180 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: SECONDARY,
                    fontWeight: 700,
                    mb: 1.2,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  Company
                </Typography>
                <FooterLink>About Us</FooterLink>
                <FooterLink>Careers</FooterLink>
                <FooterLink>Contact</FooterLink>
                <FooterLink>Privacy</FooterLink>
                <FooterLink>Terms</FooterLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box
          mt={4}
          pt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          borderTop="1px solid rgba(255,255,255,0.1)"
          sx={{ fontFamily: "'Sora', sans-serif" }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Sora', sans-serif" }}
          >
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </Typography>
          <Box>
            <SocialIcon aria-label="Facebook"><FacebookIcon /></SocialIcon>
            <SocialIcon aria-label="Twitter"><TwitterIcon /></SocialIcon>
            <SocialIcon aria-label="Instagram"><InstagramIcon /></SocialIcon>
            <SocialIcon aria-label="LinkedIn"><LinkedInIcon /></SocialIcon>
            <SocialIcon aria-label="GitHub"><GitHubIcon /></SocialIcon>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;