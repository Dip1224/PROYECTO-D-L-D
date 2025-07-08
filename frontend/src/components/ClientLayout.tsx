'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarLayout = pathname === '/' || pathname === '/login';

  return (
    <>
      {!ocultarLayout && <BackgroundAnimation />}
      <div className="relative z-10">
        {!ocultarLayout && <Header />}
        <main>
          {children}
        </main>
        {!ocultarLayout && <Footer />}
      </div>
    </>
  );
}