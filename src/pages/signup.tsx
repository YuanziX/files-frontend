/**
 * SignupPage Component
 *
 * This component renders the signup page for the FileVault application.
 * It provides a form for users to create a new account by entering their name, email, and password.
 * Features include:
 * - Password strength indicator
 * - Error handling and feedback
 * - Responsive design with branding and feature highlights
 * - Integration with GraphQL mutation for user registration
 * - Redirects to dashboard upon successful signup
 * - Links to Terms of Service, Privacy Policy, and Login page
 *
 * Dependencies:
 * - React, useState, useEffect
 * - Apollo Client's useMutation
 * - Lucide React icons
 * - Custom hooks and components: useGlobalStore, InputField, PixelBlast, FeaturesGrid
 */

import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_USER_MUTATION } from "@/hooks/api/auth";
import {
  AlertCircle,
  Lock,
  Mail,
  User,
  HardDrive,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import InputField from "@/components/inputField";
import PixelBlast from "@/components/PixelBlast";
import { FeaturesGrid } from "@/components/cards/features";

const SignupPage = () => {
  const { SetShowTopBar } = useGlobalStore();
  React.useEffect(() => {
    SetShowTopBar(false);
  }, []);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [signUp, { loading }] = useMutation(SIGNUP_USER_MUTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await signUp({
        variables: { name, email, password },
      });

      if (data && data.registerUser.token) {
        console.log("Signup successful:", data);
        localStorage.setItem("token", data.registerUser.token);
        window.location.href = "/dashboard";
      } else {
        setError("An unexpected error occurred during signup.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Signup failed. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["red", "orange", "yellow", "green"];

  return (
    <div className="min-h-screen font-sans">
      {/* PixelBlast Background */}
      <PixelBlast
        color="#10B981"
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
          {/* Left Side: Features & Benefits */}
          <div className="flex-1 hidden lg:flex lg:flex-col lg:justify-center space-y-8">
            {/* Logo & Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <HardDrive className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
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

          {/* Right Side: Signup Form */}
          <div className="w-80 flex-shrink-0 flex flex-col justify-center min-h-screen">
            <div className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/60">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 lg:hidden">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Create Your Vault
                </h2>
                <p className="text-slate-600">
                  Start your journey to secure file management
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <InputField
                    icon={<User size={20} />}
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputField
                    icon={<Mail size={20} />}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="space-y-2">
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

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                                level <= passwordStrength
                                  ? `bg-${
                                      strengthColors[passwordStrength - 1]
                                    }-500`
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        {passwordStrength > 0 && (
                          <p
                            className={`text-xs text-${
                              strengthColors[passwordStrength - 1]
                            }-600 font-medium`}
                          >
                            Password strength:{" "}
                            {strengthLabels[passwordStrength - 1]}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms & Privacy */}
                <div className="text-xs text-slate-500 bg-slate-50/50 p-3 rounded-lg">
                  By creating an account, you agree to our{" "}
                  <a
                    href="/terms"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
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
                  className="group w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating your vault...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Create My FileVault</span>
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-center text-slate-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-200"
                  >
                    Sign in to your vault
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

export default SignupPage;
