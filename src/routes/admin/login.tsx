import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Apna Ghar Consultants" },
      {
        name: "description",
        content: "Login to admin panel to manage properties and team members",
      },
    ],
  }),
  component: AdminLoginPage,
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

function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@apnaghar.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate({ to: "/admin/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-12 sm:py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 sm:p-12 shadow-lg">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent mx-auto mb-4">
                <LogIn className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-2">Admin Login</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to manage properties and team members
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block font-medium text-foreground mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-0"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block font-medium text-foreground mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-0"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full uppercase tracking-wider"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-secondary/40 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Admin:</span> admin@apnaghar.com /
                  admin123
                </p>
                <p>
                  <span className="font-medium text-foreground">Team Member:</span>{" "}
                  team@apnaghar.com / team123
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
