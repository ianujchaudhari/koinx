"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { YouMayLike } from "@/components/you-may-like";

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export function PageLayout({ children, breadcrumb }: PageLayoutProps) {
  return (
    <div className="min-h-full bg-[#EFF2F5]">
      <Header />
      <main className="sm:w-full md:max-w-full mx-auto">
        {breadcrumb && (
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:max-w-[1328px] mx-auto">
            {breadcrumb}
          </div>
        )}
        <div className="lg:grid lg:grid-cols-3 gap-0 sm:gap-6 px-0 sm:px-6 lg:px-8 md:max-w-[1328px] mx-auto">
          <div className="lg:col-span-2 space-y-[1px] sm:space-y-6 gap-4">
            {children}
          </div>
          <Sidebar />
        </div>
        <div className="bg-white mt-[1px] sm:mt-6 max-w-full">
          <div className="max-w-[1328px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-[1px] sm:space-y-6">
            <YouMayLike title="You May Also Like" />
            <YouMayLike title="Trending Coins" />
          </div>
        </div>
      </main>
    </div>
  );
}
