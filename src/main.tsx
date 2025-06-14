import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./assets/sass/main.scss";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store/PropertyStore.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  </Provider>
);
