import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', '*').end();
  }

  res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);

  return res.status(200).json({
    success: true,
    message: 'Backend server is running successfully',
    timestamp: new Date().toISOString(),
  });
};
