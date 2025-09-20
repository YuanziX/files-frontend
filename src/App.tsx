import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import TopBar from "./pages/dashboard";
import ProtectedRoute from "./utils/routeProtection";
import FolderById from "./pages/folderById";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <ProtectedRoute>
        <TopBar>
          <Routes>
            <Route path="/dashboard" element={<FolderById />} />
            <Route path="/dashboard/:id" element={<FolderById />} />
            <Route
              path="/share/folder/:public_token/:id"
              element={<FolderById />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </TopBar>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
