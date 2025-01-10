import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Reset } from "styled-reset";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Reset />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </Router>
);
