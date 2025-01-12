'use client'

import { useState } from 'react'

export function NavigationTabs() {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Fundamentals', 'News Insights', 'Sentiments', 'Team', 'Technicals', 'Tokenomics']

  return (
    <div className="border-b">
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex min-w-full px-4 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 sm:px-4 relative whitespace-nowrap text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${
                activeTab === tab
                  ? "text-[#0141CF]"
                  : "text-[#3E424A] hover:text-[#0141CF]"
              }`}
              style={{ marginRight: "12px" }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0141CF]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

