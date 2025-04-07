"use client"

import { ChefHat, Heart, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const DockNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="dock">
      <Link href="/">
        <div className={pathname === "/" ? "dock-active" : ""}>
          <ChefHat />
          <span className="dock-label">Home</span>
        </div>
      </Link>

      <Link href="/favorites">
        <button className={pathname === "/favorites" ? "dock-active" : " dock-active"}>
          <Heart />
          <span className="dock-label capitalize">Favorites</span>
        </button>
      </Link>

      <Link href="/search">
        <div className={pathname === "/search" ? "dock-active" : ""}>
          <Search />
          <span className="dock-label">Search</span>
        </div>
      </Link>
    </div>
  )
}

export default DockNavigation
