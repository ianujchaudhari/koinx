import { ArrowUpRight } from 'lucide-react'

export function TrendingSection() {
  const trendingCoins = [
    { name: 'Ethereum', symbol: 'ETH', change: '+8.21%' },
    { name: 'Bitcoin', symbol: 'BTC', change: '+4.32%' },
    { name: 'Polygon', symbol: 'MATIC', change: '+4.32%' },
  ]

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Trending Coins (24h)</h2>
      <div className="space-y-3">
        {trendingCoins.map((coin) => (
          <div key={coin.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{coin.name}</span>
              <span className="text-sm">({coin.symbol})</span>
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="w-4 h-4" />
              {coin.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

