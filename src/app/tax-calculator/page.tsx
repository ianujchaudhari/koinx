"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/page-layout";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface TaxInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: "text" | "number" | "select";
  options?: string[];
}

function TaxInput({ label, value, onChange, placeholder, prefix, suffix, type = "number", options }: TaxInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F1629]">{label}</label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {prefix}
          </div>
        )}
        {type === "select" ? (
           <select
             value={value}
             onChange={(e) => onChange(e.target.value)}
             className="w-full rounded-lg border border-[#D3DFEE] bg-[#EFF2F5] p-3 text-sm font-medium text-[#0F1629] focus:outline-none focus:ring-2 focus:ring-[#0052FE] appearance-none"
           >
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
           </select>
        ) : (
            <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-lg border border-[#D3DFEE] bg-[#EFF2F5] p-3 text-sm font-medium text-[#0F1629] focus:outline-none focus:ring-2 focus:ring-[#0052FE] ${
                prefix ? "pl-8" : ""
            } ${suffix ? "pr-8" : ""}`}
            />
        )}
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

interface TaxResult {
  capitalGains: number;
  discount: number;
  netCapitalGains: number;
  estimatedTax: number;
  taxRate: string;
}

export default function TaxCalculatorPage() {
  const [financialYear, setFinancialYear] = useState("FY 2023-2024");
  const [country, setCountry] = useState("Australia");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [investmentType, setInvestmentType] = useState("Long Term");
  const [annualIncome, setAnnualIncome] = useState("0");
  const [taxResult, setTaxResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    const calculateTax = () => {
      const buy = parseFloat(purchasePrice) || 0;
      const sell = parseFloat(salePrice) || 0;
      const exp = parseFloat(expenses) || 0;
      const income = parseFloat(annualIncome) || 0;
  
      const capitalGains = sell - buy - exp;
      
      let discount = 0;
      if (capitalGains > 0 && investmentType === "Long Term (> 12 Months)") {
          // Australia 50% discount for > 12 months
          discount = capitalGains * 0.5;
      }
  
      const netCapitalGains = capitalGains - discount;
      
      // Simple tax bracket logic (Approximate for Australia)
      let taxRate = 0;
      if (income <= 18200) taxRate = 0;
      else if (income <= 45000) taxRate = 0.19;
      else if (income <= 120000) taxRate = 0.325;
      else if (income <= 180000) taxRate = 0.37;
      else taxRate = 0.45;
  
      const estimatedTax = Math.max(0, netCapitalGains * taxRate);
  
      setTaxResult({
          capitalGains,
          discount,
          netCapitalGains,
          estimatedTax,
          taxRate: (taxRate * 100).toFixed(1)
      });
    };

    calculateTax();
  }, [purchasePrice, salePrice, expenses, investmentType, annualIncome, country]);

  const breadcrumb = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-primary">
        Cryptocurrencies
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-black">Tax Calculator</span>
    </div>
  );

  return (
    <PageLayout breadcrumb={breadcrumb}>
      <div className="bg-white rounded-lg border border-[#D3DFEE] p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-[#0F1629] mb-6">
          Crypto Tax Calculator
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <TaxInput
                    label="Financial Year"
                    value={financialYear}
                    onChange={setFinancialYear}
                    type="select"
                    options={["FY 2023-2024", "FY 2024-2025"]}
                />
                <TaxInput
                    label="Country"
                    value={country}
                    onChange={setCountry}
                    type="select"
                    options={["Australia", "USA (Coming Soon)"]}
                />
            </div>
          <TaxInput
            label="Purchase Price"
            value={purchasePrice}
            onChange={setPurchasePrice}
            placeholder="Enter purchase price"
            prefix="$"
          />
          <TaxInput
            label="Sale Price"
            value={salePrice}
            onChange={setSalePrice}
            placeholder="Enter sale price"
            prefix="$"
          />
          <TaxInput
            label="Expenses"
            value={expenses}
            onChange={setExpenses}
            placeholder="Enter expenses"
            prefix="$"
          />
          <TaxInput
            label="Investment Type"
            value={investmentType}
            onChange={setInvestmentType}
            type="select"
            options={["Long Term (> 12 Months)", "Short Term (< 12 Months)"]}
          />
          <TaxInput
            label="Annual Income"
            value={annualIncome}
            onChange={setAnnualIncome}
            placeholder="Enter annual income"
            prefix="$"
          />
        </div>

        {taxResult && (
           <div className="bg-[#EBF9F4] rounded-lg p-6 space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-[#3E424A] font-medium">Total Capital Gains</span>
                <span className="font-bold text-[#0F1629]">${taxResult.capitalGains.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[#3E424A] font-medium">Long Term Discount</span>
                <span className="font-bold text-[#0F1629]">${taxResult.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
             </div>
             <div className="h-[1px] bg-[#D3DFEE] w-full" />
             <div className="flex justify-between items-center">
                <span className="text-[#0F1629] font-bold text-lg">Net Capital Gains</span>
                <span className="font-bold text-[#0FBA83] text-lg">${taxResult.netCapitalGains.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
             </div>
             <div className="bg-white rounded p-4 text-center mt-4">
                <p className="text-sm text-[#3E424A] mb-1">Estimated Tax to be paid ({taxResult.taxRate}%)</p>
                <p className="text-2xl font-bold text-[#0052FE]">${taxResult.estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
             </div>
           </div>
        )}
      </div>
    </PageLayout>
  );
}
