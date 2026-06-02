import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Megaphone,
  Building2,
  Landmark,
  Car,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import heroImg from "@/assets/hero-bedroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apna Ghar Consultants | Luxury Real Estate in Kota & Jaipur" },
      {
        name: "description",
        content:
          "Discover luxury properties, villas, plots & apartments in Kota & Jaipur. Expert real estate consulting, affordable home loans & premium brokerage services.",
      },
      {
        name: "keywords",
        content: "luxury real estate, properties Kota, properties Jaipur, villas, plots, apartments, home loans, real estate consultant",
      },
      { property: "og:title", content: "Apna Ghar Consultants | Luxury Real Estate in Kota & Jaipur" },
      {
        property: "og:description",
        content: "Discover luxury properties, villas, plots & apartments in Kota & Jaipur with expert real estate consulting.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Apna Ghar Consultants | Luxury Real Estate" },
      { name: "twitter:description", content: "Premium properties & real estate solutions in Kota & Jaipur" },
      { name: "twitter:image", content: "https://picsum.photos/1200/630?random=1" },
    ],
  }),
  component: HomePage,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Properties", href: "/properties" },
  { label: "FAQ", href: "#faq" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Brokerage", href: "#brokerage" },
  { label: "Contact us", href: "#contact" },
];

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3 group">
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
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium uppercase tracking-wider text-foreground/80 hover:text-accent hover:underline transition-all duration-200"
              >
                {n.label}
              </a>
            ))}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="px-3 py-2 rounded-md bg-accent/10 border border-accent/30 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-foreground/70 hover:text-accent transition-colors duration-200"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-foreground/70 hover:text-accent transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </nav>
          <button
            className="lg:hidden text-foreground p-2 hover:text-accent transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden pb-4 space-y-1 animate-in fade-in duration-200">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 text-sm uppercase tracking-wider text-foreground/80 hover:text-accent hover:bg-accent/5 transition-all duration-200 rounded"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Luxurious premium bedroom with floor-to-ceiling windows"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-3xl text-white">
          <div className="text-xs sm:text-sm tracking-[0.5em] text-gold mb-6 uppercase">
            Since 2012
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold leading-none">
            ONE STOP
          </h1>
          <div className="mt-4 text-xl sm:text-2xl md:text-3xl tracking-[0.35em] font-light">
            REAL ESTATE SOLUTION
          </div>
          <div className="mt-10">
            <Button
              size="lg"
              variant="outline"
              className="border-white/80 bg-transparent text-white hover:bg-white hover:text-primary uppercase tracking-widest px-10 py-6 text-sm"
              asChild
            >
              <a href="#about">
                Know More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Megaphone,
    title: "Marketing & Sales",
    text: "We specialize in creating concepts, branding, planning, marketing & sales of real estate projects that include residential, commercial, weekend homes, budget homes, retail properties, warehousing, industrial parks and luxury homes.",
  },
  {
    icon: Building2,
    title: "Real Estate Consulting",
    text: "We help you in finding the right property which fits within your budget & preferred location. Our team of experts will help you for free in giving complete information about the projects as per your choice and in finalizing the right property with better rates than the market.",
  },
  {
    icon: Landmark,
    title: "Home Loan Services",
    text: "Finding the right home loan is often a difficult task during the process of home buying. We provide the right guidance based on your needs. We can work with you to get the best home loan in the market with the lowest interest rates.",
  },
  {
    icon: Car,
    title: "Inspection and Site Visits",
    text: "We provide free pickup and drop facility to visit the New Projects Site / sales office. Schedule a no-obligation tour and explore properties with our experts at your convenience.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  light,
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <div className="text-xs tracking-[0.4em] text-accent uppercase mb-3">{eyebrow}</div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold ${
          light ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 mx-auto h-[2px] w-16 bg-accent" />
    </div>
  );
}

function Features() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What we do" title="Our Features" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative bg-card border border-border p-8 rounded-lg hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ABOUT_BLOCKS = [
  {
    id: "about",
    eyebrow: "Since 2012",
    title: "About Us",
    text: "Welcome to APNA GHAR CONSULTANTS, your trusted partner in the world of real estate. We are a dedicated team of real estate consultants committed to helping our clients navigate the dynamic property landscape with confidence, clarity and care.",
  },
  {
    id: "properties",
    eyebrow: "What we offer",
    title: "Our Services",
    text: "Apna Ghar Consultants is a premium luxury and high-end real estate agency that caters to the upper end of the residential and commercial sale and leasing market in KOTA and across Rajasthan with curated, hand-picked inventory.",
  },
  {
    id: "brokerage",
    eyebrow: "Transparent terms",
    title: "Brokerage",
    text: "Where there is any immovable property that is transferred through sale or exchange or by transfer of shares in a Co-operative Society or Company or any other Association of Persons, our brokerage structure is transparent and competitive.",
  },
];

