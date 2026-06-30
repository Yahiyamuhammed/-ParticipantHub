// src/components/common/Card.jsx
import clsx from "clsx";

function Card({ children, className, padding = "p-5", onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-3xl bg-white shadow-sm ring-1 ring-gray-900/5",
        onClick && "cursor-pointer hover:shadow-md transition-shadow duration-200",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;