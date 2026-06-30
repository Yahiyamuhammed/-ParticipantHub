function Section({
  title,
  subtitle,
  children,
}) {
  return (
    <section className="space-y-4">
      {(title || subtitle) && (
        <header>
          {title && (
            <h2 className="text-xl font-bold">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </header>
      )}

      {children}
    </section>
  );
}

export default Section;