// src/components/common/PageContainer.jsx
function PageContainer({ children, className = "" }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      <main
        className={`
          w-full
          max-w-[640px]
          min-h-screen
          bg-white
          shadow-2xl
          relative
          overflow-x-hidden
          ${className}
        `}
      >
        {children}
      </main>
    </div>
  );
}

export default PageContainer;