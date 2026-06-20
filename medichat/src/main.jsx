import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
     <Toaster
  position="top-right"
  toastOptions={{
    success: {
      style: {
        background: "#0891b2",
        color: "#fff",
        borderRadius: "14px"
      }
    },
    error: {
      style: {
        background: "#ef4444",
        color: "#fff",
        borderRadius: "14px"
      }
    }
  }}
/>
   
  
  </BrowserRouter>
);