import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-lg font-serif font-bold tracking-widest text-foreground mb-1">
            AG
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Apna Ghar Consultants
          </p>
        </div>

        {/* 404 Number - Premium Style */}
        <div className="mb-8">
          <h2 className="text-8xl sm:text-9xl font-serif font-bold text-foreground/20 tracking-tighter">
            404
          </h2>
          <p className="text-xl sm:text-2xl font-serif tracking-wide text-foreground mt-4">
            Page Not Found
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The property you're looking for doesn't exist or may have been removed from our catalog. 
          Don't worry, explore our collection or contact our team for assistance.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Back to Home
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-background hover:bg-accent/5 text-foreground font-medium transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse Properties
          </Link>
        </div>

        {/* Footer Help Text */}
        <p className="text-xs text-muted-foreground mt-8">
          Need help? <a href="/#contact" className="text-accent hover:underline">Contact us</a> for assistance
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "title", content: "Apna Ghar Consultants | Luxury Real Estate in Kota & Jaipur" },
      { name: "description", content: "Luxury real estate consulting, property sales & purchases, home loans, and expert brokerage in Kota & Jaipur." },
      { name: "keywords", content: "real estate, luxury properties, Kota, Jaipur, home loans, consultancy" },
      { name: "author", content: "Apna Ghar Consultants" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { property: "og:title", content: "Apna Ghar Consultants | Luxury Real Estate" },
      { property: "og:description", content: "Premium properties, expert consulting, and financing solutions in Kota & Jaipur" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: "https://picsum.photos/1200/630?random=1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Apna Ghar Consultants" },
      { name: "twitter:description", content: "Luxury real estate solutions in Kota & Jaipur" },
      { name: "twitter:image", content: "https://picsum.photos/1200/630?random=1" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.state.location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
