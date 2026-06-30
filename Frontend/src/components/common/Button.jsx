// src/components/common/Button.jsx
import clsx from "clsx";

const variants = {
  primary: "bg-gray-900 text-white hover:bg-gray-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
};

function Button({ children, className, variant = "primary", type = "button", disabled, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;