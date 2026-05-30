import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Maximize2, Bed, Bath, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Premium Properties | Apna Ghar Consultants — Kota & Jaipur" },
      {
        name: "description",
        content: "Browse our exclusive collection of luxury residential plots, villas, farmhouses, apartments, and commercial properties in Kota and Jaipur with premium locations.",
      },
      {
        name: "keywords",
        content: "luxury properties, residential plots, villas, farmhouses, apartments, commercial property, Kota, Jaipur",
      },
      { property: "og:title", content: "Premium Properties | Apna Ghar Consultants" },
      {
        property: "og:description",
        content: "Exclusive collection of luxury properties in Kota and Jaipur",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=2" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertiesPage,
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

function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-muted to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3 sm:mb-4 tracking-wide">
            Our Luxury Portfolio
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium properties across Kota and Jaipur. From residential plots to luxury villas, find your dream investment.
          </p>
        </div>
      </div>
    </section>
  );
}

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  image: string;
  description: string;
  sqft: string;
  beds?: number;
  baths?: number;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Premium Corner Plot",
    location: "Malviya Nagar, Jaipur",
    type: "Residential Plot",
    price: "₹28,00,000",
    image: "https://picsum.photos/600/400?random=101",
    description: "Spacious corner plot in prime residential zone with all utilities and excellent appreciation potential.",
    sqft: "2,500 sq.ft",
  },
  {
    id: 2,
    title: "Luxury Villa with Garden",
    location: "Vaishali Nagar, Jaipur",
    type: "Villa",
    price: "₹75,00,000",
    image: "https://picsum.photos/600/400?random=102",
    description: "Stunning 4-bedroom villa featuring private garden, modern interiors, and premium finishes in prestigious community.",
    sqft: "4,500 sq.ft",
    beds: 4,
    baths: 3,
  },
  {
    id: 3,
    title: "Premium Farmhouse",
    location: "Jagatpura, Jaipur",
    type: "Farmhouse",
    price: "₹45,00,000",
    image: "https://picsum.photos/600/400?random=103",
    description: "Sprawling farmhouse with expansive land, organic cultivation space, and weekend retreat potential near city outskirts.",
    sqft: "3,000 sq.ft + 5 acres",
  },
  {
    id: 4,
    title: "Luxury Apartment",
    location: "C-Scheme, Jaipur",
    type: "Apartment",
    price: "₹65,00,000",
    image: "https://picsum.photos/600/400?random=104",
    description: "Luxurious 3-bedroom apartment in premium residential area with modern kitchen, spacious balcony, and excellent amenities.",
    sqft: "2,200 sq.ft",
    beds: 3,
    baths: 2,
  },
  {
    id: 5,
    title: "Commercial Office Space",
    location: "Talwandi, Kota",
    type: "Commercial",
    price: "₹2,50,00,000",
    image: "https://picsum.photos/600/400?random=105",
    description: "Prime commercial space in business hub with high visibility, modern infrastructure, and strong rental returns.",
    sqft: "8,000 sq.ft",
  },
  {
    id: 6,
    title: "Gated Villa Community Plot",
    location: "Kunhadi, Kota",
    type: "Residential Plot",
    price: "₹32,00,000",
    image: "https://picsum.photos/600/400?random=106",
    description: "Exclusive gated community plot with landscaped surroundings, 24/7 security, and community amenities.",
    sqft: "3,200 sq.ft",
  },
  {
    id: 7,
    title: "Premium Villa with Courtyard",
    location: "Vigyan Nagar, Jaipur",
    type: "Villa",
    price: "₹1,20,00,000",
    image: "https://picsum.photos/600/400?random=107",
    description: "Elegant 4-bedroom villa with private courtyard, terraced gardens, and premium modern architecture ideal for discerning investors.",
    sqft: "3,500 sq.ft",
    beds: 4,
    baths: 4,
  },
  {
    id: 8,
    title: "Heritage Style Bungalow",
    location: "Bani Park, Jaipur",
    type: "Villa",
    price: "₹85,00,000",
    image: "https://picsum.photos/600/400?random=108",
    description: "Beautiful 5-bedroom heritage-style bungalow with traditional architecture, spacious grounds, and strong investment potential.",
    sqft: "5,200 sq.ft",
    beds: 5,
    baths: 4,
  },
];

function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate({ to: `/property/${property.id}` });
  };

  const handleContact = () => {
    toast.success(`Connected! We'll send you details about ${property.title}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-border/50 hover:border-accent/50">
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-56 bg-muted">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{property.location}</span>
          </div>
          <p className="text-sm text-foreground/70 line-clamp-2">{property.description}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-foreground/60 border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4 text-gold" />
            <span>{property.sqft}</span>
          </div>
          {property.beds && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-gold" />
              <span>{property.beds} Beds</span>
            </div>
          )}
          {property.baths && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-gold" />
              <span>{property.baths} Baths</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="border-t border-border pt-3">
          <p className="text-xl sm:text-2xl font-serif font-bold text-accent mb-4">
            {property.price}
          </p>

          {/* CTAs */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gold/50 hover:bg-gold/10"
              onClick={handleViewDetails}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Details</span>
              <span className="sm:hidden">Info</span>
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-accent hover:bg-accent/90"
              onClick={handleContact}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Contact</span>
              <span className="sm:hidden">Call</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Properties Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Can't Find Your Dream Property?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our expert team can help you find the perfect property or customize a solution for your investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90"
              onClick={() => {
                toast.success("Expert team will reach out to you shortly!");
              }}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Expert
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/50 hover:bg-gold/10"
              onClick={() => {
                toast.success("We'll contact you with personalized recommendations!");
              }}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Request Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-serif text-base font-bold border border-gold/40">
                  AG
                </div>
                <div>
                  <div className="font-serif text-sm font-bold text-primary">APNA GHAR</div>
                  <div className="text-xs tracking-[0.15em] text-muted-foreground">CONSULTANTS</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Your trusted partner for luxury real estate in Kota & Jaipur.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="/properties" className="hover:text-accent transition-colors">Properties</a></li>
                <li><a href="/#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="/faq" className="hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/#services" className="hover:text-accent transition-colors">Buy Property</a></li>
                <li><a href="/#services" className="hover:text-accent transition-colors">Sell Property</a></li>
                <li><a href="/emi-calculator" className="hover:text-accent transition-colors">EMI Calculator</a></li>
                <li><a href="/list-property" className="hover:text-accent transition-colors">List Property</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📞 +91 9876543210</li>
                <li>📧 info@apnaghar.com</li>
                <li>Kota & Jaipur, Rajasthan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Apna Ghar Consultants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
