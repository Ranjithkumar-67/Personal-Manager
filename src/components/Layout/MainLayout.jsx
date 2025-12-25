export default function MainLayout({ children, bg }) {
  return (
    <div className={`max-w-lg mx-auto min-h-screen ${bg}`}>
      {children}
    </div>
  );
}

