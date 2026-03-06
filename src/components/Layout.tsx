import { useState } from "react"
import SideBar from "./sidebar/SideBar"
import Header from "./header/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {

  const [showSideBar,setShowSideBar] = useState(false)

  const [searchQuery,setSearchQuery] = useState("")

  const handelShowSideNavBar = () => {
    setShowSideBar(true)
  }

  const handelHideSideNavBar = () => {
    setShowSideBar(false)
  }

  return (
    <div className="w-screen h-screen bg-main-bck min-h-screen">

      <div
        className={`w-80 h-full bg-gray-900 fixed duration-100 ${
          showSideBar ? "left-0 max-sm:w-screen" : "-left-74"
        }`}
        onMouseEnter={handelShowSideNavBar}
      >
        <SideBar handelHideSideNavBar={handelHideSideNavBar}/>
      </div>

      <div className={`h-full duration-100 ${showSideBar?"pl-81 max-sm:hidden":"pl-7"}`}>

        <div className="w-full h-20 bg-gray-900">

          <Header
            handelShowSideNavBar={handelShowSideNavBar}
            showSideBar={showSideBar}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

        </div>

        <div className="w-full h-[calc(100%-80px)] bg-gray-200 overflow-x-hidden">
          <Outlet/>
        </div>

      </div>

    </div>
  )
}

export default Layout