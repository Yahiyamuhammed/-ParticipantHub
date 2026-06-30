function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`
        animate-pulse
        rounded-2xl
        bg-gray-200
        ${className}
      `}
    />
  );
}

export default Skeleton;