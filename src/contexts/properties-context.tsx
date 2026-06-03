import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Property {
  _id: string;
  title: string;
  location: string;
  type: "apartment" | "house" | "villa" | "plot" | "commercial";
  price: number;
  description: string;
  sqft: number;
  beds: number;
  baths: number;
  images: string[];
  status: "active" | "sold" | "pending";
  isFeatured: boolean;
  views: number;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesContextType {
  properties: Property[];
  isLoading: boolean;
  error: Error | null;
  addProperty: (property: Partial<Property>) => Promise<void>;
  removeProperty: (id: string) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  refetch: () => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

const API_BASE = typeof window !== "undefined" ? window.location.origin : "";

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch properties
  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/properties`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      return data.properties || [];
    },
  });

  // Add property mutation
  const addPropertyMutation = useMutation({
    mutationFn: async (property: Partial<Property>) => {
      const response = await fetch(`${API_BASE}/api/properties`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      if (!response.ok) throw new Error("Failed to add property");
      const data = await response.json();
      return data.property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, property }: { id: string; property: Partial<Property> }) => {
      const response = await fetch(`${API_BASE}/api/properties/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      if (!response.ok) throw new Error("Failed to update property");
      const data = await response.json();
      return data.property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE}/api/properties/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete property");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const addProperty = async (property: Partial<Property>) => {
    await addPropertyMutation.mutateAsync(property);
  };

  const updateProperty = async (id: string, property: Partial<Property>) => {
    await updatePropertyMutation.mutateAsync({ id, property });
  };

  const removeProperty = async (id: string) => {
    await deletePropertyMutation.mutateAsync(id);
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        isLoading,
        error: error as Error | null,
        addProperty,
        removeProperty,
        updateProperty,
        refetch,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within PropertiesProvider");
  }
  return context;
}
