import type { ComponentProps } from "react";

type CheckboxProps = Omit<ComponentProps<"input">, "className" | "type"> & {
  classes?: string;
  label?: string;
};

const classInit =
  "h-6 w-6 appearance-none rounded-full border-2 border-red-300 bg-gray-50 checked:border-slate-50 checked:bg-primary focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800";

export const Checkbox = ({ classes = "", label, ...inputProps }: CheckboxProps) => {
  return (
  <div className="flex items-center  ">
      <input
      {...inputProps}
      type="checkbox"
      className={`${classInit} ${classes} `}
    />
    {label && (
      <label
        htmlFor={inputProps.id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    )}
  </div>
  );
};
