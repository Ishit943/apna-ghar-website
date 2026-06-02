import { createContext, useContext, useState, ReactNode } from "react";

export interface ManagedProperty {
  id: string;
  title: string;
  location: string;
  type: string;
  price: string;
  image: string;
  description: string;
  sqft: string;
  beds?: number;
  baths?: number;
  addedBy: string;
  addedDate: string;
}

export interface PropertiesContextType {
  properties: ManagedProperty[];
  addProperty: (property: Omit<ManagedProperty, "id" | "addedBy" | "addedDate">, addedBy: string) => void;
  removeProperty: (id: string, userId: string) => Promise<void>;
  updateProperty: (id: string, property: Partial<ManagedProperty>, userId: string) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<ManagedProperty[]>(() => {
    const saved = localStorage.getItem("managedProperties");
    return saved ? JSON.parse(saved) : [];
  });

  const addProperty = (property: Omit<ManagedProperty, "id" | "addedBy" | "addedDate">, addedBy: string) => {
    const newProperty: ManagedProperty = {
      ...property,
      id: Date.now().toString(),
      addedBy,
      addedDate: new Date().toISOString().split("T")[0],
    };

    const updated = [...properties, newProperty];
    setProperties(updated);
    localStorage.setItem("managedProperties", JSON.stringify(updated));
  };

  const removeProperty = async (id: string, userId: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) {
      throw new Error("Property not found");
    }

    // In a real app, check if user is admin or property owner
    const updated = properties.filter(p => p.id !== id);
    setProperties(updated);
    localStorage.setItem("managedProperties", JSON.stringify(updated));
  };

  const updateProperty = async (id: string, updates: Partial<ManagedProperty>, userId: string) => {
    const property = properties.find(p => p.id === id);
    if (!property) {
      throw new Error("Property not found");
    }

    const updated = properties.map(p =>
      p.id === id ? { ...p, ...updates, addedDate: p.addedDate } : p
    );
    setProperties(updated);
    localStorage.setItem("managedProperties", JSON.stringify(updated));
  };

  return (
    <PropertiesContext.Provider value={{ properties, addProperty, removeProperty, updateProperty }}>
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
