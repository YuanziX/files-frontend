import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_USER_MUTATION } from "@/graphql/queries/auth";
import { AlertCircle, Lock, Mail, User } from "lucide-react";
import useGlobalStore from "@/components/store/globalStore";

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

const SignupPage = () => {
  const { SetShowTopBar } = useGlobalStore();
  React.useEffect(() => {
    SetShowTopBar(false);
  }, []);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  return (
    <div className="flex font-sans items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="grid md:grid-cols-2 items-center gap-16 max-w-4xl w-full">
        {/* Left Side: Informational Text */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
            Securely Store & Access Your Digital Life.
          </h1>
          <p className="text-gray-600">
            Join our secure file vault to benefit from industry-leading features
            like content deduplication, powerful search, and controlled file
            sharing.
          </p>
        </div>

        {/* Right Side: Signup Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-500 mt-1">Get started for free.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<User size={20} />}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
