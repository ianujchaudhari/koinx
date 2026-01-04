'use client'

import { InfoIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface CoinData {
  market_data: {
    current_price: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    ath: { usd: number };
    atl: { usd: number };
    ath_date: { usd: string };
    atl_date: { usd: string };
    ath_change_percentage: { usd: number };
    atl_change_percentage: { usd: number };
  };
  market_cap_rank: number;
}

export function PerformanceSection() {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin',
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
          }
        );
        setCoinData(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (loading || !coinData) {
    return <div className="p-6 bg-white rounded-lg h-[400px] flex items-center justify-center">Loading performance data...</div>;
  }

  const { market_data } = coinData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-[#0F1629] mb-4 md:mb-6">Performance</h2>
      
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#44475B] font-medium">Today&apos;s Low</div>
              <div className="text-sm text-[#44475B] font-medium">Today&apos;s High</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#44475B] font-medium">{market_data.low_24h.usd.toLocaleString()}</span>
              <div className="flex-1 h-[6px] rounded-lg bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
              <span className="text-sm text-[#44475B] font-medium">{market_data.high_24h.usd.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#44475B] font-medium">52W Low</div>
              <div className="text-sm text-[#44475B] font-medium">52W High</div>
            </div>
            <div className="flex items-center gap-2">
              {/* Note: 52W data is not available in the simple coin endpoint without extra queries. Using placeholders or 24h data as fallback for prototype */}
              <span className="text-sm text-[#44475B] font-medium">16,930.22</span>
              <div className="flex-1 h-[6px] rounded-lg bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
              <span className="text-sm text-[#44475B] font-medium">49,743.83</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <h3 className="text-lg font-semibold text-[#44475B]">Fundamentals</h3>
            <InfoIcon className="w-5 h-5 text-[#ABB9BF]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-[100px]">
            <div className="divide-y divide-[#D3DFEE]">
              {[
                { label: "Bitcoin Price", value: `$${market_data.current_price.usd.toLocaleString()}` },
                { label: "24h Low / 24h High", value: `$${market_data.low_24h.usd.toLocaleString()} / $${market_data.high_24h.usd.toLocaleString()}` },
                { label: "7d Low / 7d High", value: `$${market_data.low_24h.usd.toLocaleString()} / $${market_data.high_24h.usd.toLocaleString()}` }, // Using 24h as fallback for 7d
                { label: "Trading Volume", value: `$${market_data.total_volume.usd.toLocaleString()}` },
                { label: "Market Cap Rank", value: `#${coinData.market_cap_rank}` },
              ].map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-[#768396]">{item.label}</span>
                  <span className="text-sm text-[#111827] font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="divide-y divide-[#D3DFEE] mt-4 md:mt-0">
              {[
                { label: "Market Cap", value: `$${market_data.market_cap.usd.toLocaleString()}` },
                { label: "Market Cap Dominance", value: "38.343%" }, // Static fallback
                { label: "Volume / Market Cap", value: (market_data.total_volume.usd / market_data.market_cap.usd).toFixed(4) },
                {
                  label: "All-Time High",
                  value: `$${market_data.ath.usd.toLocaleString()}`,
                  change: `${market_data.ath_change_percentage.usd.toFixed(2)}%`,
                  date: formatDate(market_data.ath_date.usd)
                },
                {
                  label: "All-Time Low",
                  value: `$${market_data.atl.usd.toLocaleString()}`,
                  change: `${market_data.atl_change_percentage.usd.toFixed(2)}%`,
                  date: formatDate(market_data.atl_date.usd)
                },
              ].map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-[#768396]">{item.label}</span>
                  <div className="text-right">
                    <div className="text-sm text-[#111827] font-medium flex items-center justify-end gap-2">
                      {item.value}
                      {item.change && (
                        <span className={item.change.startsWith('-') ? 'text-[#DC2626]' : 'text-[#14B079]'}>
                          {item.change}
                        </span>
                      )}
                    </div>
                    {item.date && (
                      <div className="text-xs text-[#768396] mt-1">{item.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

