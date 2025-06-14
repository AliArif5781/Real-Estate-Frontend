import React from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormProps {
  children: React.ReactNode;
  className?: string;
  status?: FormStatus;
  errorMessage?: string;
  // submitText?: string;
  successMessage?: string;
  onSubmit: (e: React.FormEvent) => void;
}

export const Form = ({
  className = "",
  errorMessage = "Something went wrong",
  // submitText = "Submit",
  successMessage = "Success!",
  status = "idle",
  onSubmit,
  children,
}: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset
        className={`space-y-4 ${className}`}
        disabled={status === "submitting"}
      >
        {children}
        {status === "error" && (
          <div className="text-red-600 py-2">{errorMessage}</div>
        )}
        {status === "success" && (
          <div className="text-green-600 py-2">{successMessage}</div>
        )}
      </fieldset>
    </form>
  );
};
