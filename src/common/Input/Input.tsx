import clsx from "clsx";
import type { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = props => {
  const { className, onChange, ...rest } = props;

  return (
    <label>
      <input
        className={clsx(
          "py-1 px-3 w-full h-9 text-black dark:text-white bg-white dark:bg-black rounded border hover:border-2 border-gray-800 hover:border-blue-300 dark:border-white dark:hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-800 focus:ring-offset-2 focus:ring-offset-sky-300 appearance-none",
          className,
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};
