import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="flex justify-center border-b">
        <Header />
      </header>
      <main className="min-h-screen">{children}</main>
      <footer className="flex justify-center border-t">
        <Footer />
      </footer>
    </>
  );
};
