import React, { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import {
  AlertCircle,
  Lock,
  Mail,
  HardDrive,
  Shield,
  Cloud,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { LOGIN_MUTATION } from "@/hooks/api/auth";
import useGlobalStore from "@/store/globalStore";
import InputField from "@/components/inputField";
import PixelBlast from "@/components/PixelBlast";
import BlurText from "@/components/BlurText";
import { useMemo, useState as useStateSwapy } from "react";
import { SlotItemMapArray, utils } from "swapy";
import { SwapyItem, SwapyLayout, SwapySlot } from "@/components/ui/swapy";
import { BlurFade } from "@/components/ui/blur-fade";

// Feature Cards for Swapy Grid
export function SecurityCard() {
  return (
    <BlurFade delay={0.1}>
      <div className="bg-emerald-600 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-md">
        <div className="flex gap-2">
          <h2 className="text-yellow-200 2xl:text-5xl text-3xl font-bold mb-2">
            99.9%
          </h2>
          <div className="text-yellow-200 flex items-center gap-1 mb-1">
            <span className="text-xl">
              <Shield className="fill-yellow-200" size={24} />
            </span>
          </div>
        </div>
        <p className="text-yellow-200 font-medium">Security Rating</p>
        <p className="text-yellow-200/80 text-sm">Military-grade encryption</p>
      </div>
    </BlurFade>
  );
}
export function StorageCard() {
  return (
    <BlurFade delay={0.2}>
      <div className="bg-gray-600 rounded-xl h-full p-6 flex flex-col justify-center shadow-md">
        <p className="text-yellow-200 mb-1 font-medium">Free Storage</p>
        <h2 className="text-yellow-200 2xl:text-6xl text-4xl font-bold leading-none">
          10GB
        </h2>
        <p className="text-green-400 font-medium mt-2">+ Unlimited upgrades</p>
      </div>
    </BlurFade>
  );
}
export function UsersCard() {
  return (
    <BlurFade delay={0.3}>
      <div className="bg-blue-100 rounded-xl p-6 h-full  flex flex-col justify-between relative overflow-hidden shadow-md">
        <div className="bg-blue-300 text-black font-medium px-4 py-2 rounded-xl inline-block mb-4 max-w-fit">
          Trusted by users worldwide
        </div>
        <div>
          <p className="font-bold text-gray-800">Active Users</p>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold text-gray-900">50K+</span>
            <span className="text-green-500 font-medium mb-1">+25%</span>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
export function SpeedCard() {
  return (
    <BlurFade delay={0.4}>
      <div className="bg-purple-300 rounded-xl h-full p-4 relative overflow-hidden shadow-md">
        <div className="bg-gray-900 text-yellow-200 text-lg font-medium px-4 py-2 rounded-lg inline-block mb-4 w-full">
          <p>Lightning Fast</p>
          <p>Upload & Download</p>
          <p>Speeds</p>
        </div>
        <div className="flex  gap-2 h-20">
          <div className="w-full rounded-xl bg-purple-400  overflow-hidden"></div>
          <div className="w-full rounded-xl bg-yellow-200  overflow-hidden ml-4"></div>
        </div>
      </div>
    </BlurFade>
  );
}
export function GlobalCard() {
  return (
    <BlurFade delay={0.5}>
      <div className="bg-pink-200 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-md">
        <div className="w-16 h-16 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="33" cy="33" r="25" fill="rgb(27, 13, 221)" />
            <circle cx="67" cy="33" r="25" fill="rgb(9, 4, 255)" />
            <circle cx="50" cy="67" r="25" fill="rgb(1, 61, 226)" />
          </svg>
        </div>
        <h2 className="2xl:text-3xl text-xl font-bold text-gray-900">
          Global Access
        </h2>
      </div>
    </BlurFade>
  );
}
export function SearchCard() {
  return (
    <BlurFade delay={0.6}>
      <div className="bg-blue-600 rounded-xl h-full p-4 flex flex-col justify-center items-center text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Smart Search</h3>
        <p className="text-3xl font-bold mb-4">AI-Powered</p>

        <div className="flex -space-x-2 mb-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200"></div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200"></div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200"></div>
          <div className="w-10 h-10 rounded-xl bg-yellow-500 border-2 border-blue-600 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
        </div>

        <p className="text-sm">Find files instantly</p>
      </div>
    </BlurFade>
  );
}
export function SharingCard() {
  return (
    <BlurFade delay={0.7}>
      <div className="bg-yellow-200 rounded-xl h-full p-6 col-span-1 shadow-md">
        <h2 className="text-3xl font-bold mb-1 text-gray-900">File Sharing</h2>
        <p className="mb-6 text-gray-700">Secure & encrypted</p>

        <div className="flex gap-3 mt-4">
          <div className="w-12 h-12 bg-gray-800 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-400 rounded-md"></div>
          <div className="w-12 h-12 bg-red-400 rounded-md"></div>
          <div className="w-12 h-12 bg-pink-300 rounded-md"></div>
        </div>
      </div>
    </BlurFade>
  );
}
export function EncryptionCard() {
  return (
    <BlurFade delay={0.8}>
      <div className="bg-emerald-600 text-yellow-200 rounded-xl h-full p-6 flex flex-col justify-between relative shadow-md">
        <p className="text-2xl font-bold">End-to-End</p>
        <p className="text-2xl font-bold">Encryption</p>
      </div>
    </BlurFade>
  );
}
export function BackupCard() {
  return (
    <BlurFade delay={0.9}>
      <div className="bg-yellow-200 rounded-xl h-full p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-neutral-950">Auto Backup</h3>
        <h2 className="text-3xl font-bold mb-6 text-neutral-800">24/7</h2>

        <div className="bg-black text-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span>Last Backup</span>
            <span>Status</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>2 mins ago</span>
            <span className="text-green-400">Success</span>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

type Item = {
  id: string;
  title: string;
  widgets: React.ReactNode;
  className?: string;
};

const initialItems: Item[] = [
  {
    id: "1",
    title: "1",
    widgets: <SecurityCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "2",
    title: "2",
    widgets: <StorageCard />,
    className: "lg:col-span-3 sm:col-span-5 col-span-12",
  },
  {
    id: "3",
    title: "3",
    widgets: <EncryptionCard />,
    className: "lg:col-span-5 sm:col-span-5 col-span-12",
  },
  {
    id: "4",
    title: "4",
    widgets: <UsersCard />,
    className: "lg:col-span-5 sm:col-span-7 col-span-12",
  },
  {
    id: "5",
    title: "5",
    widgets: <GlobalCard />,
    className: "lg:col-span-4 sm:col-span-6 col-span-12",
  },
  {
    id: "6",
    title: "6",
    widgets: <SharingCard />,
    className: "lg:col-span-3 sm:col-span-6 col-span-12",
  },
  {
    id: "7",
    title: "7",
    widgets: <SpeedCard />,
    className: "lg:col-span-4 sm:col-span-5 col-span-12",
  },
  {
    id: "8",
    title: "8",
    widgets: <SearchCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "9",
    title: "9",
    widgets: <BackupCard />,
    className: "lg:col-span-4 sm:col-span-12 col-span-12",
  },
];

function FeaturesGrid() {
  const [slotItemMap, setSlotItemMap] = useStateSwapy<SlotItemMapArray>(
    utils.initSlotItemMap(initialItems, "id")
  );

  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, "id", slotItemMap),
    [initialItems, slotItemMap]
  );

  return (
    <SwapyLayout
      id="features-swapy"
      className="w-full"
      config={{
        swapMode: "hover",
      }}
      onSwap={(event: { newSlotItemMap: { asArray: any } }) => {
        console.log("Swap detected!", event.newSlotItemMap.asArray);
      }}
    >
      <div className="grid w-full grid-cols-12 gap-4 md:gap-6 py-4">
        {slottedItems.map(({ slotId, itemId }) => {
          const item = initialItems.find((i) => i.id === itemId);

          return (
            <SwapySlot
              key={slotId}
              className={`swapyItem rounded-lg h-48 ${item?.className}`}
              id={slotId}
            >
              <SwapyItem
                id={itemId}
                className="relative rounded-lg w-full h-full"
                key={itemId}
              >
                {item?.widgets}
              </SwapyItem>
            </SwapySlot>
          );
        })}
      </div>
    </SwapyLayout>
  );
}

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
              {" "}
              {/* Added: flex-grow */}
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
