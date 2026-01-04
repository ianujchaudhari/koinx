"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Tokenomics() {
  const data = {
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#0082FF", "#FAA002"],
        borderWidth: 0,
      },
    ],
    labels: ["Crowdsale investors: 80%", "Foundation: 20%"],
  };

  const [chartSize, setChartSize] = useState({
    width: 400,
    height: 400,
  });

  console.log(chartSize);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth < 768 ? 350 : 400;
      setChartSize({ width, height: width });
    };

    updateSize(); // Initial sizing
    window.addEventListener("resize", updateSize); // Resize listener
    return () => window.removeEventListener("resize", updateSize); // Cleanup
  }, []);

  const style = {
    width: chartSize.width,
    height: chartSize.height,
  };

  return (
    <div className="bg-white rounded-lg border border-[#D3DFEE] p-6 max-w-full overflow-hidden">
      <h2 className="text-2xl font-semibold text-[#0F1629] mb-5">Tokenomics</h2>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#1D1D1D]">
          Initial Distribution
        </h3>
        <div className="flex items-start justify-start">
          <div
            style={style}
            className="chart-container w-64 h-64 -mt-20 -mb-32 md:-mb-20"
          >
            <Doughnut
              data={data}
              options={{
                cutout: "70%",
                maintainAspectRatio: false,
                responsive: true,
                onResize: (chart) => {
                  const canvas = chart.canvas;
                  canvas.width = 400; // Desired width
                  canvas.height = 400; // Desired height
                },
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 20,
                      font: {
                        size: 12,
                        family: "Inter",
                        weight: "normal",
                      },
                      color: "#1D1D1D",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <p className="text-base text-[#3E424A] leading-7">
          The initial token distribution was designed to ensure long-term stability and growth of the ecosystem. 80% of the supply was allocated to crowdsale investors to foster wide distribution and community ownership from day one. The remaining 20% was reserved for the Foundation to fund ongoing development, marketing, and ecosystem grants, ensuring the project remains sustainable and innovative for years to come.
        </p>
      </div>
    </div>
  );
}
