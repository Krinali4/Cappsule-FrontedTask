export function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[1136px] m-auto ${className} md:max-lg:px-4`}>
      {children}
    </div>
  );
}
