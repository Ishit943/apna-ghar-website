import { createContext, useContext, useState, ReactNode } from "react";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "team_member";
  joinedDate: string;
}

export interface AuthContextType {
  user: TeamMember | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addTeamMember: (name: string, email: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TeamMember | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addTeamMember = async (name: string, email: string, password: string) => {
    if (!user || user.role !== "admin") {
      throw new Error("Only admins can add team members");
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((u: any) => u.email === email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name,
      email,
      role: "team_member",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    users.push({ ...newMember, password });
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addTeamMember, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
