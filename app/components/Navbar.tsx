import { Search } from "lucide-react"
import Link from "next/link"
import { NavbarProps } from "../util/Type"


const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <h1 className="text-2xl capitalize">{title}</h1>
      </div>
      <div className="flex-none">
        <Link href={"/search"} className="btn btn-square btn-ghost">
          <Search />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
