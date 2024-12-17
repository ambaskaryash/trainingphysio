"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export function MainNav() {
  const { isSignedIn } = useUser();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6" />
            <span className="text-xl font-bold">PhysioFlex</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/videos" className="text-sm font-medium transition-colors hover:text-primary">
              Videos
            </Link>
            <Link href="/plans" className="text-sm font-medium transition-colors hover:text-primary">
              Plans
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}