"use client"

import { ChefHat, Heart, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const DockNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="dock flex justify-around py-2 bg-base-100 shadow-md rounded-t-xl">
      <Link href="/">
        <div className="flex flex-col items-center gap-1">
          <ChefHat className={`w-6 h-6 ${pathname === "/" ? "text-primary" : "text-base-content"}`} />
          <span className={`dock-label ${pathname === "/" ? "" : ""}`}>Home</span>
        </div>
      </Link>

      <Link href="/favorites">
        <div className="flex flex-col items-center gap-1">
          <Heart className={`w-6 h-6 ${pathname === "/favorites" ? "text-secondary" : "text-base-content"}`} />
          <span className={`dock-label capitalize ${pathname === "/favorites" ? "" : ""}`}>Favorites</span>
        </div>
      </Link>

      <Link href="/search">
        <div className="flex flex-col items-center gap-1">
          <Search className={`w-6 h-6 ${pathname === "/search" ? "text-accent" : "text-base-content"}`} />
          <span className={`dock-label ${pathname === "/search" ? "" : ""}`}>Search</span>
        </div>
      </Link>
    </div>
  )
}

export default DockNavigation
