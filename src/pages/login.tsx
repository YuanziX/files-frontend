import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { LOGIN_MUTATION } from "@/hooks/api/auth";
import useGlobalStore from "@/store/globalStore";

const InputField = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div className="relative flex items-center">
    <span className="absolute left-4 text-gray-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const LoginPage = () => {
  const { SetShowTopBar } = useGlobalStore();
  React.useEffect(() => {
    SetShowTopBar(false);
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    <div className="flex font-sans items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="grid md:grid-cols-2 items-center gap-16 max-w-4xl w-full">
        {/* Left Side: Informational Text */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
            Welcome Back to Your Secure Vault.
          </h1>
          <p className="text-gray-600">
            Access your files from anywhere. Your digital life, organized and
            protected.
          </p>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Log In to Your Account
            </h2>
            <p className="text-gray-500 mt-1">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<Mail size={20} />}
              type="email"
              placeholder="Email Address"
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
            />

            {error && (
              <div className="flex items-center space-x-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging In...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
