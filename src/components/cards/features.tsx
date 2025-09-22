import { Shield } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";

// Feature Cards
function SecurityCard() {
  return (
    <BlurFade delay={0.1} className="h-full w-full">
      <div className="h-full w-full bg-emerald-600 rounded-xl p-6 flex flex-col justify-center items-center text-center shadow-md">
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

function StorageCard() {
  return (
    <BlurFade delay={0.2} className="h-full w-full">
      <div className="bg-gray-600 rounded-xl h-full p-6 flex flex-col justify-center shadow-md">
        <p className="text-yellow-200 mb-1 font-medium">Free Storage</p>
        <h2 className="text-yellow-200 2xl:text-6xl text-4xl font-bold leading-none">
          10MB
        </h2>
        <p className="text-green-400 font-medium mt-2">+ Unlimited upgrades</p>
      </div>
    </BlurFade>
  );
}

function SpeedCard() {
  return (
    <BlurFade delay={0.4} className="h-full w-full">
      <div className="bg-purple-300 rounded-xl h-full p-4 relative overflow-hidden shadow-md">
        <div className="bg-gray-900 text-yellow-200 text-lg font-medium px-4 py-2 rounded-lg inline-block mb-4 w-full">
          <p>Lightning Fast</p>
          <p>Upload & Download</p>
          <p>Speeds</p>
        </div>
        <div className="flex gap-2 h-20">
          <div className="w-full rounded-xl bg-purple-400 overflow-hidden"></div>
          <div className="w-full rounded-xl bg-yellow-200 overflow-hidden ml-4"></div>
        </div>
      </div>
    </BlurFade>
  );
}

function GlobalCard() {
  return (
    <BlurFade delay={0.5} className="h-full w-full">
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

function SharingCard() {
  return (
    <BlurFade delay={0.7} className="h-full w-full">
      <div className="bg-yellow-200 rounded-xl h-full p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1 text-gray-900">
            File Sharing
          </h2>
          <p className="mb-6 text-gray-700">Secure & encrypted</p>
        </div>

        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-400 rounded-md"></div>
          <div className="w-12 h-12 bg-red-400 rounded-md"></div>
          <div className="w-12 h-12 bg-pink-300 rounded-md"></div>
        </div>
      </div>
    </BlurFade>
  );
}

function EncryptionCard() {
  return (
    <BlurFade delay={0.8} className="h-full w-full">
      <div className="bg-emerald-600 text-yellow-200 rounded-xl h-full p-6 flex flex-col justify-center shadow-md">
        <p className="text-2xl font-bold">End-to-End</p>
        <p className="text-2xl font-bold">Encryption</p>
      </div>
    </BlurFade>
  );
}

export function FeaturesGrid() {
  return (
    <div
      className="grid w-full grid-cols-12 gap-6 py-4"
      style={{
        gridTemplateRows: "repeat(3, minmax(200px, 1fr))",
        height: "600px",
      }}
    >
      {/* Row 1 */}
      <div className="lg:col-span-4 sm:col-span-7 col-span-12 row-span-1 h-full">
        <SecurityCard />
      </div>
      <div className="lg:col-span-3 sm:col-span-5 col-span-12 row-span-1 h-full">
        <StorageCard />
      </div>
      <div className="lg:col-span-5 sm:col-span-5 col-span-12 row-span-1 h-full">
        <EncryptionCard />
      </div>

      {/* Row 2 */}
      <div className="lg:col-span-5 sm:col-span-7 col-span-12 row-span-1 h-full">
        <SpeedCard />
      </div>
      <div className="lg:col-span-4 sm:col-span-6 col-span-12 row-span-1 h-full">
        <GlobalCard />
      </div>
      <div className="lg:col-span-3 sm:col-span-6 col-span-12 row-span-1 h-full">
        <SharingCard />
      </div>
    </div>
  );
}
