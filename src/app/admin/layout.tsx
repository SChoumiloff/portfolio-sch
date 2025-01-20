"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AuthDialog from "@/components/auth-drawer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const params = new URLSearchParams(window.location.search);
      if (params.get("auth") === "required") {
        setShowAuthDialog(true);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("auth");
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <AuthDialog 
          open={showAuthDialog} 
          onClose={() => setShowAuthDialog(false)} 
        />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}