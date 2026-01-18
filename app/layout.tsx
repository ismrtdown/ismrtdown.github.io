import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISMRTDown",
  description: "Is the MRT down today?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <nav className="border-b px-6 py-4 flex justify-between items-center shadow-sm">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png" // Path to your image in the public folder
                alt="Logo"
                width={40} // Fixed width
                height={40} // Fixed height
                className="rounded-md" // Optional: adds slight rounding
              />
              <div className="font-bold text-xl tracking-tight">ISMRTDOWN</div>
            </Link>
            <div className="space-x-4 text-sm font-medium">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/report"
                className="hover:text-primary transition-colors"
              >
                Report
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </div>
          </nav>

          <main className="flex-col grow flex items-center justify-center mt-5">
            {children}
          </main>
          <footer className="w-full border-t py-4 bg-background">
            <div className="container mx-auto grid grid-cols-12 gap-4">
              <div className="col-start-3 col-span-8">
                {/* <div className="grid grid-cols-4 text-center mb-8">
              <div className="flex">
                <span className="font-semibold text-foreground">1st</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-foreground">2nd</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-foreground">3rd</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-foreground">4th</span>
              </div>
            </div> */}

                {/* Bottom Row: Full 8-column width section */}
                <div className="pt-4 text-[8px] md:text-sm text-center">
                  <div className="flex justify-between items-center text-muted-foreground tracking-widest uppercase">
                    <span>
                      © 2026
                      <a
                        href="https://github.com/ismrtdown"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {" "}
                        ismrtdown
                      </a>
                    </span>
                    <div>
                      <p>
                        We are not affiliated with any public transport operator
                      </p>
                      <p>
                        Please also check out
                        <a
                          href="https://www.mrtdown.org/?viewport=2xl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-600"
                        >
                          {" "}
                          mrtdown
                        </a>{" "}
                        (Mrt Map was inspired by them)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
