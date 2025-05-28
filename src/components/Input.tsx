import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  className?: string;
}
const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input-style ${className}`}
      {...props}
    />
  );
};

export default Input;
