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
      <body className="antialiased gradient-bg min-h-screen">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
