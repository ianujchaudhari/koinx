'use client'

import { Breadcrumb } from "@/components/breadcrumb";
import { GetStartedCard } from "@/components/get-started-card";
import { Header } from "@/components/header";
import { PriceSection } from "@/components/price-section";
import { SentimentSection } from "@/components/sentiment-section";
import { TeamSection } from "@/components/team-section";
import { Tokenomics } from "@/components/tokenomics";
import { TrendingCoins } from "@/components/trending-coins";
import { YouMayLike } from "@/components/you-may-like";
import { AboutBitcoin } from "@/components/about-bitcoin";
import { NavigationTabs } from "@/components/navigation-tabs";
import { PerformanceSection } from "@/components/performance-section";

export default function Home() {
  return (
    <div className="min-h-full bg-[#EFF2F5]">
      <Header />
      <main className="sm:w-full md:max-w-full mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:max-w-[1328px] mx-auto">
          <Breadcrumb />
        </div>
        <div className="lg:grid lg:grid-cols-3 gap-0 sm:gap-6 px-0 sm:px-6 lg:px-8  md:max-w-[1328px] mx-auto">
          <div className="lg:col-span-2 space-y-[1px] sm:space-y-6 gap-4">
            <PriceSection />
            <div >
              <NavigationTabs />
            </div>
            <div className="bg-white sm:rounded-lg border-0 sm:border">
              <PerformanceSection />
            </div>
            <div className="bg-white sm:rounded-lg border-0 sm:border">
              <SentimentSection />
            </div>
            <AboutBitcoin />
            <Tokenomics />
            <TeamSection />
          </div>
          <div className="space-y-[1px] sm:space-y-6 lg:sticky lg:top-20 h-fit order-last lg:order-last px-4 sm:px-0">
            <GetStartedCard />
            <TrendingCoins />
          </div>
        </div>
        <div className="bg-white mt-[1px] sm:mt-6 max-w-full">
          <div className="max-w-[1328px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-[1px] sm:space-y-6">
            <YouMayLike title="You May Also Like" />
            <YouMayLike title="Trending Coins"/>
          </div>
        </div>
      </main>
    </div>
  );
}
