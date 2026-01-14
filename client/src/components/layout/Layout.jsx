

import { Header } from './Header';
import { Footer } from './Footer';


export function Layout({ children }) {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

