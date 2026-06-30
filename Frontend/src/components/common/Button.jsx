import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200",

  outline:
    "border border-gray-300 bg-white hover:bg-gray-50",
};

function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "w-full rounded-2xl px-5 py-3 font-medium transition",
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