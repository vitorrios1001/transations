import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionsProvider } from './contexts/transactions.context.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TransactionsProvider>
      <App />
      <ToastContainer />
    </TransactionsProvider>
  </StrictMode>
);