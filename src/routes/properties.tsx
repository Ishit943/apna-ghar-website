import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Phone,
  MessageSquare,
  Upload,
  Building2,
  Home,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Premium Properties | Apna Ghar Consultants — Kota & Jaipur" },
      {
        name: "description",
        content:
          "Browse our exclusive collection of luxury residential plots, villas, farmhouses, apartments, and commercial properties in Kota and Jaipur with premium locations.",
      },
      {
        name: "keywords",
        content:
          "luxury properties, residential plots, villas, farmhouses, apartments, commercial property, Kota, Jaipur",
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
            Discover our curated collection of premium properties across Kota and Jaipur. From
            residential plots to luxury villas, find your dream investment.
          </p>
        </div>
      </div>
    </section>
  );
}

const PROPERTY_TYPES = [
  "Residential Apartment",
  "Residential House",
  "Commercial Office",
  "Commercial Retail Shop",
  "Industrial Warehouse",
  "Land/Plot",
];

const PROPERTY_PURPOSE = ["Sell", "Rent", "Lease"];

const CITIES = ["Kota", "Jaipur", "Other"];

interface Property {
  _id?: string;
  id?: number;
  title: string;
  location: string;
  type: string;
  price: number;
  priceDisplay?: string;
  image?: string;
  images?: string[];
  description: string;
  sqft?: number | string;
  beds?: number;
  baths?: number;
  createdBy?: {
    _id?: string;
    name?: string;
    email?: string;
  };
  status?: string;
}

// Properties are now fetched from API via useQuery - removed hardcoded array