function AboutServices() {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {ABOUT_BLOCKS.map((b) => (
            <article
              key={b.id}
              id={b.id}
              className="bg-card border border-border rounded-lg p-10 flex flex-col scroll-mt-24"
            >
              <div className="text-[10px] tracking-[0.4em] text-accent uppercase mb-3">
                {b.eyebrow}
              </div>
              <h3 className="font-serif text-3xl font-bold text-primary mb-5">{b.title}</h3>
              <div className="h-[2px] w-12 bg-accent mb-6" />
              <p className="text-muted-foreground leading-relaxed flex-1">{b.text}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center text-sm font-semibold text-accent hover:text-primary uppercase tracking-wider transition-colors"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Nikhil Singh Choudhary", role: "Founder / Director at Apna Ghar", initials: "NS" },
  { name: "Shivani Gautam", role: "Partner / Head of Interior Design", initials: "SG" },
  { name: "Neeraj Jangid", role: "Partner / Head of Architect", initials: "NJ" },
];

function Team() {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The people behind" title="Our Team" />
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group text-center bg-card border border-border rounded-lg p-10 hover:shadow-xl hover:border-accent/60 transition-all duration-300"
            >
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-accent to-gold text-primary font-serif text-3xl font-bold border-4 border-background shadow-lg">
                {m.initials}
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-primary">{m.name}</h3>
              <div className="mx-auto mt-3 h-[2px] w-10 bg-accent" />
              <p className="mt-4 text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUERY_OPTIONS = [
  "Buy Property",
  "Sell Property",
  "Investment",
  "Rent/Lease",
  "Other",
];

function ContactSection() {
  const [form, setForm] = useState({ name: "", mobile: "", query: "Buy Property" });

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Validation
  if (!form.name.trim() || !form.mobile.trim()) {
    toast.error("Please fill in your name and mobile number.");
    return;
  }

  if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile)) {
    toast.error("Please enter a valid mobile number.");
    return;
  }

  try {
    // Get API URL from environment variable
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const contactEndpoint = `${apiUrl}/contact`;

    // Send form data to backend
    const response = await fetch(
      contactEndpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          mobileNumber: form.mobile,
          queryAbout: form.query,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success(
        "Thank you! Our team will contact you shortly."
      );

      // Reset form
      setForm({
        name: "",
        mobile: "",
        query: "Buy Property",
      });
    } else {
      toast.error(
        data.message || "Something went wrong. Please try again."
      );
    }
  } catch (error) {
    console.error(error);
    toast.error("Backend connection failed. Please try again later.");
  }
};
  const handleClear = () => setForm({ name: "", mobile: "", query: "Buy Property" });

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Reach out" title="Get In Touch" light />
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-xl font-bold mb-2">Kota Branch</h4>
                  <p className="text-primary-foreground/75 leading-relaxed">
                    Near Gyarah Mukhi Hanuman Mandir, Borkhera, Manpura,
                    <br />
                    Kota, Rajasthan – 324001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-xl font-bold mb-2">Jaipur Branch</h4>
                  <p className="text-primary-foreground/75 leading-relaxed">
                    Shankar Vihar, near Airport Terminal-2, Malviya Nagar,
                    <br />
                    Jaipur – 302017
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+917014930206"
                className="flex items-center gap-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg p-5 hover:border-gold transition-colors"
              >
                <Phone className="h-5 w-5 text-gold" />
                <div>
                  <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">
                    Phone
                  </div>
                  <div className="text-sm font-medium">+91 70149 30206</div>
                </div>
              </a>
              <a
                href="tel:+919079140188"
                className="flex items-center gap-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg p-5 hover:border-gold transition-colors"
              >
                <Phone className="h-5 w-5 text-gold" />
                <div>
                  <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">
                    Phone
                  </div>
                  <div className="text-sm font-medium">+91 90791 40188</div>
                </div>
              </a>
            </div>

            <a
              href="mailto:ApnaGharConsultants2012@gmail.com"
              className="flex items-center gap-3 bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg p-5 hover:border-gold transition-colors"
            >
              <Mail className="h-5 w-5 text-gold" />
              <div className="min-w-0">
                <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">
                  Email
                </div>
                <div className="text-sm font-medium truncate">
                  ApnaGharConsultants2012@gmail.com
                </div>
              </div>
            </a>
          </div>

          {/* Right: Form */}
          <div className="bg-background text-foreground rounded-lg p-8 sm:p-10 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-primary">Contact Form</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Fill it out and we will get in touch with you.
            </p>
            <div className="mt-2 h-[2px] w-12 bg-accent mb-6" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block font-medium text-foreground mb-2">Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  maxLength={100}
                  required
                  className="mt-0 focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="block font-medium text-foreground mb-2">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="+91 9XXXXXXXXX"
                  maxLength={15}
                  required
                  className="mt-0 focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block font-medium text-foreground mb-4">Query About *</label>
                <RadioGroup
                  value={form.query}
                  onValueChange={(v) => setForm({ ...form, query: v })}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {QUERY_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 border border-border rounded-md px-4 py-3 cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-200 has-[:checked]:border-accent has-[:checked]:bg-accent/10"
                    >
                      <RadioGroupItem value={opt} id={`query-${opt}`} />
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 uppercase tracking-wider transition-all duration-200 bg-accent hover:bg-accent/90">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1 uppercase tracking-wider transition-all duration-200"
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Do you charge for consultation?",
      a: "No. Initial consultations and site visits are completely free. We earn only when you successfully close a deal through us.",
    },
    {
      q: "Which cities do you operate in?",
      a: "We have offices in Kota and Jaipur, Rajasthan, and assist clients across the state for residential and commercial properties.",
    },
    {
      q: "Can you help with home loans?",
      a: "Yes. We partner with leading banks and NBFCs to help you secure the best rates and process your loan smoothly.",
    },
    {
      q: "How long does property registration take?",
      a: "The registration process typically takes 10-15 days after document submission. In some cases, it may take up to 30 days. We expedite the process through our government connections.",
    },
    {
      q: "What documentation do I need to sell my property?",
      a: "Essential documents include property deed, mutation certificate, tax receipts, approved building plans, NOC from local authority, and a clear title report. Our legal team verifies all documents and handles the paperwork.",
    },
    {
      q: "Is real estate a good investment?",
      a: "Real estate offers stable appreciation (8-12% annually), rental income, tax benefits, and inflation hedge. We help identify high-potential properties in emerging areas with strong appreciation prospects.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="space-y-3 mb-10">
          {items.map((it, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-primary hover:text-accent transition-colors py-3 px-5 bg-card border border-border rounded-lg hover:border-accent/50 data-[state=open]:border-accent data-[state=open]:bg-accent/5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 bg-card/50 border border-border border-t-0 rounded-b-lg text-muted-foreground leading-relaxed">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="uppercase tracking-wider px-8" asChild>
            <a href="/faq">View All FAQs</a>
          </Button>
          <Button size="lg" variant="outline" className="uppercase tracking-wider px-8" asChild>
            <a href="#contact">Ask a Question</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PremiumCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 tracking-wide">
            Find Your Dream Property Today
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Get expert guidance for buying, selling, investment and premium real estate opportunities in Kota & Jaipur.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/properties" className="flex-1 sm:flex-initial">
            <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90">
              <Building2 className="h-5 w-5 mr-2" />
              Explore Properties
            </Button>
          </a>
          <a href="#contact" className="flex-1 sm:flex-initial">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gold/50 hover:bg-gold/10">
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </a>
          <a href="/properties" className="flex-1 sm:flex-initial">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gold/50 hover:bg-gold/10">
              <Megaphone className="h-5 w-5 mr-2" />
              Browse Properties
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Properties", href: "#properties" },
    { label: "FAQ", href: "/faq" },
    { label: "Brokerage", href: "#brokerage" },
    { label: "Contact us", href: "#contact" },
  ];
  return (
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
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href="tel:+917014930206" className="hover:text-gold transition-colors">
                  +91 70149 30206
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <a href="mailto:ApnaGharConsultants2012@gmail.com" className="hover:text-gold transition-colors truncate">
                  info@apnaghar.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gold" />
                <a href="https://wa.me/917014930206" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5" /> Kota & Jaipur, Rajasthan
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
          Copyright © 2023 Apna Ghar Consultants. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutServices />
        <Team />
        <FAQ />
        <ContactSection />
      </main>
      <PremiumCTA />
      <Footer />
      <FloatingWhatsApp />
      <Toaster richColors position="top-center" />
    </div>
  );
}
