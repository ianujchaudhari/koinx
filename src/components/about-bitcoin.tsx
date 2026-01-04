'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface CoinData {
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    ath: { usd: number };
    atl: { usd: number };
    circulating_supply: number;
    max_supply: number;
  };
}

export function AboutBitcoin() {
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
    return (
      <div className="bg-white rounded-lg border border-[#D3DFEE] p-8 h-[400px] flex items-center justify-center">
        Loading about section...
      </div>
    );
  }

  const { description, market_data } = coinData;

  // Function to format the description into paragraphs
  const formatDescription = (desc: string) => {
    return desc.split('\r\n').filter(p => p.trim().length > 0).map((paragraph, index) => (
      <p key={index} className="text-base text-[#3E424A] leading-7 mb-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
  };

  return (
    <div className="bg-white rounded-lg border border-[#D3DFEE] p-8">
      <h2 className="text-2xl font-semibold text-[#0F1629] mb-5">
        About Bitcoin
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#0F1629] mb-2.5">
            What is Bitcoin?
          </h3>
          <p className="text-base text-[#3E424A] leading-7 mb-6">
            Bitcoin&apos;s price today is US${market_data.current_price.usd.toLocaleString()}, with a 24-hour trading
            volume of ${market_data.total_volume.usd.toLocaleString()}. BTC is {market_data.price_change_percentage_24h > 0 ? '+' : ''}{market_data.price_change_percentage_24h.toFixed(2)}% in the last 24 hours. 
            It has a circulating supply of {market_data.circulating_supply.toLocaleString()} BTC and a max supply of {market_data.max_supply?.toLocaleString() || '21,000,000'} BTC.
          </p>
          <div className="space-y-4">
              {formatDescription(description.en)}
          </div>
        </div>

        <div className="h-[1px] bg-[#D3DFEE]" />

        <div>
          <h3 className="text-xl font-bold text-[#0F1629] mb-5">
            Already Holding Bitcoin?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-[#79F1A4] to-[#0E5CAD] rounded-lg p-4">
              <div className="flex items-center gap-6">
                <Image
                  src="/calculate-profits.svg"
                  alt="Calculate Profits"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-2">
                    Calculate your Profits
                  </h4>
                  <Link href="/profit-calculator">
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Check Now →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FF9865] to-[#EF3031] rounded-lg p-4">
              <div className="flex items-center gap-6">
                <Image
                  src="/calculate-tax.svg"
                  alt="Calculate Tax"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-2">
                    Calculate your tax liability
                  </h4>
                  <Link href="/tax-calculator">
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Check Now →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
