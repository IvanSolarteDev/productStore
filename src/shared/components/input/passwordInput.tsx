import { useId, useState, type ComponentProps } from "react";

type PasswordInputProps = Omit<
  ComponentProps<"input">,
  "className" | "type"
> & {
  classes?: string;
  label?: string;
};

const classInit =
  "bg-gray-200 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pr-11";

export const PasswordInput = ({
  classes = "",
  label,
  id,
  ...inputProps
}: PasswordInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          {...inputProps}
          type={isVisible ? "text" : "password"}
          className={`${classInit} ${classes}`}
        />
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {isVisible ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.9 10.9 0 0112 5c5 0 8.3 4.5 9 7-.3 1.1-1 2.3-2 3.3M6.2 6.2C4.4 7.5 3.3 9.4 3 12c.7 2.5 4 7 9 7 1.1 0 2.1-.2 3-.6"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.5 12s3.3-7 9.5-7 9.5 7 9.5 7-3.3 7-9.5 7-9.5-7-9.5-7z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
