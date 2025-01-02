import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import { Loader } from "@aws-amplify/ui-react";
import outputs from "../amplify_outputs.json";

import "./index.css";
import "@aws-amplify/ui-react/styles.css";

const AuthenticatorProvider = React.lazy(() =>
  import("@aws-amplify/ui-react").then((module) => ({
    default: module.Authenticator.Provider,
  }))
);

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <AuthenticatorProvider>
        <App />
      </AuthenticatorProvider>
    </Suspense>
  </React.StrictMode>
);
