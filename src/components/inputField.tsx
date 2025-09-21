import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword = false,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
        {icon}
      </div>
      <input
        type={showPasswordToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 bg-slate-50/50 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white/80 transition-all duration-200 placeholder:text-slate-400"
        value={value}
        onChange={onChange}
        required={required}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}
