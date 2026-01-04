"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  price: string;
  price_change_percentage_24h: number;
  sparkline: string;
}

interface CoinItem {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    data: {
      price: string;
      price_change_percentage_24h: {
        usd: number;
      };
      sparkline: string;
    };
  };
}

function useFetchTrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const coins = response.data.coins.map((coin: CoinItem) => ({
          id: coin.item.id,
          name: coin.item.name,
          symbol: coin.item.symbol,
          thumb: coin.item.thumb,
          price: coin.item.data.price,
          price_change_percentage_24h: coin.item.data.price_change_percentage_24h.usd,
          sparkline: coin.item.data.sparkline,
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
