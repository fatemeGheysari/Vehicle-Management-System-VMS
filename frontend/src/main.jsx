import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              fontSize: '14px',
            },
            success: {
              icon: '✅',
            },
            error: {
              icon: '❌',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

