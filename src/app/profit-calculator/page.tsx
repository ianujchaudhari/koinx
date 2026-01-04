"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/page-layout";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

function CalculatorInput({ label, value, onChange, placeholder, prefix, suffix }: CalculatorInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F1629]">{label}</label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {prefix}
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-[#D3DFEE] bg-[#EFF2F5] p-3 text-sm font-medium text-[#0F1629] focus:outline-none focus:ring-2 focus:ring-[#0052FE] ${
            prefix ? "pl-8" : ""
          } ${suffix ? "pr-8" : ""}`}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

interface CalculationResult {
  profit: number;
  growth: number;
  totalValue: number;
}

export default function ProfitCalculatorPage() {
  const [investment, setInvestment] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [investmentFee, setInvestmentFee] = useState("0");
  const [exitFee, setExitFee] = useState("0");
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const calculateProfit = () => {
      const inv = parseFloat(investment);
      const initP = parseFloat(initialPrice);
      const sellP = parseFloat(sellingPrice);
      const invFee = parseFloat(investmentFee);
      const exFee = parseFloat(exitFee);
  
      if (isNaN(inv) || isNaN(initP) || isNaN(sellP)) {
        setResult(null);
        return;
      }
  
      const effectiveInvestment = inv - (inv * (isNaN(invFee) ? 0 : invFee) / 100);
      const coinUnits = effectiveInvestment / initP;
      const rawSaleValue = coinUnits * sellP;
      const effectiveSaleValue = rawSaleValue - (rawSaleValue * (isNaN(exFee) ? 0 : exFee) / 100);
      
      const netProfit = effectiveSaleValue - inv;
      const growth = (netProfit / inv) * 100;
  
      setResult({
        profit: netProfit,
        growth: growth,
        totalValue: effectiveSaleValue
      });
    };

    calculateProfit();
  }, [investment, initialPrice, sellingPrice, investmentFee, exitFee]);

  const breadcrumb = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-primary">
        Cryptocurrencies
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-black">Profit Calculator</span>
    </div>
  );

  return (
    <PageLayout breadcrumb={breadcrumb}>
      <div className="bg-white rounded-lg border border-[#D3DFEE] p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-[#0F1629] mb-6">
          Crypto Profit Calculator
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CalculatorInput
            label="Investment Amount"
            value={investment}
            onChange={setInvestment}
            placeholder="0.00"
            prefix="$"
          />
          <CalculatorInput
            label="Initial Coin Price"
            value={initialPrice}
            onChange={setInitialPrice}
            placeholder="0.00"
            prefix="$"
          />
          <CalculatorInput
            label="Selling Coin Price"
            value={sellingPrice}
            onChange={setSellingPrice}
            placeholder="0.00"
            prefix="$"
          />
          <div className="grid grid-cols-2 gap-4">
             <CalculatorInput
                label="Investment Fee"
                value={investmentFee}
                onChange={setInvestmentFee}
                placeholder="0.00"
                suffix="%"
              />
              <CalculatorInput
                label="Exit Fee"
                value={exitFee}
                onChange={setExitFee}
                placeholder="0.00"
                suffix="%"
              />
          </div>
        </div>

        {result && (
          <div className="bg-[#EBF9F4] rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
             <h3 className="text-lg font-semibold text-[#0F1629]">Net Profit / Loss</h3>
             <div className={`text-4xl font-bold ${result.profit >= 0 ? "text-[#0FBA83]" : "text-[#F7324C]"}`}>
                {result.profit >= 0 ? "+" : ""}${result.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
             <div className={`text-lg font-medium ${result.growth >= 0 ? "text-[#0FBA83]" : "text-[#F7324C]"}`}>
                {result.growth >= 0 ? "+" : ""}{result.growth.toFixed(2)}%
             </div>
             <p className="text-sm text-[#3E424A] mt-2">
                Total Exit Value: <span className="font-bold">${result.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
