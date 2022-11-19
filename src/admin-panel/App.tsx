import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// import SignIn from "./pages/SignIn";
import { theme } from "./theme";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Index />
    </ThemeProvider>
  );
}

export default App;
