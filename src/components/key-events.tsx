'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, Newspaper } from 'lucide-react'

export function KeyEvents() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const events = [
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      iconBg: 'bg-[#0082FF]',
      cardBg: 'bg-[#E8F4FD]',
      title: 'Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.',
      description: 'Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.',
    },
    {
      icon: <Newspaper className="w-6 h-6 text-white" />,
      iconBg: 'bg-[#0FBA83]',
      cardBg: 'bg-[#EBF9F4]',
      title: 'Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.',
      description: 'Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.',
    },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:bg-gray-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex-none w-[456px] ${event.cardBg} rounded-lg p-4 flex gap-3`}
          >
            <div className={`w-12 h-12 rounded-full ${event.iconBg} flex items-center justify-center flex-shrink-0`}>
              {event.icon}
            </div>
            <div>
              <h4 className="font-medium text-[#191C1F] mb-2">
                {event.title}
              </h4>
              <p className="text-sm text-[#3E424A] leading-6">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:bg-gray-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

