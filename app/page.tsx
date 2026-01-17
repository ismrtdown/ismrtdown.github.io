import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Topbar */}
      <nav className="border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="font-bold text-xl tracking-tight">ISMRTDOWN</div>
        <div className="space-x-4 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">Home</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">
          ismrtdown
        </h1>
      </main>

      {/* Optional Footer */}
      <footer className="py-6 border-t text-center text-sm text-muted-foreground">
        © 2026 ISMRT Status
      </footer>
    </div>
  );
}
