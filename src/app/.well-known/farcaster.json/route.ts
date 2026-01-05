import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
    },
    frame: {
      version: "1",
      name: "Crypto IQ",
      iconUrl: "https://crypto-iq-app.vercel.app/icon.svg",
      homeUrl: "https://crypto-iq-app.vercel.app",
      splashImageUrl: "https://crypto-iq-app.vercel.app/icon.svg",
      splashBackgroundColor: "#0a0a0f",
      webhookUrl: "https://crypto-iq-app.vercel.app/api/webhook"
    }
  };

  return NextResponse.json(config, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
