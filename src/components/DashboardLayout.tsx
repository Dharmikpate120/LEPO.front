// src/components/DashboardLayout.js
import React from 'react';
import {
  Menu,
  LayoutDashboard,
  BarChart,
  Settings,
  LogOut,
  User,
  LifeBuoy,
} from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

// Reusable navigation links component
const NavigationLinks = ({ className }: { className?: string}) => (
  <nav className={`grid items-start gap-2 text-sm font-medium ${className}`}>
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <LayoutDashboard className="h-4 w-4" />
      Dashboard
    </a>
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <BarChart className="h-4 w-4" />
      Analytics
    </a>
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <Settings className="h-4 w-4" />
      Settings
    </a>
  </nav>
);

const DashboardLayout = ({ children }: {children?: React.ReactNode}) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6" />
              <span className="">Your App</span>
            </Link>
          </div>
          <div className="flex-1">
            <NavigationLinks className="px-2 lg:px-4" />
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* --- Header --- */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Navigation (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <LayoutDashboard className="h-6 w-6" />
                    <span>Your App</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <NavigationLinks className="mt-5" />
            </SheetContent>
          </Sheet>

          {/* Spacer to push profile to the right */}
          <div className="w-full flex-1" />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {/* Replace with actual user image */}
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* --- Main Content --- */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children || (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">Your Content Here</h3>
                <p className="text-sm text-muted-foreground">
                  The main content of your pages will be rendered here.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;