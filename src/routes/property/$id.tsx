import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Maximize2, Bed, Bath, Phone, MessageSquare, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/property/$id")({
  head: ({ params }) => {
    const propertyId = parseInt(params.id, 10);
    const property = PROPERTIES_DETAILS[propertyId];
    
    return {
      meta: [
        { title: `${property?.title || "Property Details"} | Apna Ghar Consultants` },
        {
          name: "description",
          content: property?.description || "Luxury property details on Apna Ghar Consultants",
        },
        {
          name: "keywords",
          content: `${property?.title}, ${property?.location}, property, real estate, Kota, Jaipur`,
        },
        { property: "og:title", content: `${property?.title} | Apna Ghar Consultants` },
        {
          property: "og:description",
          content: property?.description || "Luxury property details",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: property?.image || "https://picsum.photos/1200/630?random=6" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyDetailPage,
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
            href="/properties"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Properties</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      </div>
    </header>
  );
}

interface PropertyDetails {
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
  fullDescription: string;
  amenities: string[];
  highlights: string[];
  thumbnails: string[];
}

const PROPERTIES_DETAILS: Record<number, PropertyDetails> = {
  1: {
    id: 1,
    title: "Premium Corner Plot",
    location: "Malviya Nagar, Jaipur",
    type: "Residential Plot",
    price: "₹28,00,000",
    image: "https://picsum.photos/800/500?random=101",
    description: "Spacious corner plot in prime residential zone with all utilities and excellent appreciation potential.",
    sqft: "2,500 sq.ft",
    fullDescription:
      "This premium corner plot in Malviya Nagar offers an exceptional investment opportunity in Jaipur's most sought-after residential zone. Located in a well-planned community with modern infrastructure, the plot benefits from excellent connectivity, proximity to schools, hospitals, and shopping centers. The wide roads and tree-lined avenues provide a serene residential environment perfect for building your dream home.",
    amenities: ["24/7 Security", "Well-paved roads", "Underground drainage", "Street lighting", "Green spaces", "Community center"],
    highlights: [
      "Corner plot with maximum natural light",
      "Close to schools and hospitals",
      "Excellent resale potential",
      "Prime location for residential development",
      "Peaceful, tree-lined community",
      "Modern infrastructure and utilities",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=101",
      "https://picsum.photos/150/150?random=102",
      "https://picsum.photos/150/150?random=103",
      "https://picsum.photos/150/150?random=104",
    ],
  },
  2: {
    id: 2,
    title: "Luxury Villa with Garden",
    location: "Vaishali Nagar, Jaipur",
    type: "Villa",
    price: "₹75,00,000",
    image: "https://picsum.photos/800/500?random=102",
    description: "Stunning 4-bedroom villa featuring private garden, modern interiors, and premium finishes in prestigious community.",
    sqft: "4,500 sq.ft",
    beds: 4,
    baths: 3,
    fullDescription:
      "This luxurious 4-bedroom villa in Vaishali Nagar represents the epitome of modern residential living in Jaipur. Designed with premium finishes and contemporary architecture, the villa features spacious rooms, a modern modular kitchen, and elegant living areas. The private garden offers serene green space for relaxation, while the thoughtful layout maximizes natural light and ventilation throughout the home.",
    amenities: [
      "Modular kitchen",
      "Private garden",
      "Parking space",
      "Water harvesting system",
      "Solar-ready roof",
      "Landscaped terrace",
      "Security intercom",
    ],
    highlights: [
      "4 spacious bedrooms with attached bathrooms",
      "Premium Italian marble flooring",
      "Modern architectural design",
      "Abundant natural light",
      "Premium villa community",
      "Investment-ready property",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=102",
      "https://picsum.photos/150/150?random=105",
      "https://picsum.photos/150/150?random=106",
      "https://picsum.photos/150/150?random=107",
    ],
  },
  3: {
    id: 3,
    title: "Premium Farmhouse",
    location: "Jagatpura, Jaipur",
    type: "Farmhouse",
    price: "₹45,00,000",
    image: "https://picsum.photos/800/500?random=103",
    description: "Sprawling farmhouse with expansive land, organic cultivation space, and weekend retreat potential near city outskirts.",
    sqft: "3,000 sq.ft + 5 acres",
    fullDescription:
      "Escape to this magnificent farmhouse in Jagatpura, perfect for those seeking a blend of urban convenience and rural tranquility. Set on 5 sprawling acres, this property offers ample space for organic farming, landscaping, and agricultural pursuits. The main residential structure features comfortable rooms, modern amenities, and is designed to provide a peaceful retreat from city life while remaining accessible to Jaipur.",
    amenities: ["Agricultural land", "Borewell facility", "Farm house structure", "Guest cottage potential", "Ample storage", "Organic cultivation space"],
    highlights: [
      "5 acres of prime agricultural land",
      "Perfect for farming enthusiasts",
      "Weekend retreat potential",
      "Strong appreciation prospects",
      "Peaceful rural setting",
      "Near Jaipur city limits",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=103",
      "https://picsum.photos/150/150?random=108",
      "https://picsum.photos/150/150?random=109",
      "https://picsum.photos/150/150?random=110",
    ],
  },
  4: {
    id: 4,
    title: "Luxury Apartment",
    location: "C-Scheme, Jaipur",
    type: "Apartment",
    price: "₹65,00,000",
    image: "https://picsum.photos/800/500?random=104",
    description: "Luxurious 3-bedroom apartment in premium residential area with modern kitchen, spacious balcony, and excellent amenities.",
    sqft: "2,200 sq.ft",
    beds: 3,
    baths: 2,
    fullDescription:
      "This elegant 3-bedroom apartment in C-Scheme combines luxury with practicality. Located in one of Jaipur's most prestigious residential zones, the apartment features premium finishes, expansive living areas, and a modern modular kitchen. The generous balcony offers stunning views, while the open floor plan creates an airy, sophisticated living environment perfect for families.",
    amenities: ["Modular kitchen", "Spacious balcony", "Premium flooring", "Ample parking", "Lift facility", "Community hall", "Security"],
    highlights: [
      "3 well-proportioned bedrooms",
      "2 modern bathrooms",
      "Premium location in C-Scheme",
      "Excellent connectivity",
      "Close to schools and malls",
      "Strong rental returns",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=104",
      "https://picsum.photos/150/150?random=111",
      "https://picsum.photos/150/150?random=112",
      "https://picsum.photos/150/150?random=113",
    ],
  },
  5: {
    id: 5,
    title: "Commercial Office Space",
    location: "Talwandi, Kota",
    type: "Commercial",
    price: "₹2,50,00,000",
    image: "https://picsum.photos/800/500?random=105",
    description: "Prime commercial space in business hub with high visibility, modern infrastructure, and strong rental returns.",
    sqft: "8,000 sq.ft",
    fullDescription:
      "This premium commercial office space in Talwandi is ideally situated in Kota's primary business district. The modern building features high ceilings, open floor plans, and flexible layouts suitable for various business operations. With excellent foot traffic, nearby dining options, and convenient parking, this space is perfect for corporate offices, IT companies, and professional services.",
    amenities: ["High visibility location", "Flexible floor plans", "Ample parking", "Backup power", "24/7 security", "Loading area", "Cafeteria facility"],
    highlights: [
      "8,000 sq.ft of prime office space",
      "High foot traffic area",
      "Modern infrastructure",
      "Excellent rental returns",
      "Growing commercial zone",
      "Ready for immediate occupancy",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=105",
      "https://picsum.photos/150/150?random=114",
      "https://picsum.photos/150/150?random=115",
      "https://picsum.photos/150/150?random=116",
    ],
  },
  6: {
    id: 6,
    title: "Gated Villa Community Plot",
    location: "Kunhadi, Kota",
    type: "Residential Plot",
    price: "₹32,00,000",
    image: "https://picsum.photos/800/500?random=106",
    description: "Exclusive gated community plot with landscaped surroundings, 24/7 security, and community amenities.",
    sqft: "3,200 sq.ft",
    fullDescription:
      "This premium plot in Kunhadi's exclusive gated villa community offers the perfect foundation for your dream home. Part of a planned residential development, this property benefits from a secure gated environment, landscaped common areas, and a strong community of discerning residents. The modern infrastructure ensures long-term value appreciation and an excellent quality of life.",
    amenities: ["Gated community", "24/7 security", "Landscaped parks", "Community center", "Wide roads", "Underground utilities", "Guest parking"],
    highlights: [
      "3,200 sq.ft premium plot",
      "Gated and secure community",
      "Excellent amenities",
      "Strong community vibe",
      "High appreciation potential",
      "Family-friendly environment",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=106",
      "https://picsum.photos/150/150?random=117",
      "https://picsum.photos/150/150?random=118",
      "https://picsum.photos/150/150?random=119",
    ],
  },
  7: {
    id: 7,
    title: "Premium Villa with Courtyard",
    location: "Vigyan Nagar, Jaipur",
    type: "Villa",
    price: "₹1,20,00,000",
    image: "https://picsum.photos/800/500?random=107",
    description: "Elegant 4-bedroom villa with private courtyard, terraced gardens, and premium modern architecture ideal for discerning investors.",
    sqft: "3,500 sq.ft",
    beds: 4,
    baths: 4,
    fullDescription:
      "This exceptional 4-bedroom villa in Vigyan Nagar is a masterpiece of modern residential design. Features include a private courtyard for enhanced privacy, terraced gardens offering panoramic views, and premium finishes throughout. The thoughtful design incorporates multiple living areas, a chef's kitchen, and luxurious bedrooms, making it ideal for discerning families and investors.",
    amenities: [
      "Private courtyard",
      "Terraced gardens",
      "Premium Italian marble",
      "State-of-the-art kitchen",
      "Home theater",
      "Gym space",
      "Smart home features",
    ],
    highlights: [
      "4 luxurious bedrooms with en-suite bathrooms",
      "Premium architectural design",
      "Private courtyard and gardens",
      "Smart home integration",
      "Investment-grade property",
      "Premium community location",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=107",
      "https://picsum.photos/150/150?random=120",
      "https://picsum.photos/150/150?random=121",
      "https://picsum.photos/150/150?random=122",
    ],
  },
  8: {
    id: 8,
    title: "Heritage Style Bungalow",
    location: "Bani Park, Jaipur",
    type: "Villa",
    price: "₹85,00,000",
    image: "https://picsum.photos/800/500?random=108",
    description: "Beautiful 5-bedroom heritage-style bungalow with traditional architecture, spacious grounds, and strong investment potential.",
    sqft: "5,200 sq.ft",
    beds: 5,
    baths: 4,
    fullDescription:
      "This magnificent 5-bedroom heritage-style bungalow in Bani Park is a testament to Rajasthan's architectural heritage. With traditional design elements, high ceilings, and spacious rooms, the property offers timeless elegance and comfort. The substantial grounds provide ample outdoor space for landscaping and entertaining, making it ideal for large families or those seeking a distinguished residential address.",
    amenities: [
      "Heritage architecture",
      "Spacious grounds",
      "High ceilings",
      "Traditional design elements",
      "Courtyard",
      "Ample parking",
      "Storage areas",
    ],
    highlights: [
      "5 spacious bedrooms",
      "Heritage architectural style",
      "Prime Bani Park location",
      "Substantial outdoor space",
      "Strong cultural value",
      "Investment appreciation potential",
    ],
    thumbnails: [
      "https://picsum.photos/150/150?random=108",
      "https://picsum.photos/150/150?random=123",
      "https://picsum.photos/150/150?random=124",
      "https://picsum.photos/150/150?random=125",
    ],
  },
};

function PropertyGallery({ property }: { property: PropertyDetails }) {
  const [selectedImage, setSelectedImage] = useState(property.image);

  return (
    <div className="mb-12">
      {/* Main Image */}
      <div className="mb-4 overflow-hidden rounded-lg bg-muted h-96 sm:h-[500px]">
        <img
          src={selectedImage}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedImage(property.image)}
          className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
            selectedImage === property.image ? "border-accent" : "border-border hover:border-accent/50"
          }`}
        >
          <img src={property.image} alt="Main" className="w-full h-full object-cover" />
        </button>
        {property.thumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(thumb)}
            className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
              selectedImage === thumb ? "border-accent" : "border-border hover:border-accent/50"
            }`}
          >
            <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const property = PROPERTIES_DETAILS[parseInt(id)];

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Property Not Found</h1>
            <p className="text-muted-foreground mb-6">This property is no longer available.</p>
            <a href="/properties" className="text-accent hover:underline">
              Back to Properties
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleContactAgent = () => {
    window.location.href = "/#contact";
    toast.success(`Thanks! We'll get back to you about ${property.title}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the ${property.title} at ${property.location} for ₹${property.price}. Please provide more details.`;
    window.open(`https://wa.me/917014930206?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Gallery */}
          <PropertyGallery property={property} />

          {/* Property Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3 tracking-wide">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{property.location}</span>
              </div>

              {/* Property Type & Price */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-accent/10 px-4 py-2 rounded-lg">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-lg font-semibold text-foreground">{property.type}</p>
                </div>
                <div className="bg-gold/10 px-4 py-2 rounded-lg">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="text-lg font-semibold text-foreground">{property.sqft}</p>
                </div>
                {property.beds && (
                  <div className="bg-primary/10 px-4 py-2 rounded-lg">
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold text-foreground">{property.beds}</p>
                  </div>
                )}
                {property.baths && (
                  <div className="bg-primary/10 px-4 py-2 rounded-lg">
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold text-foreground">{property.baths}</p>
                  </div>
                )}
              </div>

              {/* Full Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Overview</h2>
                <p className="text-base text-foreground/80 leading-relaxed">{property.fullDescription}</p>
              </div>
            </div>

            {/* Sidebar - Price & CTA */}
            <div className="lg:col-span-1">
              <Card className="p-6 sm:p-8 border-border/50 sticky top-28">
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Asking Price</p>
                  <p className="text-4xl font-serif font-bold text-accent">{property.price}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90" onClick={handleContactAgent}>
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Agent
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-gold/50 hover:bg-gold/10" onClick={handleWhatsApp}>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    WhatsApp Inquiry
                  </Button>
                </div>

                <div className="flex gap-2 pt-6 border-t border-border">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => toast.success("Saved to favorites!")}>
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      navigator.share?.({ title: property.title, text: `Check out this property: ${property.title}` }) ||
                        toast.success("Link copied!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Amenities & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <p className="text-sm text-foreground">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Why This Property</h3>
              <div className="space-y-3">
                {property.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />
                    <p className="text-sm text-foreground/80">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">Ready to Schedule a Site Visit?</h3>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Our expert team can arrange a convenient time for you to visit this property and explore it in detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={handleContactAgent}>
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10" onClick={handleWhatsApp}>
                <MessageSquare className="h-5 w-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 bg-muted/30 mt-16">
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
                <li>
                  <a href="/" className="hover:text-accent transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/properties" className="hover:text-accent transition-colors">
                    Properties
                  </a>
                </li>
                <li>
                  <a href="/#about" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/#services" className="hover:text-accent transition-colors">
                    Buy Property
                  </a>
                </li>
                <li>
                  <a href="/emi-calculator" className="hover:text-accent transition-colors">
                    EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="/list-property" className="hover:text-accent transition-colors">
                    List Property
                  </a>
                </li>
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
