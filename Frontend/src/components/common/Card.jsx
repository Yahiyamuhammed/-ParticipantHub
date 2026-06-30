import clsx from "clsx";

function Card({
  children,
  className,
  padding = "p-5",
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white shadow-sm border border-gray-200",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;