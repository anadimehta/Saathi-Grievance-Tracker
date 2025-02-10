"use client"

import Link from "next/link"
import { LayoutDashboard, AlertCircle, Clock, RefreshCw } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-muted/40 h-[calc(100vh-4rem)]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/concerns"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent"
            >
              <AlertCircle className="h-4 w-4" />
              Raise a Concern
            </Link>
            <Link
              href="/pending"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent"
            >
              <Clock className="h-4 w-4" />
              Pending
            </Link>
            <Link
              href="/in-progress"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent"
            >
              <RefreshCw className="h-4 w-4" />
              In Progress
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

