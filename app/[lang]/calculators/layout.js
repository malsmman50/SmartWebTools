'use client';

import { usePathname } from 'next/navigation';
import ExploreTools from "@/app/components/ExploreTools";

export default function CalculatorsLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <>
      {children}
      <div className="container" style={{ paddingBottom: '40px' }}>
        <ExploreTools currentPath={pathname} />
      </div>
    </>
  );
}
