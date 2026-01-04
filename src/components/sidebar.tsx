"use client";

import { GetStartedCard } from "@/components/get-started-card";
import { TrendingCoins } from "@/components/trending-coins";

export function Sidebar() {
  return (
    <div className="space-y-[1px] sm:space-y-6 lg:sticky lg:top-20 h-fit order-last lg:order-last px-4 sm:px-0">
      <GetStartedCard />
      <TrendingCoins />
    </div>
  );
}
