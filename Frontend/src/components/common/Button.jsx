// src/components/common/Button.jsx
import clsx from "clsx";

const variants = {
  // Gold background, dark forest text — primary call to action
  primary: "bg-brand-accent text-brand-dark hover:bg-brand-accentLight font-bold shadow-[0_4px_14px_rgba(217,181,109,0.35)] active:scale-[0.98]",
  // Deep forest background, cream text — used on white/cream surfaces for high contrast
  dark: "bg-brand-dark text-brand-cream hover:bg-brand-mid font-bold shadow-[0_4px_14px_rgba(15,61,48,0.25)] active:scale-[0.98]",
  secondary: "bg-white text-brand-dark hover:bg-gray-50 border border-black/5 font-semibold",
  outline: "border border-brand-accent/40 text-brand-dark hover:border-brand-accent bg-transparent font-semibold",
};

function Button({ children, className, variant = "primary", type = "button", disabled, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] tracking-tight transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
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