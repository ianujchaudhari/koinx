'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ScriptableContext,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

export default function PriceChart() {
  const [activeTimeframe, setActiveTimeframe] = useState('24H')
  const [chartData, setChartData] = useState<{ labels: string[]; prices: number[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const timeframes = ['1H', '24H', '7D', '1M', '3M', '6M', '1Y', 'ALL']

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      try {
        let days = '1'
        switch (activeTimeframe) {
          case '1H':
            days = '1'
            break
          case '24H':
            days = '1'
            break
          case '7D':
            days = '7'
            break
          case '1M':
            days = '30'
            break
          case '3M':
            days = '90'
            break
          case '6M':
            days = '180'
            break
          case '1Y':
            days = '365'
            break
          case 'ALL':
            days = 'max'
            break
        }

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: days,
            },
          }
        )

        let prices = response.data.prices as [number, number][]

        if (activeTimeframe === '1H') {
           // Approximate last hour data (assuming 5 min intervals, take last 12)
           // Or just filter by timestamp
           const oneHourAgo = Date.now() - 60 * 60 * 1000;
           prices = prices.filter(p => p[0] >= oneHourAgo);
        }

        const formattedLabels = prices.map((price) => {
          const date = new Date(price[0])
          if (activeTimeframe === '1H' || activeTimeframe === '24H') {
             return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          } else if (activeTimeframe === '7D' || activeTimeframe === '1M') {
             return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
          }
          return date.toLocaleDateString([], { month: 'short', year: 'numeric' })
        })

        const formattedPrices = prices.map((price) => price[1])

        setChartData({
          labels: formattedLabels,
          prices: formattedPrices,
        })
      } catch (error) {
        console.error('Error fetching chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [activeTimeframe])

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold text-[#0F1629]">Bitcoin Price Chart (USD)</h3>
        <div className="flex flex-wrap items-center gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2.5 py-1 text-xs sm:text-sm rounded-2xl transition-colors ${
                tf === activeTimeframe
                  ? 'bg-[#E2ECFE] text-[#0141CF] font-semibold'
                  : 'text-[#5D6670] hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="h-[250px] sm:h-[420px] w-full">
          {isLoading ? (
             <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
          ) : chartData ? (
            <Line
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    data: chartData.prices,
                    borderColor: '#0052FE',
                    backgroundColor: (context: ScriptableContext<'line'>) => {
                      const ctx = context.chart.ctx
                      const gradient = ctx.createLinearGradient(0, 0, 0, 400)
                      gradient.addColorStop(0, 'rgba(0, 82, 254, 0.1)')
                      gradient.addColorStop(1, 'rgba(0, 82, 254, 0)')
                      return gradient
                    },
                    borderWidth: 1.5,
                    fill: true,
                    tension: 0.1, // Reduced tension for more accurate representation
                    pointRadius: 0,
                    pointHitRadius: 30,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#000000',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    titleFont: {
                      size: 12,
                      weight: 'bold',
                      family: 'Inter',
                    },
                    bodyFont: {
                      size: 12,
                      family: 'Inter',
                    },
                    padding: 8,
                    displayColors: false,
                    callbacks: {
                      title: () => '',
                      label: (context) => `$${context.parsed.y.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    border: {
                      display: false,
                    },
                    ticks: {
                      maxRotation: 0,
                      color: '#616E85',
                      font: {
                        size: 10,
                        family: 'Inter',
                      },
                      padding: 6,
                      maxTicksLimit: window.innerWidth < 640 ? 4 : 8,
                    },
                  },
                  y: {
                    position: 'right',
                    border: {
                      display: false,
                    },
                    grid: {
                      color: '#EFF2F5',
                      drawTicks: false,
                    },
                    ticks: {
                      color: '#616E85',
                      font: {
                        size: 10,
                        family: 'Inter',
                      },
                      padding: 6,
                      callback: (value) => `$${value.toLocaleString('en-US')}`,
                      maxTicksLimit: 5,
                    },
                  },
                },
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
              }}
            />
          ) : (
             <div className="flex items-center justify-center h-full text-red-500">Failed to load data</div>
          )}
        </div>
      </div>
    </div>
  )
}

