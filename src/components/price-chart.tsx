'use client'

import { useState } from 'react'
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

export function PriceChart() {
  const [activeTimeframe, setActiveTimeframe] = useState('24H')
  const timeframes = ['1H', '24H', '7D', '1M', '3M', '6M', '1Y', 'ALL']

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
          <Line
            data={{
              labels: Array.from({ length: 24 }, (_, i) => {
                const hour = i % 12 || 12
                const period = i < 12 ? 'AM' : 'PM'
                return `${hour}:00 ${period}`
              }),
              datasets: [
                {
                  data: [
                    46953, 47200, 47500, 47800, 48100, 48400,
                    48700, 49000, 48700, 48400, 48100, 47800,
                    47500, 47200, 46900, 46600, 46300, 46000,
                    45700, 45400, 45700, 46000, 46300, 46600
                  ],
                  borderColor: '#0052FE',
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
                    gradient.addColorStop(0, 'rgba(0, 82, 254, 0.1)')
                    gradient.addColorStop(1, 'rgba(0, 82, 254, 0)')
                    return gradient
                  },
                  borderWidth: 1.5,
                  fill: true,
                  tension: 0.4,
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
                    maxTicksLimit: window.innerWidth < 640 ? 4 : 12,
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
        </div>
      </div>
    </div>
  )
}

