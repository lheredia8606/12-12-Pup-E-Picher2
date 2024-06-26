import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DogProvider } from "./Providers/DogProvider";
import { TabProvider } from "./Providers/TabProvider";
import { LoadingProvider } from "./Providers/LoadinProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <TabProvider>
        <DogProvider>
          <Toaster />
          <App />
        </DogProvider>
      </TabProvider>
    </LoadingProvider>
  </React.StrictMode>
);
