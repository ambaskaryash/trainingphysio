interface VideoGridProps {
  children: React.ReactNode;
}

export function VideoGrid({ children }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}