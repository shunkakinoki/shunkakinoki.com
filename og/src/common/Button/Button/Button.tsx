import clsx from "clsx";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  FC,
} from "react";
import { forwardRef, useRef } from "react";

import styles from "./Button.module.css";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "rel" | "target"> {
  href?: string;
  className?: string;
  variant?: "flat" | "slim";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

export const mergeRefs = <T extends unknown>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> => {
  return (value): void => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

export const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    loading,
    width,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  return (
    <Component
      ref={mergeRefs([ref, buttonRef])}
      aria-pressed={active}
      data-variant={variant}
      className={clsx(
        "inline-flex justify-center items-center py-2 px-4 text-sm font-medium leading-6 text-center text-indigo-700 bg-indigo-100 hover:bg-indigo-300 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition duration-150 ease-in-out cursor-pointer focus:outline-none",
        loading && styles.loading,
        className,
      )}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.displayName = "Button";

export default Button;
