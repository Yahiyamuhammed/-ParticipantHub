// src/components/common/Button.jsx
import clsx from "clsx";

const variants = {
  // Gold background, dark forest text
  primary: "bg-brand-accent text-brand-dark hover:bg-brand-accentLight font-semibold", 
  secondary: "bg-white text-brand-dark hover:bg-gray-50 border border-black/5",
  outline: "border border-brand-accent/30 text-brand-accent hover:border-brand-accent/60 bg-transparent",
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