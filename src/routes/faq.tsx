import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Real Estate FAQ | Apna Ghar Consultants" },
      {
        name: "description",
        content:
          "Frequently asked questions about buying, selling, and investing in properties. Expert answers about loans, site visits, and real estate in Kota & Jaipur.",
      },
      {
        name: "keywords",
        content:
          "real estate FAQ, property questions, home loan FAQ, real estate advice, Kota, Jaipur",
      },
      { property: "og:title", content: "Real Estate FAQ | Apna Ghar Consultants" },
      {
        property: "og:description",
        content: "Get answers to your real estate questions from our expert team",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=3" },
    ],
  }),
  component: FAQPage,
});

const FAQ_ITEMS = [
  {
    category: "Buying Property",
    items: [
      {
        q: "What is the process of buying a property through Apna Ghar?",
        a: "Our team guides you through each step: property selection, site visits, documentation verification, negotiation, legal checks, loan processing, and final registration. We handle everything to ensure a smooth and transparent transaction.",
      },
      {
        q: "Do you charge for consultation on buying?",
        a: "No. Initial consultations and site visits are completely free. We earn only when you successfully close a deal through us. Our transparent fee structure ensures no hidden charges.",
      },
      {
        q: "Can you help with home loan approval?",
        a: "Yes. We partner with leading banks and NBFCs to help you secure the best interest rates and process your loan application smoothly. Our experts guide you through the entire approval process.",
      },
      {
        q: "How do I know if a property is worth its price?",
        a: "Our market analysis team conducts thorough property valuations based on location, amenities, market trends, and comparable properties. We ensure you never overpay and get the best deal in the market.",
      },
    ],
  },
  {
    category: "Selling Property",
    items: [
      {
        q: "What documentation do I need to sell my property?",
        a: "Essential documents include property deed, mutation certificate, tax receipts, approved building plans, NOC from local authority, and a clear title report. Our legal team verifies all documents and handles the paperwork.",
      },
      {
        q: "How long does it take to sell a property?",
        a: "Property sale duration varies from 2 weeks to 3 months depending on market conditions, property type, and documentation readiness. We work to accelerate the process without compromising transparency.",
      },
      {
        q: "Can I sell a property with outstanding loans?",
        a: "Yes. The loan amount is typically settled at the time of sale from the sale proceeds. We coordinate with your lender to ensure smooth loan closure and property transfer.",
      },
    ],
  },
  {
    category: "Brokerage & Commissions",
    items: [
      {
        q: "What is the brokerage fee structure?",
        a: "Our brokerage is transparent and competitive, typically 1-2% of the transaction value depending on the property type and location. We provide a written quote before proceeding with any transaction.",
      },
      {
        q: "Who pays the broker commission?",
        a: "Traditionally, the property seller pays the brokerage commission. However, this can be negotiated between buyer and seller. We clearly communicate the fee structure before any transaction.",
      },
      {
        q: "Are there any hidden charges?",
        a: "Absolutely not. We believe in complete transparency. All charges are clearly mentioned upfront, including documentation fees, legal verification costs, and registration expenses.",
      },
    ],
  },
  {
    category: "Home Loans & Finance",
    items: [
      {
        q: "What are the eligibility criteria for a home loan?",
        a: "Banks typically require: stable income for 2+ years, credit score above 650, debt-to-income ratio under 40%, and adequate down payment (15-20%). Our finance experts help optimize your profile for loan approval.",
      },
      {
        q: "What documents are needed for a home loan application?",
        a: "Required documents include identity proof, address proof, income certificate, bank statements (6-12 months), property documents, NOC from employer, and tax returns. We assist in collecting and organizing all required paperwork.",
      },
      {
        q: "Can I get a loan for properties outside my city?",
        a: "Yes. Most banks offer home loans for properties across India. However, property valuation and loan approval criteria may differ by location. We navigate these regional variations for you.",
      },
    ],
  },
  {
    category: "Site Visits & Inspections",
    items: [
      {
        q: "Do you provide free site visit facilities?",
        a: "Yes. We offer completely free pickup and drop facility from your location to visit project sites and properties. Schedule your visit at your convenience with our team.",
      },
      {
        q: "What should I check during a property site visit?",
        a: "Inspect structural integrity, plumbing, electrical systems, ventilation, waterproofing, neighborhood amenities, parking, and building maintenance. Our experts guide you through a comprehensive checklist.",
      },
      {
        q: "Can I visit multiple properties in one day?",
        a: "Absolutely. We organize customized property tours based on your preferences. Whether you want to see 2 or 10 properties, we create an efficient itinerary.",
      },
    ],
  },
  {
    category: "Legal & Documentation",
    items: [
      {
        q: "What is property registration and why is it important?",
        a: "Registration is the legal process of recording your property ownership with the government. It provides legal protection and proof of ownership. We handle all registration formalities and ensure it's done correctly.",
      },
      {
        q: "What checks are done before property purchase?",
        a: "We conduct thorough checks including title verification, encumbrance search, mutation status, tax payment status, legal disputes, and structural compliance. This ensures you buy a property free from legal issues.",
      },
      {
        q: "How long does property registration take?",
        a: "The registration process typically takes 10-15 days after document submission. In some cases, it may take up to 30 days. We expedite the process through our government connections.",
      },
    ],
  },
  {
    category: "Investment & Returns",
    items: [
      {
        q: "Is real estate a good investment?",
        a: "Real estate offers stable appreciation (8-12% annually), rental income, tax benefits, and inflation hedge. We help identify high-potential properties in emerging areas with strong appreciation prospects.",
      },
      {
        q: "What factors determine property appreciation?",
        a: "Location, infrastructure development, connectivity, amenities, demographic growth, and market demand drive property appreciation. We analyze these factors to recommend investment-ready properties.",
      },
    ],
  },
  {
    category: "Commercial Property",
    items: [
      {
        q: "Do you deal in commercial properties?",
        a: "Yes. We specialize in commercial properties including retail shops, offices, warehouses, and industrial spaces. We guide investors and businesses in finding premium commercial real estate.",
      },
      {
        q: "What is the return on commercial property investment?",
        a: "Commercial properties typically offer 8-15% annual rental returns depending on location and tenant quality. We help identify high-performing commercial assets with strong rental yields.",
      },
    ],
  },
];

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

