import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./ThemeContext.tsx";
import { Box } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <App />
    </Box>
  </ThemeProvider>
);
