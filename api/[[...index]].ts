import { VercelRequest, VercelResponse } from '@vercel/node';
import type { Express } from 'express';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // @ts-expect-error - dynamic import of compiled server module at runtime
    const handler = (await import('../dist/server/server.js')).default as Express;
    return handler(req, res);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
