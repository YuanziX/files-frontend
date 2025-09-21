import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_USER_MUTATION } from "@/hooks/api/auth";
import {
  AlertCircle,
  Lock,
  Mail,
  User,
  HardDrive,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import useGlobalStore from "@/store/globalStore";
import InputField from "@/components/inputField";

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60">
    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <div className="text-green-600">{icon}</div>
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </div>
);

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
      <Check size={12} className="text-green-600" />
    </div>
    <span className="text-slate-700">{text}</span>
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-100/50 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="grid lg:grid-cols-2 items-center gap-16 max-w-6xl w-full">
          {/* Left Side: Features & Benefits */}
          <div className="hidden lg:block space-y-8">
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
                  <p className="text-slate-600 font-medium">
                    Join the Future of File Storage
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                  Start Your Digital
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent block">
                    Transformation Today
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Join thousands of users who trust FileVault with their most
                  important files. Experience the future of secure, intelligent
                  file management.
                </p>
              </div>
            </div>

            {/* What You Get */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                What you get for free:
              </h3>
              <div className="space-y-3">
                <BenefitItem text="10GB of secure cloud storage" />
                <BenefitItem text="Advanced file search & organization" />
                <BenefitItem text="End-to-end encryption" />
                <BenefitItem text="Cross-platform access" />
                <BenefitItem text="Smart file deduplication" />
                <BenefitItem text="Secure file sharing" />
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <FeatureItem
                icon={<Shield size={20} />}
                title="Military-Grade Security"
                description="Your files are protected with the same encryption standards used by banks and governments."
              />
              <FeatureItem
                icon={<Zap size={20} />}
                title="Lightning Fast"
                description="Upload, download, and access your files with blazing-fast speeds and smart caching."
              />
              <FeatureItem
                icon={<Globe size={20} />}
                title="Global CDN"
                description="Your files are distributed across global servers for optimal performance worldwide."
              />
            </div>
          </div>

          {/* Right Side: Signup Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
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
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputField
                    icon={<Mail size={20} />}
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="space-y-2">
                    <InputField
                      icon={<Lock size={20} />}
                      type="password"
                      placeholder="Create a strong password"
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

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                🔒 Your account is protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
