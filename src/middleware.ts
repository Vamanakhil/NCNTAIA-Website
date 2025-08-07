import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://ncntaia.sreenidhi.edu.in'];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
