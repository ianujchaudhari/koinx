'use client'

import { Breadcrumb } from "@/components/breadcrumb";
import { PriceSection } from "@/components/price-section";
import { SentimentSection } from "@/components/sentiment-section";
import { TeamSection } from "@/components/team-section";
import { Tokenomics } from "@/components/tokenomics";
import { AboutBitcoin } from "@/components/about-bitcoin";
import { NavigationTabs } from "@/components/navigation-tabs";
import { PerformanceSection } from "@/components/performance-section";
import { PageLayout } from "@/components/page-layout";

export default function Home() {
  return (
    <PageLayout breadcrumb={<Breadcrumb />}>
      <PriceSection />
      <div>
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
    </PageLayout>
  );
}
