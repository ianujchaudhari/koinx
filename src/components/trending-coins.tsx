"use client";
import { Play } from "lucide-react";
import { useFetchTrendingCoins } from "@/lib/fetchTrendingData";
import Image from "next/image";

export function TrendingCoins() {
  const trendingCoins = useFetchTrendingCoins();

  return (
    <div className="bg-white rounded-lg border p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Trending Coins (24h)
      </h2>
      <div className="space-y-4">
        {trendingCoins.slice(0, 3).map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={coin.symbol}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Image src={coin.thumb} alt={coin.name} width={24} height={24} className="rounded-full" />
                <span className="font-medium text-sm">
                  {coin.name} ({coin.symbol})
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                  isPositive
                    ? "text-emerald-500 bg-emerald-50"
                    : "text-red-500 bg-red-50"
                }`}
              >
                <Play
                  className={`h-3 w-3 fill-current ${
                    isPositive ? "transform -rotate-90" : "transform rotate-90"
                  }`}
                />
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
