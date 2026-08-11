import { Box, Typography } from "@mui/material";

export default function DotLoader({ label = "Loading...", size = 12, color = "#3B82F6", sx = {} }) {
  const dots = [0, 1, 2];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 3,
        ...sx,
      }}
    >
      {dots.map((dot) => (
        <Box
          key={dot}
          sx={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
            animation: `dotPulse 0.9s ease-in-out ${dot * 0.12}s infinite alternate`,
            "@keyframes dotPulse": {
              "0%": {
                transform: "translateY(0)",
                opacity: 0.4,
              },
              "100%": {
                transform: "translateY(-6px)",
                opacity: 1,
              },
            },
          }}
        />
      ))}

      {label ? (
        <Typography
          sx={{
            ml: 1,
            color: "#94A3B8",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      ) : null}
    </Box>
  );
}