function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();

  // Get the image URL (from either image or images array)
  const imageUrl =
    property.image ||
    (property.images && property.images[0]) ||
    "https://picsum.photos/600/400?random=999";

  // Format price display
  const priceDisplay =
    property.priceDisplay ||
    (typeof property.price === "number"
      ? `₹ ${property.price.toLocaleString("en-IN")}`
      : property.price);

  // Get property ID for navigation
  const propertyId = property._id || property.id;

  const handleViewDetails = () => {
    if (propertyId) {
      navigate({ to: `/property/${propertyId}` });
    }
  };

  const handleContact = () => {
    toast.success(`Connected! We'll send you details about ${property.title}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-border/50 hover:border-accent/50">
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-56 bg-muted">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/600/400?random=999";
          }}
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
          {property.sqft && (
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4 text-gold" />
              <span>{property.sqft}</span>
            </div>
          )}
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
            {priceDisplay}
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

function ListingForm() {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    propertyType: "",
    propertyPurpose: "",
    propertyAddress: "",
    city: "",
    budget: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.mobileNumber.trim() ||
      !form.email.trim() ||
      !form.propertyType ||
      !form.propertyPurpose ||
      !form.propertyAddress.trim() ||
      !form.city ||
      !form.budget.trim() ||
      !form.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
      toast.error("Please enter a valid name (letters only).");
      return;
    }

    if (!/^[0-9+\-\s]{7,15}$/.test(form.mobileNumber)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Your property listing request has been submitted successfully.");
    handleClear();
  };

  const handleClear = () => {
    setForm({
      fullName: "",
      mobileNumber: "",
      email: "",
      propertyType: "",
      propertyPurpose: "",
      propertyAddress: "",
      city: "",
      budget: "",
      description: "",
    });
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.5em] text-accent mb-6 uppercase">
            Grow Your Portfolio
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
            List Your
            <span className="text-accent"> Property</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Reach our premium buyer network and close deals faster with our expert guidance and
            transparent brokerage services.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 sm:p-12 shadow-lg">
          <h3 className="font-serif text-3xl font-bold text-primary mb-2">Property Details</h3>
          <p className="text-sm text-muted-foreground mb-8">
            Fill in your property information below. All fields are required.
          </p>
          <div className="h-1 w-12 bg-accent mb-8" />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Owner Information */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-6">
                Your Information
              </h4>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName" className="block font-medium text-foreground mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    maxLength={100}
                    required
                    className="mt-0"
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumber" className="block font-medium text-foreground mb-2">
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={form.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+91 9XXXXXXXXX"
                    maxLength={15}
                    required
                    className="mt-0"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="block font-medium text-foreground mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    maxLength={100}
                    required
                    className="mt-0"
                  />
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary mb-6">
                Property Information
              </h4>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="propertyType" className="block font-medium text-foreground mb-2">
                    Property Type *
                  </Label>
                  <Select
                    value={form.propertyType}
                    onValueChange={(value) => handleSelectChange("propertyType", value)}
                  >
                    <SelectTrigger id="propertyType" className="mt-0">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="propertyPurpose"
                    className="block font-medium text-foreground mb-2"
                  >
                    Purpose *
                  </Label>
                  <Select
                    value={form.propertyPurpose}
                    onValueChange={(value) => handleSelectChange("propertyPurpose", value)}
                  >
                    <SelectTrigger id="propertyPurpose" className="mt-0">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_PURPOSE.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="propertyAddress"
                    className="block font-medium text-foreground mb-2"
                  >
                    Property Address *
                  </Label>
                  <Input
                    id="propertyAddress"
                    name="propertyAddress"
                    value={form.propertyAddress}
                    onChange={handleInputChange}
                    placeholder="Enter complete property address"
                    maxLength={200}
                    required
                    className="mt-0"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="block font-medium text-foreground mb-2">
                    City *
                  </Label>
                  <Select
                    value={form.city}
                    onValueChange={(value) => handleSelectChange("city", value)}
                  >
                    <SelectTrigger id="city" className="mt-0">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget" className="block font-medium text-foreground mb-2">
                    Budget / Expected Price (
                    {form.propertyPurpose === "Rent" || form.propertyPurpose === "Lease"
                      ? "Monthly"
                      : "Total"}
                    ) *
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={form.budget}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                    className="mt-0"
                  />
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div>
              <Label htmlFor="description" className="block font-medium text-foreground mb-2">
                Property Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Describe your property (amenities, features, condition, etc.)"
                maxLength={1000}
                required
                className="mt-0"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {form.description.length} / 1000 characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="images" className="block font-medium text-foreground mb-3">
                Upload Property Images
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Upload up to 5 images. Supported formats: JPG, PNG. Max 5MB per image.
              </p>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer active:scale-95"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-accent mx-auto mb-2 transition-transform duration-200" />
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                <input
                  ref={fileInputRef}
                  id="images"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  aria-label="Upload property images"
                  className="hidden"
                />
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-4">
                    Selected Images ({images.length})
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-lg border border-border group-hover:border-accent transition-colors duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/90"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ✕
                        </button>
                        <p className="text-xs text-muted-foreground mt-2 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                className="flex-1 uppercase tracking-wider transition-all duration-200 hover:shadow-lg"
              >
                Submit Property
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleClear}
                className="flex-1 uppercase tracking-wider transition-all duration-200 hover:bg-accent/5"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function PropertiesPage() {
  // Fetch properties from API
  const {
    data: propertiesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await fetch(`${apiUrl}/properties`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      return data.properties || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const properties = propertiesData || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Properties Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : error || !properties || properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  No Properties Available
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're updating our property listings. Please check back soon!
                </p>
                <Button asChild>
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id || property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why List With Us Section */}
      <section className="py-24 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-accent uppercase mb-3">
              Our Advantages
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary">
              Why List With Us
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: "Better Reach",
                description:
                  "Access to our extensive network of qualified buyers and investors across Rajasthan and beyond.",
              },
              {
                icon: Home,
                title: "Expert Guidance",
                description:
                  "Dedicated support from experienced consultants to guide you through every step of the listing process.",
              },
              {
                icon: DollarSign,
                title: "Faster Deal Closure",
                description:
                  "Streamlined process and proven strategies to close deals quickly while maximizing your returns.",
              },
              {
                icon: Building2,
                title: "Premium Buyer Network",
                description:
                  "Connect with serious, qualified buyers actively seeking properties like yours in the luxury segment.",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group bg-card border border-border p-8 rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* List Your Property Form */}
      <ListingForm />

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
              <p className="text-sm text-muted-foreground">
                Your trusted partner for luxury real estate in Kota & Jaipur.
              </p>
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
                <li>
                  <a href="/faq" className="hover:text-accent transition-colors">
                    FAQ
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
                  <a href="/#services" className="hover:text-accent transition-colors">
                    Sell Property
                  </a>
                </li>
                <li>
                  <a href="/emi-calculator" className="hover:text-accent transition-colors">
                    EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="/properties#list" className="hover:text-accent transition-colors">
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
