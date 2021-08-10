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
          "py-1 px-3 w-full h-9 dark:text-white bg-black rounded border focus:border focus:ring-4 focus:ring-sky-800 focus:ring-offset-2 focus:ring-offset-sky-300 appearance-none focus:outline-none",
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
