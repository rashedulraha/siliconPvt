"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculateEMI } from "@/lib/emi";
import { formatCurrency } from "@/lib/utils";
import { Analytics } from "@/lib/analytics";

interface EMICalculatorProps {
  initialPrice?: number;
}

export function EMICalculator({ initialPrice }: EMICalculatorProps) {
  const [price, setPrice] = useState(initialPrice || 500000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(20);

  useEffect(() => {
    if (initialPrice) setPrice(initialPrice);
  }, [initialPrice]);

  const result = useMemo(
    () =>
      calculateEMI({
        propertyPrice: price,
        downPaymentPercent: downPayment,
        interestRate: rate,
        loanTermYears: term,
      }),
    [price, downPayment, rate, term],
  );

  const interestPercent =
    result.totalPayment > 0
      ? (result.totalInterest / result.totalPayment) * 100
      : 0;
  const principalPercent = 100 - interestPercent;

  const handleCalculate = () => {
    Analytics.emiCalculate(result.loanAmount, term);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>EMI Calculator</CardTitle>
            <CardDescription>
              Estimate your monthly mortgage payments
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Property Price</Label>
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(price)}
            </span>
          </div>
          <Slider
            value={[price]}
            onValueChange={([v]) => setPrice(v)}
            min={50000}
            max={10000000}
            step={10000}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$50K</span>
            <span>$10M</span>
          </div>
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Down Payment</Label>
            <span className="text-sm font-semibold">
              {downPayment}% ({formatCurrency(result.downPayment)})
            </span>
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={([v]) => setDownPayment(v)}
            min={0}
            max={90}
            step={5}
            className="py-2"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Annual Interest Rate</Label>
            <span className="text-sm font-semibold">{rate}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Loan Term</Label>
            <span className="text-sm font-semibold">{term} years</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              min={1}
              max={30}
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value) || 1)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
            <p className="text-4xl font-bold text-primary">
              {formatCurrency(result.emi)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="font-semibold">
                {formatCurrency(result.loanAmount)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Interest</p>
              <p className="font-semibold">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Payment</p>
              <p className="font-semibold">
                {formatCurrency(result.totalPayment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Loan Term</p>
              <p className="font-semibold">{term * 12} months</p>
            </div>
          </div>

          {/* Visual breakdown */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              Payment Breakdown
            </p>
            <div className="flex h-3 rounded-full overflow-hidden bg-muted">
              <div
                className="bg-primary transition-all"
                style={{ width: `${principalPercent}%` }}
                title={`Principal: ${principalPercent.toFixed(1)}%`}
              />
              <div
                className="bg-secondary transition-all"
                style={{ width: `${interestPercent}%` }}
                title={`Interest: ${interestPercent.toFixed(1)}%`}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Principal ({principalPercent.toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Interest ({interestPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          <DollarSign className="h-4 w-4 mr-2" /> Calculate & Save
        </Button>
      </CardContent>
    </Card>
  );
}
