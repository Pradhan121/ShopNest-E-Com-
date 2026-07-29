import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box
} from "@mui/material";

export default function AdminNavbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#0F172A",
        boxShadow: "none",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Toolbar>

        <Typography
          sx={{
            flexGrow: 1,
            fontWeight: 700,
          }}
        >
          Admin Panel
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>Admin</Typography>

          <Avatar />
        </Box>

      </Toolbar>
    </AppBar>
  );
}