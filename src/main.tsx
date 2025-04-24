import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Reset } from 'styled-reset';
import GlobalStyle from './styles/GlobalStyle.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 0,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Reset />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Router>
);
