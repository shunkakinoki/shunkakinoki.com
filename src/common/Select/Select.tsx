/* eslint-disable jsx-a11y/no-onchange */
import clsx from "clsx";
import { forwardRef } from "react";

export interface Option {
  value: string;
  text?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: Option[];
  className?: string;
  value?: string;
  width?: string;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void | undefined;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, value, options, name, error, disabled, onChange, ...rest },
    forwardedRef,
  ) => {
    return (
      <div className="flex relative items-center w-full">
        <select
          ref={forwardedRef}
          className={clsx(
            "py-1 pr-8 pl-3 w-full h-9 text-black dark:text-white dark:bg-black rounded border hover:border-2 focus:border border-gray-800 hover:border-blue-300 dark:border-white dark:hover:border-blue-400 focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-800 focus:ring-offset-2 focus:ring-offset-sky-300 appearance-none",
            error ? "border-red-500 hover:border-red-500" : "",
            className,
          )}
          value={value}
          disabled={disabled}
          name={name}
          onChange={e => {
            if (onChange != null) {
              onChange(e.target.value);
            }
          }}
          {...rest}
        >
          {options.map(option => {
            return (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.text ?? option.value}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
