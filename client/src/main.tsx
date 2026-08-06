import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
console.log("clientId: ", clientId);
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={clientId}
    onScriptLoadSuccess={() => console.log("GSI script loaded")}
    onScriptLoadError={() => console.error("GSI script failed to load")}
  >
    <BrowserRouter>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <LoaderProvider>
        <App />
      </LoaderProvider>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </BrowserRouter>
  </GoogleOAuthProvider>,
);
