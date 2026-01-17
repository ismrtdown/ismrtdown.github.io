"use client";
import { useEffect, useRef, useState } from "react";
import {MrtMap} from "@/lib/MrtMap/index";

function Main() {
  return (
    <div className="w-full">
      <MrtMap stationClickHandler={(_) => {}} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Topbar */}
      <nav className="border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="font-bold text-xl tracking-tight">ISMRTDOWN</div>
        <div className="space-x-4 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            About
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-col flex-grow flex items-center justify-center">
        <h1 className="text-4xl md:text-8xl font-extrabold tracking-tighter">
          Is the MRT down?
        </h1>
        {Main()}
      </main>

      {/* Optional Footer */}
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
            <div className="pt-4 text-center">
              <div className="flex justify-between items-center text-sm text-muted-foreground tracking-widest uppercase">
                <span>© 2026 ismrtdown</span>
                <span>
                  We are not affiliated with any public transport operator
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
