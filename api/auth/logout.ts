import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Helper function to set CORS headers with credentials support
  const setCorsHeaders = (req: VercelRequest, res: VercelResponse) => {
    const origin = req.headers.origin;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
    
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else if (allowedOrigins.includes("*")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  };

  // Set CORS headers
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  // Clear authentication cookie
  res.setHeader("Set-Cookie", [
    `authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
  ]);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
}
