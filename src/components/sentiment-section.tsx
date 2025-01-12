"use client";

import { useRef, useState, useEffect } from "react";
import { InfoIcon, TrendingUp, Newspaper } from 'lucide-react';
import type { AnalystEstimate, KeyEvent } from "../types/sentiments";

export function SentimentSection() {
  const analystData: AnalystEstimate[] = [
    { type: "Buy", percentage: 76, color: "#00B386" },
    { type: "Hold", percentage: 8, color: "#C7C8CE" },
    { type: "Sell", percentage: 16, color: "#F7324C" },
  ];

  const dominantEstimate = analystData.reduce((prev, current) =>
    prev.percentage > current.percentage ? prev : current
  );

  const keyEvents: KeyEvent[] = [
    {
      icon: "trending",
      title:
        "Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.",
      backgroundColor: "#E8F4FD",
      iconColor: "#0082FF",
    },
    {
      icon: "news",
      title:
        "Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.",
      backgroundColor: "#EBF9F4",
      iconColor: "#0FBA83",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -472 : 472;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h2 className="text-xl md:text-2xl font-semibold text-[#0F1629] mb-6">Sentiment</h2>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold text-[#44475B]">Key Events</h3>
            <InfoIcon className="w-5 h-5 text-[#7C7E8C]" />
          </div>

          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow"
                aria-label="Scroll left"
              >
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path
                    d="M5 1L1 5L5 9"
                    stroke="#999999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2"
              onScroll={checkScroll}
            >
              {keyEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex-none w-[300px] md:w-[456px] rounded-lg p-4 md:p-5 flex gap-3"
                  style={{ backgroundColor: event.backgroundColor }}
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: event.iconColor }}
                  >
                    {event.icon === "trending" ? (
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    ) : (
                      <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#191C1F] mb-2 text-sm md:text-base">
                      {event.title}
                    </h4>
                    <p className="text-xs md:text-sm text-[#3E424A] leading-5 md:leading-6">
                      {event.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow"
                aria-label="Scroll right"
              >
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path
                    d="M1 1L5 5L1 9"
                    stroke="#999999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold text-[#44475B]">
              Analyst Estimates
            </h3>
            <InfoIcon className="w-5 h-5 text-[#7C7E8C]" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-12">
            <div className="flex items-center justify-center w-[96px] h-[96px] md:w-[116px] md:h-[116px] rounded-full bg-[#EBF9F4]">
              <span className="text-[#0FBA83] text-3xl md:text-4xl font-semibold">
                {dominantEstimate.percentage}%
              </span>
            </div>

            <div className="flex-1 space-y-4 w-full max-w-md md:max-w-none">
              {analystData.map((estimate) => (
                <div key={estimate.type} className="flex items-center gap-4">
                  <span className="text-sm text-[#7C7E8C] w-8">
                    {estimate.type}
                  </span>
                  <div className="w-full h-2 rounded-full bg-transparent">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: estimate.color,
                        width: `${estimate.percentage}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-[#7C7E8C] w-12">
                    {estimate.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

