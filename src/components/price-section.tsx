'use client'
import { ArrowUp } from 'lucide-react';
import dynamic from "next/dynamic";
import Image from "next/image";

const PriceChart = dynamic(() => import("./price-chart"), { ssr: false });
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BitcoinData {
  usd: number;
  inr: number;
  usd_24h_change: number;
}

export function PriceSection() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin',
              vs_currencies: 'usd,inr',
              include_24hr_change: true,
            },
          }
        );
        setBitcoinData(response.data.bitcoin);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <div className="bg-white sm:rounded-lg border-0 sm:border">
      <div className="p-4 sm:p-6 border-b">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Image src="/bitcoin.svg" alt="Bitcoin" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-lg sm:text-2xl font-semibold text-[#0B1426]">Bitcoin</h1>
            <span className="text-sm font-semibold text-[#5D667B]">BTC</span>
          </div>
          <div className="px-2 py-1 bg-[#808A9D]/10 text-[#808A9D] rounded-lg text-xs sm:text-sm font-medium">
            Rank #1
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
          {bitcoinData ? (
            <>
              <div>
                <div className="text-xl sm:text-3xl font-semibold text-[#0B1426]">
                  ${bitcoinData.usd.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-[#14B079] gap-1 text-sm font-medium">
                    <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
                    {bitcoinData.usd_24h_change.toFixed(2)}%
                  </div>
                  <span className="text-xs sm:text-sm text-[#768396]">(24H)</span>
                </div>
              </div>
              <div className="text-sm sm:text-base text-[#768396]">
                ₹ {bitcoinData.inr.toLocaleString()}
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="overflow-hidden">
        <PriceChart />
      </div>
    </div>
  );
}
