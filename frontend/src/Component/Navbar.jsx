import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const menuItems = [
  { label: "Single User", path: "/" },
  { label: "Compare", path: "/compare" },
  { label: "AI Study", path: "/ai-study" },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect screen size

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50", padding: "5px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand Name */}
        <Typography variant="h5" fontWeight={700} sx={{ color: "#fff" }}>
          CF Visualizer
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "20px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { color: "#f39c12" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 200 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
