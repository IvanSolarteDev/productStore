import { useId, type ComponentProps } from "react";

type InputProps = Omit<ComponentProps<"input">, "className"> & {
  classes?: string;
  label?: string;
};

const classInit =
  "bg-gray-200 border border-gray-300 text-sm rounded-lg block w-full p-2.5";

export const Input = ({ classes = "", label, id, ...inputProps }: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

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

      <input
        id={inputId}
        {...inputProps}
        className={`${classInit} ${classes}`}
      />
    </div>
  );
};
