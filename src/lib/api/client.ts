/**
 * API Configuration and Helper Functions
 * Manages environment-based API endpoint configuration
 */

/**
 * Get the base API URL based on environment
 * - Production (Vercel): Uses relative /api path
 * - Development: Uses VITE_API_URL environment variable
 * - Fallback: Uses localhost
 */
export const getApiBaseUrl = (): string => {
  const viteApiUrl = import.meta.env.VITE_API_URL;

  if (viteApiUrl) {
    return viteApiUrl;
  }

  // Default to relative path for Vercel deployment
  return "/api";
};

/**
 * Generic fetch wrapper with error handling
 */
export const apiCall = async <T = Record<string, unknown>>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

/**
 * Submit contact form
 */
export const submitContactForm = async (data: {
  name: string;
  mobileNumber: string;
  queryAbout: string;
}) => {
  return apiCall("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
