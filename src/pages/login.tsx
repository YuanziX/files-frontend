/**
 * LoginPage component renders the login screen for the FileVault application.
 *
 * Features:
 * - Displays branding and feature highlights on large screens.
 * - Provides a login form with email and password fields.
 * - Handles authentication via GraphQL mutation (`LOGIN_MUTATION`).
 * - Shows loading state and error messages during login attempts.
 * - Stores authentication token in localStorage upon successful login.
 * - Redirects user to the dashboard after login.
 * - Includes a link to the signup page for new users.
 * - Uses custom UI components for input fields and background effects.
 *
 * @component
 * @returns {JSX.Element} The rendered login page.
 */
import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import {
  AlertCircle,
  Lock,
  Mail,
  HardDrive,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { LOGIN_MUTATION } from "@/hooks/api/auth";
import useGlobalStore from "@/store/globalStore";
import InputField from "@/components/inputField";
import PixelBlast from "@/components/PixelBlast";
import { FeaturesGrid } from "@/components/cards/features";

const LoginPage = () => {
  const { SetShowTopBar } = useGlobalStore();
  React.useEffect(() => {
    SetShowTopBar(false);
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [logIn, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await logIn({
        variables: { email, password },
      });

      if (data && data.login.token) {
        console.log("Login successful for:", data.login.user.name);
        localStorage.setItem("token", data.login.token);
        window.location.href = "/dashboard";
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* PixelBlast Background */}
      <PixelBlast
        color="#3B82F6"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
        }}
      />

      <div className="relative z-10 flex items-stretch justify-center min-h-screen p-4">
        <div className="flex w-full max-w-7xl gap-8 h-full">
          {/* Left Side: Branding & Features */}
          <div className="h-full flex-1 hidden lg:flex lg:flex-col lg:justify-center space-y-8">
            {/* Logo & Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <HardDrive className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FileVault
                  </h1>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <FeaturesGrid />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-80 flex-shrink-0 flex flex-col h-screen max-h-screen justify-center">
            <div className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/60">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:hidden">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-600">
                  Sign in to access your secure file vault
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <InputField
                    icon={<Mail size={20} />}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <InputField
                    icon={<Lock size={20} />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    showPasswordToggle
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing you in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign In to FileVault</span>
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  )}
                </button>
              </form>
              {/* Sign Up Link */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-center text-slate-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    Create your vault
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
