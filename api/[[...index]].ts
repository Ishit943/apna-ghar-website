import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    
    const server = await import("../dist/server/server.js");

    if (typeof server.default === "function") {
      return server.default(req, res);
    }

    throw new Error("Server handler not found");
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

