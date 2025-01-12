"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Modify the width and height attributes
      canvasRef.current.width = 400; // Set desired width
      canvasRef.current.height = 400; // Set desired height
    }
  }, []);

  const style = {
    width: window.innerWidth < 768 ? "350px" : "400px",
    height: window.innerWidth < 768 ? "350px" : "400px",
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
          Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare
          vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum
          amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus
          eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse
          urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet
          bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel
          ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit
          mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
        </p>
      </div>
    </div>
  );
}
