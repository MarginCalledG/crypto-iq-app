import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Crypto IQ - Test Your Blockchain Knowledge",
  description: "Take the ultimate crypto quiz and discover your Crypto IQ. Compete with friends and climb the leaderboard!",
  openGraph: {
    title: "Crypto IQ - Test Your Blockchain Knowledge",
    description: "Take the ultimate crypto quiz and discover your Crypto IQ. Compete with friends!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Crypto IQ - Test Your Blockchain Knowledge",
  description: "Take the ultimate crypto quiz and discover your Crypto IQ. Compete with friends and climb the leaderboard!",
  openGraph: {
    title: "Crypto IQ - Test Your Blockchain Knowledge",
    description: "Take the ultimate crypto quiz and discover your Crypto IQ. Compete with friends!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="695964b14d3a403912ed8bd1" />
      </head>
      <body className="antialiased gradient-bg min-h-screen">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}" />
      </head>
      <body className="antialiased gradient-bg min-h-screen">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
