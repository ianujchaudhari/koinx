"use client";

import { useFetchTrendingCoins } from "@/lib/fetchTrendingData";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface YouMayLikeProps {
  title: string;
}

export function YouMayLike({ title }: YouMayLikeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const trendingCoins = useFetchTrendingCoins();

  // Improved scroll check with debounce
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Added small buffer (10px) to prevent flickering
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => {
      // Added timeout to debounce resize events
      setTimeout(checkScroll, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Adjusted scroll amount to match card width + gap
      const scrollAmount = direction === "left" ? -288 : 288; // 272px (card) + 16px (gap)
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative bg-white px-6 py-2">
      {/* Improved header spacing */}
      <h2 className="text-xl font-semibold text-[#0F1629] mb-8">{title}</h2>

      <div className="relative">
        {/* Improved scroll button positioning and size */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300"
            aria-label="Scroll left"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M7 1L2 6L7 11"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Improved card container with consistent spacing */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScroll}
        >
          {trendingCoins.map((coin) => {
             const isPositive = coin.price_change_percentage_24h >= 0;
             return (
            <div
              key={coin.name}
              className="flex-none w-[272px] h-[192px] p-4 bg-white border border-[#E8E8E8] rounded-2xl hover:shadow-[0px_8px_16px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out snap-start"
            >
              {/* Improved header layout with consistent spacing */}
              <div className="flex items-center gap-1 mb-1">
                <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center shrink-0">
                  <Image src={coin.thumb} alt={coin.name} width={20} height={20} className="w-5 h-5" />
                </div>
                <span className="font-sm text-[#0F1629]">{coin.name}</span>
                <span
                  className={`text-sm whitespace-nowrap ${
                    isPositive ? "text-[#14B079]" : "text-[#DC2626]"
                  }`}
                >
                  {isPositive && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>

              {/* Improved price display */}
              <div className="text-l font-semibold text-[#0F1629] mb-4">
                {coin.price}
              </div>

              {/* Improved chart container with proper spacing */}
              <div className="relative h-[60px] w-full flex items-center justify-center">
                <Image
                    src={coin.sparkline}
                    alt="sparkline"
                    fill
                    className="object-contain"
                />
              </div>
            </div>
          )})}
        </div>

        {/* Improved scroll button positioning and size */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300"
            aria-label="Scroll right"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M1 1L6 6L1 11"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
