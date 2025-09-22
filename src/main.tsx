import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ApolloWithAuthProvider from "./utils/apolloClientWithAuth.tsx";
import { AuthProvider } from "./hooks/use-auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Attach AuthProvider to ensure a valid user is signed in at all times */}
    <AuthProvider>
      {/* Attach the token from the auth provider to the Apollo Client and pass it down to the App component */}
      <ApolloWithAuthProvider>
        <App />
      </ApolloWithAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
