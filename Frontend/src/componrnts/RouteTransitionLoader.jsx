import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DotLoader from "./DotLoader";

export default function RouteTransitionLoader({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(2, 6, 23, 0.82)",
            backdropFilter: "blur(6px)",
          }}
        >
          <DotLoader label="Loading" size={10} color="#60A5FA" />
        </Box>
      ) : null}

      {children}
    </>
  );
}
