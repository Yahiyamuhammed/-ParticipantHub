function PageContainer({ children, className = "" }) {
  return (
    <main
      className={`
        mx-auto
        min-h-screen
        max-w-[640px]
        px-5
        py-6
        ${className}
      `}
    >
      {children}
    </main>
  );
}

export default PageContainer;