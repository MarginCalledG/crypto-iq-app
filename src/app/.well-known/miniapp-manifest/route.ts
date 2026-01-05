import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    version: "1",
    name: "Crypto IQ",
    iconUrl: "https://crypto-iq-app.vercel.app/icon.svg",
    homeUrl: "https://crypto-iq-app.vercel.app",
    splashImageUrl: "https://crypto-iq-app.vercel.app/icon.svg",
    splashBackgroundColor: "#0a0a0f",
    primaryCategory: "games",
    description: "Test your blockchain knowledge with 50 questions across 7 categories. Get your Crypto IQ score and compete with friends!",
    socialLinks: {
      website: "https://crypto-iq-app.vercel.app"
    },
    features: {
      notifications: false
    },
    noindex: false
  };

  return NextResponse.json(manifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
  });
}