function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 bg-gradient-to-b from-secondary/40 to-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-xs tracking-[0.5em] text-accent mb-6 uppercase">
                Got Questions?
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
                Frequently Asked
                <span className="text-accent"> Questions</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Find comprehensive answers to common questions about buying, selling, investing, and
                all aspects of real estate with Apna Ghar Consultants.
              </p>
              <div className="mt-8 flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="uppercase tracking-widest px-8" asChild>
                  <a href="#contact">Contact Us</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="uppercase tracking-widest px-8"
                  asChild
                >
                  <a href="/">Back Home</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {FAQ_ITEMS.map((section, idx) => (
              <div key={idx} className="mb-12 sm:mb-16 last:mb-0">
                <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    {section.category}
                  </h2>
                  <div className="mt-3 h-1 w-12 bg-accent" />
                </div>
                <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <AccordionItem key={itemIdx} value={`${idx}-${itemIdx}`}>
                      <AccordionTrigger className="text-left font-serif text-sm sm:text-base font-semibold text-primary hover:text-accent transition-all duration-200 py-3 sm:py-4 px-4 sm:px-6 bg-card border border-border rounded-lg hover:border-accent/50 data-[state=open]:border-accent data-[state=open]:bg-accent/5">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 bg-card/50 border border-border border-t-0 rounded-b-lg text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our expert team is ready to help you with any questions or concerns. Reach out to us
              today for a free consultation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" className="uppercase tracking-widest px-8">
                Call: +91 70149 30206
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="uppercase tracking-widest px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Get in Touch
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
                  <a
                    href="/"
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    FAQ Preview
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
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
