import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signup";
import { AuthProvider } from "./hooks/use-auth";
import LoginPage from "./pages/login";
import TopBar from "./pages/dashboard";
import ProtectedRoute from "./utils/routeProtection";
import FolderById from "./pages/folderById";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ProtectedRoute>
          <TopBar>
            <Routes>
              <Route path="/dashboard" element={<FolderById />} />
              <Route path="/dashboard/:id" element={<FolderById />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </TopBar>
        </ProtectedRoute>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
