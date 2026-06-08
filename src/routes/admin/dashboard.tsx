import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { LogOut, Plus, Trash2, Users, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useProperties } from "@/contexts/properties-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Apna Ghar Consultants" },
      {
        name: "description",
        content: "Manage properties and team members",
      },
    ],
  }),
  component: AdminDashboard,
  beforeLoad: ({ context }) => {
    const auth = context;
    if (!auth) throw new Error("Not authenticated");
  },
});

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, addTeamMember } = useAuth();
  const { properties, removeProperty, addProperty } = useProperties();
  const [activeTab, setActiveTab] = useState<"properties" | "team" | "add-property">("properties");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    location: "",
    type: "Residential Apartment",
    price: "",
    image: "https://picsum.photos/600/400?random=999",
    description: "",
    sqft: "",
    beds: "",
    baths: "",
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You must be an admin to access this page</p>
          <Button onClick={() => navigate({ to: "/admin/login" })}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleAddTeamMember = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await addTeamMember(formData.name, formData.email, formData.password);
      toast.success("Team member added successfully!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add team member");
    }
  };

  const handleAddProperty = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !propertyForm.title ||
      !propertyForm.location ||
      !propertyForm.price ||
      !propertyForm.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      addProperty({
        title: propertyForm.title,
        location: propertyForm.location,
        type: propertyForm.type as "apartment" | "house" | "villa" | "plot" | "commercial",
        price: parseInt(propertyForm.price),
        images: [propertyForm.image],
        description: propertyForm.description,
        sqft: parseInt(propertyForm.sqft),
        beds: propertyForm.beds ? parseInt(propertyForm.beds) : 0,
        baths: propertyForm.baths ? parseInt(propertyForm.baths) : 0,
      });
      toast.success("Property added successfully!");
      setPropertyForm({
        title: "",
        location: "",
        type: "Residential Apartment",
        price: "",
        image: "https://picsum.photos/600/400?random=999",
        description: "",
        sqft: "",
        beds: "",
        baths: "",
      });
      setActiveTab("properties");
    } catch (error) {
      toast.error("Failed to add property");
    }
  };

  const handleRemoveProperty = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await removeProperty(id);
        toast.success("Property removed successfully!");
      } catch (error) {
        toast.error("Failed to remove property");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/85 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div>
              <h1 className="font-serif text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("properties")}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === "properties"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4 inline mr-2" />
            Properties
          </button>
          <button
            onClick={() => setActiveTab("add-property")}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === "add-property"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Add Property
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-3 font-medium text-sm transition-colors ${
              activeTab === "team"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Team Members
          </button>
        </div>

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-primary">Manage Properties</h2>
            {properties.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No properties yet</p>
                <Button onClick={() => setActiveTab("add-property")}>
                  Add Your First Property
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {properties.map((property) => (
                  <Card key={property._id} className="overflow-hidden">
                    <img
                      src={property.images?.[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-lg mb-2">{property.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-accent">{property.price}</span>
                        <span className="text-xs bg-secondary px-3 py-1 rounded">
                          {property.type}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                        {property.description}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveProperty(property._id)}
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Property Tab */}
        {activeTab === "add-property" && (
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Add New Property</h2>
            <Card className="p-6 sm:p-8">
              <form onSubmit={handleAddProperty} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      placeholder="e.g., Premium Corner Plot"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={propertyForm.location}
                      onChange={(e) =>
                        setPropertyForm({ ...propertyForm, location: e.target.value })
                      }
                      placeholder="e.g., Malviya Nagar, Jaipur"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <select
                      id="type"
                      title="Property Type"
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background mt-2"
                    >
                      <option>Residential Apartment</option>
                      <option>Villa</option>
                      <option>Farmhouse</option>
                      <option>Commercial</option>
                      <option>Residential Plot</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                      placeholder="e.g., ₹28,00,000"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="sqft">Area (Sq.ft.)</Label>
                    <Input
                      id="sqft"
                      value={propertyForm.sqft}
                      onChange={(e) => setPropertyForm({ ...propertyForm, sqft: e.target.value })}
                      placeholder="e.g., 2,500"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="beds">Beds</Label>
                    <Input
                      id="beds"
                      type="number"
                      value={propertyForm.beds}
                      onChange={(e) => setPropertyForm({ ...propertyForm, beds: e.target.value })}
                      placeholder="e.g., 4"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="baths">Baths</Label>
                    <Input
                      id="baths"
                      type="number"
                      value={propertyForm.baths}
                      onChange={(e) => setPropertyForm({ ...propertyForm, baths: e.target.value })}
                      placeholder="e.g., 3"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    value={propertyForm.description}
                    onChange={(e) =>
                      setPropertyForm({ ...propertyForm, description: e.target.value })
                    }
                    placeholder="Property details and amenities..."
                    className="w-full px-3 py-2 border border-border rounded-md bg-background mt-2 min-h-24"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Add Property
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("properties")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Team Members Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-primary">Manage Team Members</h2>

            {/* Add Team Member Form */}
            <Card className="p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-4">Add New Team Member</h3>
              <form onSubmit={handleAddTeamMember} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Team member name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Set password"
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button type="submit">Add Team Member</Button>
              </form>
            </Card>

            {/* Team Members List */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Current Team</h3>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded font-medium">
                      Admin
                    </span>
                  </div>
                </Card>

                {/* Load team members from storage */}
                {(() => {
                  const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<{
                    id: string;
                    role: string;
                    name: string;
                    email: string;
                  }>;
                  const teamMembers = users.filter(
                    (u: { id: string; role: string; name: string; email: string }) =>
                      u.role === "team_member",
                  );
                  return teamMembers.length > 0 ? (
                    teamMembers.map((member: { id: string; name: string; email: string }) => (
                      <Card key={member.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                          <span className="text-xs bg-secondary/50 text-foreground/70 px-3 py-1 rounded">
                            Team Member
                          </span>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-4 text-center text-muted-foreground">
                      No team members added yet
                    </Card>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
