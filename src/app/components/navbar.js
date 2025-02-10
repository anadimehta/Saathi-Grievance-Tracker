"use client"

import Link from "next/link"
// import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-background bg-green-8 00 ">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-3xl font-bold text-black">
            SAATHI
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/">Home</Link>
          <Link href="/progress">Check Progress</Link>
          <Link href="/new">New Complaint</Link>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
    </nav>
  )
}

