import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Percent, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "Home Loan EMI Calculator | Apna Ghar Consultants" },
      {
        name: "description",
        content: "Calculate your home loan EMI instantly with our advanced calculator. Plan your property purchase in Kota & Jaipur with accurate loan estimates.",
      },
      {
        name: "keywords",
        content: "EMI calculator, home loan, loan calculator, property financing, home loan EMI",
      },
      { property: "og:title", content: "Home Loan EMI Calculator | Apna Ghar Consultants" },
      {
        property: "og:description",
        content: "Free home loan EMI calculator for property purchases",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=4" },
    ],
  }),
  component: EMICalculatorPage,
});

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif text-lg font-bold border border-gold/40">
              AG
            </div>
            <div className="leading-tight">
              <div className="font-serif text-base sm:text-lg font-bold text-primary tracking-wide">
                APNA GHAR
              </div>
              <div className="text-[10px] sm:text-xs tracking-[0.25em] text-muted-foreground">
                CONSULTANTS
              </div>
            </div>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
}

function calculateEMI(
  loanAmount: number,
  annualRate: number,
  years: number
): { emi: number; totalInterest: number; totalPayable: number } {
  if (loanAmount <= 0 || annualRate < 0 || years <= 0) {
    return { emi: 0, totalInterest: 0, totalPayable: 0 };
  }

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) {
    const emi = loanAmount / months;
    return { emi, totalInterest: 0, totalPayable: loanAmount };
  }

  const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const emi = numerator / denominator;

  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;

  return { emi, totalInterest, totalPayable };
}

function EMICalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(3000000);
  const [downPayment, setDownPayment] = useState(600000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const loanAmount = Math.max(0, propertyValue - downPayment);
  const { emi, totalInterest, totalPayable } = calculateEMI(
    loanAmount,
    interestRate,
    loanTenure
  );

  const downPaymentPercent =
    propertyValue > 0 ? ((downPayment / propertyValue) * 100).toFixed(1) : "0";

  const handleReset = () => {
    setPropertyValue(3000000);
    setDownPayment(600000);
    setInterestRate(8.5);
    setLoanTenure(20);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 bg-gradient-to-b from-secondary/40 to-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs tracking-[0.5em] text-accent mb-6 uppercase">
                Financial Planning
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
                EMI
                <span className="text-accent"> Calculator</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Calculate your monthly EMI, total interest, and payable amount instantly. Plan your
                home loan with confidence and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
              {/* Inputs - Left Side */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-lg">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-2">
                    Loan Details
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 sm:mb-8">
                    Adjust the values below to calculate your EMI
                  </p>
                  <div className="h-1 w-12 bg-accent mb-6 sm:mb-8" />

                  <div className="space-y-6 sm:space-y-8">
                    {/* Property Value */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
                        <Label className="flex items-center gap-2 font-medium">
                          <Home className="h-4 w-4 text-accent shrink-0" />
                          <span>Property Value</span>
                        </Label>
                        <span className="font-serif text-lg font-bold text-primary">
                          {formatCurrency(propertyValue)}
                        </span>
                      </div>
                      <Slider
                        value={[propertyValue]}
                        onValueChange={(value) => {
                          const newValue = value[0];
                          setPropertyValue(newValue);
                          if (downPayment > newValue) {
                            setDownPayment(Math.floor(newValue * 0.2));
                          }
                        }}
                        min={500000}
                        max={50000000}
                        step={100000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹50 Lakh</span>
                        <span>₹5 Crore</span>
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
                        <Label className="flex items-center gap-2 font-medium">
                          <DollarSign className="h-4 w-4 text-accent shrink-0" />
                          <span>Down Payment ({downPaymentPercent}%)</span>
                        </Label>
                        <span className="font-serif text-lg font-bold text-primary">
                          {formatCurrency(downPayment)}
                        </span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={(value) => setDownPayment(value[0])}
                        min={0}
                        max={propertyValue}
                        step={100000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹0</span>
                        <span>{formatCurrency(propertyValue)}</span>
                      </div>
                    </div>

                    {/* Loan Amount (Display) */}
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <span className="text-sm font-medium text-foreground">Loan Amount</span>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-accent">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
                        <Label className="flex items-center gap-2 font-medium">
                          <Percent className="h-4 w-4 text-accent shrink-0" />
                          <span>Interest Rate (p.a.)</span>
                        </Label>
                        <span className="font-serif text-lg font-bold text-primary">
                          {interestRate.toFixed(2)}%
                        </span>
                      </div>
                      <Slider
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        min={3}
                        max={15}
                        step={0.1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>3%</span>
                        <span>15%</span>
                      </div>
                    </div>

                    {/* Loan Tenure */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
                        <Label className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-accent shrink-0" />
                          <span>Loan Tenure</span>
                        </Label>
                        <span className="font-serif text-lg font-bold text-primary">
                          {loanTenure} Years
                        </span>
                      </div>
                      <Slider
                        value={[loanTenure]}
                        onValueChange={(value) => setLoanTenure(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      className="w-full uppercase tracking-wider transition-all duration-200 hover:bg-accent/5"
                    >
                      Reset Values
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results - Right Side */}
              <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6">
                {/* Monthly EMI Card */}
                <div className="bg-gradient-to-br from-accent to-gold text-primary rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent/80 text-xs font-medium uppercase tracking-wider">
                      Monthly EMI
                    </span>
                    <TrendingUp className="h-5 w-5 text-primary/60" />
                  </div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                    {formatCurrency(emi)}
                  </p>
                  <p className="text-xs text-primary/70 mt-3">
                    Fixed monthly payment for {loanTenure * 12} months
                  </p>
                </div>

                {/* Total Interest Card */}
                <div className="bg-card border-2 border-destructive/20 rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-destructive/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Total Interest
                    </span>
                    <DollarSign className="h-5 w-5 text-destructive/60" />
                  </div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-destructive">
                    {formatCurrency(totalInterest)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Interest payable over {loanTenure} years
                  </p>
                </div>

                {/* Total Payable Card */}
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Total Payable
                    </span>
                    <Home className="h-5 w-5 text-accent/60" />
                  </div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    {formatCurrency(totalPayable)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Total amount over {loanTenure * 12} months
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-secondary/40 rounded-lg p-4 sm:p-6 border border-border">
                  <h3 className="font-serif text-xs font-bold text-primary uppercase tracking-wide mb-4">
                    Quick Summary
                  </h3>
                  <div className="space-y-2 sm:space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Value</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(propertyValue)}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-border">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(downPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold text-accent">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Finance Tips Section */}
        <section className="py-24 bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-xs tracking-[0.4em] text-accent uppercase mb-3">
                Financial Guidance
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary">
                Home Loan Tips
              </h2>
              <div className="mt-4 mx-auto h-1 w-16 bg-accent" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Down Payment Strategy",
                  description:
                    "A higher down payment (20-30%) reduces your loan amount, interest burden, and monthly EMI. It also improves loan approval chances.",
                },
                {
                  title: "Loan Tenure Planning",
                  description:
                    "Choose shorter tenure for lower interest but higher EMI, or longer tenure for lower EMI but higher interest. Balance based on your income.",
                },
                {
                  title: "Interest Rates",
                  description:
                    "Monitor interest rates and refinance when rates drop. Even 0.5% reduction can save significant interest over the loan period.",
                },
                {
                  title: "EMI-to-Income Ratio",
                  description:
                    "Keep your EMI below 40% of your gross monthly income for financial stability and flexibility for other expenses.",
                },
                {
                  title: "Prepayment Benefits",
                  description:
                    "Make lump sum payments or increase EMI whenever possible. Prepayment reduces principal and saves substantial interest.",
                },
                {
                  title: "Documentation Ready",
                  description:
                    "Keep property documents, income proofs, and tax returns ready. Quick documentation ensures faster loan processing and approval.",
                },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="group bg-card border border-border p-8 rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="font-serif text-lg font-bold text-primary mb-3">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Use this EMI calculator to plan your budget. Our experts are ready to guide you
              through every step of your home loan journey.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" className="uppercase tracking-widest px-8">
                Call: +91 70149 30206
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="uppercase tracking-widest px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="font-serif text-2xl font-bold">
                AG <span className="text-gold">Apna Ghar</span>
              </div>
              <div className="text-xs tracking-[0.3em] text-primary-foreground/60 mt-1 uppercase">
                Consultants
              </div>
              <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
                Your trusted partner in real estate since 2012 — connecting people with their dream
                homes across Rajasthan.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#faq" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/emi-calculator" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>+91 70149 30206</li>
                <li>ApnaGharConsultants2012@gmail.com</li>
                <li>Kota & Jaipur, Rajasthan</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
            Copyright © 2023 Apna Ghar Consultants. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
