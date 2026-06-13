"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mountain, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resorts } from "@/data/resorts";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-sky-400 transition-colors">
            <Mountain className="w-6 h-6 text-sky-400" />
            <span>Firn</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium bg-transparent border-0 cursor-pointer outline-none">
                Resorts <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700 w-48">
                {resorts.map((r) => (
                  <DropdownMenuItem key={r.slug} onClick={() => router.push(`/resorts/${r.slug}`)} className="text-slate-300 hover:text-white cursor-pointer">
                    {r.flag} {r.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium bg-transparent border-0 cursor-pointer outline-none">
                Community <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700 w-52">
                {resorts.map((r) => (
                  <DropdownMenuItem key={r.slug} onClick={() => router.push(`/community/${r.slug}`)} className="text-slate-300 hover:text-white cursor-pointer">
                    {r.flag} {r.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-transparent border-0 cursor-pointer outline-none">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="bg-sky-600 text-white text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{session.user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 cursor-pointer">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/signin")}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/signup")}
                  className="bg-sky-600 hover:bg-sky-500 text-white"
                >
                  Join Firn
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Resorts</p>
            {resorts.map((r) => (
              <Link
                key={r.slug}
                href={`/resorts/${r.slug}`}
                className="block py-2 text-slate-300 hover:text-white text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {r.flag} {r.name}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Community</p>
            {resorts.map((r) => (
              <Link
                key={r.slug}
                href={`/community/${r.slug}`}
                className="block py-2 text-slate-300 hover:text-white text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {r.flag} {r.name} Community
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-4 flex gap-3">
            {session ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-red-400 hover:text-red-300"
              >
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { router.push("/signin"); setMobileOpen(false); }}
                  className="text-slate-300"
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  onClick={() => { router.push("/signup"); setMobileOpen(false); }}
                  className="bg-sky-600 hover:bg-sky-500 text-white"
                >
                  Join Firn
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
