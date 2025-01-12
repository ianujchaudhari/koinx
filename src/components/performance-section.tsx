import { InfoIcon } from 'lucide-react'

export function PerformanceSection() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-[#0F1629] mb-4 md:mb-6">Performance</h2>
      
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#44475B] font-medium">Today's Low</div>
              <div className="text-sm text-[#44475B] font-medium">Today's High</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#44475B] font-medium">46,930.22</span>
              <div className="flex-1 h-[6px] rounded-lg bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
              <span className="text-sm text-[#44475B] font-medium">49,343.83</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#44475B] font-medium">52W Low</div>
              <div className="text-sm text-[#44475B] font-medium">52W High</div>
            </div>
            <div className="flex items-center gap-2">
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
                { label: "Bitcoin Price", value: "$46,953.04" },
                { label: "24h Low / 24h High", value: "$46,907.47 / $49,343.83" },
                { label: "7d Low / 7d High", value: "$46,907.47 / $49,343.83" },
                { label: "Trading Volume", value: "$12,848,950,784" },
                { label: "Market Cap Rank", value: "#1" },
              ].map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-[#768396]">{item.label}</span>
                  <span className="text-sm text-[#111827] font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="divide-y divide-[#D3DFEE] mt-4 md:mt-0">
              {[
                { label: "Market Cap", value: "$922,597,082,047" },
                { label: "Market Cap Dominance", value: "38.343%" },
                { label: "Volume / Market Cap", value: "0.0138" },
                {
                  label: "All-Time High",
                  value: "$69,044.77",
                  change: "↓-31.75%",
                  date: "Nov 10, 2021 (about 1 year)"
                },
                {
                  label: "All-Time Low",
                  value: "$67.81",
                  change: "↑69,259.63%",
                  date: "Jul 06, 2013 (over 9 years)"
                },
              ].map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-[#768396]">{item.label}</span>
                  <div className="text-right">
                    <div className="text-sm text-[#111827] font-medium flex items-center gap-2">
                      {item.value}
                      {item.change && (
                        <span className={item.change.startsWith('↑') ? 'text-[#14B079]' : 'text-[#DC2626]'}>
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

