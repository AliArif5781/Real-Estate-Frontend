import Button from "./Button";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormProps {
  children: React.ReactNode;
  className: string;
  status: FormStatus;
  errorMessage: string;
  submitText: string;
  successMessage: string;
}
export const Form = ({
  children,
  className = "",
  errorMessage = "Something went wrong",
  submitText = "submit",
  successMessage = "Success!",
  status = "idle",
}: FormProps) => {
  return (
    <>
      <form action="" noValidate>
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
    </>
  );
};
