import { RxCross1 } from "react-icons/rx"
import { MdDashboard } from "react-icons/md"
import { FaBullhorn, FaBriefcase } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import type { SideBarProps } from "./sideBarTypes"

const SideBar = ({ handelHideSideNavBar }: SideBarProps) => {
  return (
    <div className="size-full relative bg-gray-900 text-white p-6 flex flex-col">


      <div
        className="absolute right-8 top-5 text-xl font-extrabold text-white hover:text-red-600 hover:animate-pulse rounded-full p-2 border-2 border-white hover:border-red-600"
        onClick={handelHideSideNavBar}
      >
        <RxCross1 />
      </div>

      <h1 className="text-2xl font-bold mb-12 tracking-wide">
        SaaS Dashboard
      </h1>

 
      <nav className="flex flex-col gap-6 text-lg">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition
            ${isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-800"}`
          }
        >
          <MdDashboard />
          Dashboard
        </NavLink>

        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition
            ${isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-800"}`
          }
        >
          <FaBullhorn />
          Campaigns
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition
            ${isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-800"}`
          }
        >
          <FaBriefcase />
          Jobs
        </NavLink>

      </nav>

      <div className="mt-auto text-sm text-gray-400">
        © 2026 SaaS Dashboard
      </div>

    </div>
  )
}

export default SideBar