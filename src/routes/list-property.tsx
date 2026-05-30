import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, useRef } from "react";
import { ArrowLeft, Upload, Building2, Home, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/list-property")({
  head: () => ({
    meta: [
      { title: "List Your Property | Apna Ghar Consultants" },
      {
        name: "description",
        content: "List your property with Apna Ghar Consultants. Free property listing service with expert marketing and maximum buyer exposure in Kota & Jaipur.",
      },
      {
        name: "keywords",
        content: "list property, sell property, property listing, real estate listing, Kota, Jaipur",
      },
      { property: "og:title", content: "List Your Property | Apna Ghar Consultants" },
      {
        property: "og:description",
        content: "List your property and reach thousands of buyers with our expert platform",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=5" },
    ],
  }),
  component: ListPropertyPage,
});

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

function ListPropertyPage() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 bg-gradient-to-b from-secondary/40 to-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs tracking-[0.5em] text-accent mb-6 uppercase">
                Grow Your Portfolio
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
                List Your
                <span className="text-accent"> Property</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Reach our premium buyer network and close deals faster with our expert guidance and
                transparent brokerage services.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-lg p-8 sm:p-12 shadow-lg">
              <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                Property Details
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill in your property information below. All fields are required.
              </p>
              <div className="h-1 w-12 bg-accent mb-8" />

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Owner Information */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-6">
                    Your Information
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName" className="block font-medium text-foreground mb-2">Full Name *</Label>
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
                      <Label htmlFor="mobileNumber" className="block font-medium text-foreground mb-2">Mobile Number *</Label>
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
                      <Label htmlFor="email" className="block font-medium text-foreground mb-2">Email Address *</Label>
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
                  <h3 className="font-serif text-lg font-semibold text-primary mb-6">
                    Property Information
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="propertyType" className="block font-medium text-foreground mb-2">Property Type *</Label>
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
                      <Label htmlFor="propertyPurpose" className="block font-medium text-foreground mb-2">Purpose *</Label>
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
                      <Label htmlFor="propertyAddress" className="block font-medium text-foreground mb-2">Property Address *</Label>
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
                      <Label htmlFor="city" className="block font-medium text-foreground mb-2">City *</Label>
                      <Select value={form.city} onValueChange={(value) => handleSelectChange("city", value)}>
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
                        Budget / Expected Price ({form.propertyPurpose === "Rent" ||
                        form.propertyPurpose === "Lease"
                          ? "Monthly"
                          : "Total"}) *
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
                  <Label htmlFor="description" className="block font-medium text-foreground mb-2">Property Description *</Label>
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
                  <Label htmlFor="images" className="block font-medium text-foreground mb-3">Upload Property Images</Label>
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
                            <p className="text-xs text-muted-foreground mt-2 truncate">
                              {file.name}
                            </p>
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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to List Your Property?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of property owners who have successfully listed with us and achieved their
              real estate goals.
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
                  <a href="/list-property" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    List Property
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

      <Toaster richColors position="top-center" />
    </div>
  );
}
