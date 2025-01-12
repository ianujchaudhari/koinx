"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface TrendingCoin {
  name: string;
  symbol: string;
  thumb: string;
  price_btc: number;
  icon: string;
  change: string;
  trend: string;
  data: JSON
}

function useFetchTrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const coins = response.data.coins.map((coin: any) => ({
          name: coin.item.name,
          symbol: coin.item.symbol,
          thumb: coin.item.thumb,
          price_btc: coin.item.price_btc,
        }));
        setTrendingCoins(coins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return trendingCoins;
}

export { useFetchTrendingCoins };
