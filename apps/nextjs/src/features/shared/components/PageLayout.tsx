interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container mt-12 flex  max-w-screen-lg flex-col  justify-center gap-4 px-4 py-8">
      {children}
    </div>
  );
};
