"use client";

import { Button } from "@/components/ui/button";
import { LockKeyhole, LogIn, Home } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="mx-4 flex max-w-md flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-500/20 blur-xl" />
          <div className="relative rounded-full bg-yellow-500/10 p-6">
            <LockKeyhole className="h-16 w-16 text-yellow-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-bold tracking-tight">401</h1>
          <h2 className="text-xl font-semibold text-muted-foreground">Unauthorized Access</h2>
          <p className="text-sm text-muted-foreground/80">
            You need to be authenticated to access this resource. Please sign in to continue.
          </p>
        </div>

        <div className="flex gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/sign-in">
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
