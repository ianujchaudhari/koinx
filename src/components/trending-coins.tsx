"use client";
import { Play } from "lucide-react";
import { useFetchTrendingCoins } from "@/lib/fetchTrendingData";

export function TrendingCoins() {
  const trendingCoins = useFetchTrendingCoins();

  return (
    <div className="bg-white rounded-lg border p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Trending Coins (24h)
      </h2>
      <div className="space-y-4">
        {trendingCoins.slice(0,3).map((coin) => (
          <div key={coin.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={coin.thumb} alt={coin.name} className="w-6 h-6" />
              <span className="font-medium text-sm">
                {coin.name} ({coin.symbol})
              </span>
            </div>
            <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded text-xs">
              <Play className="h-3 w-3 transform -rotate-90 fill-emerald-500" />
              {(coin.price_btc * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
