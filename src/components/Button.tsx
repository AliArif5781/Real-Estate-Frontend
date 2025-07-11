import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost"
  | "lightgray";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:border-none",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:border-none",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:border-none",
  outline:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-none",
  ghost: "text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-none",
  lightgray:
    "bg-light-brown text-[#F3F4F1] focus:outline-none focus:border-none",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "lightgray ",
  type = "button",
  isLoading = false,
  disabled = false,
  children,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2";
  const variantClass = variantClasses[variant];
  const disabledClass =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClass} ${disabledClass} ${className}`}
      {...props}
    >
      <>{children}</>
    </button>
  );
};
