import { useState, useEffect } from "react"
import { MdOutlineMenu } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import { FaSearch } from "react-icons/fa"
import { RxCross1 } from "react-icons/rx"
import { useMatches } from "react-router-dom"

import type { HeaderProps, RouteHandle } from "./headerTypes"

import { campaignService } from "../../services/campaignService"
import { jobService } from "../../services/jobService"

const Header = ({
  handelShowSideNavBar,
  showSideBar,
  searchQuery,
  setSearchQuery
}: HeaderProps) => {

  const [showSearch,setShowSearch] = useState(false)
  const [results,setResults] = useState<any[]>([])
  const [selected,setSelected] = useState<any>(null)
  const [debouncedQuery,setDebouncedQuery] = useState(searchQuery)

  const [showProfile,setShowProfile] = useState(false)

  const [theme,setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  const matches = useMatches()
  const currentMatch = matches[matches.length - 1]
  const handle = currentMatch?.handle as RouteHandle | undefined
  const title = handle?.title || "Dashboard"


  useEffect(()=>{

    document.documentElement.classList.remove("light","dark")
    document.documentElement.classList.add(theme)

    localStorage.setItem("theme",theme)

  },[theme])




  useEffect(()=>{

    const timer = setTimeout(()=>{
      setDebouncedQuery(searchQuery)
    },300)

    return ()=> clearTimeout(timer)

  },[searchQuery])




  useEffect(()=>{

    if(!debouncedQuery){
      setResults([])
      return
    }

    const campaigns = campaignService.getAllCampaigns()
    const jobs = jobService.getAllJobs()

    const campaignResults = campaigns
      .filter(c =>
        c.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .map(c => ({
        ...c,
        type:"campaign"
      }))

    const jobResults = jobs
      .filter(j =>
        j.id.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .map(j => ({
        ...j,
        type:"job"
      }))

    setResults([...campaignResults,...jobResults])

  },[debouncedQuery])


  const handleSearch = (value:string)=>{
    setSearchQuery(value)
  }


  const toggleTheme = ()=>{
    setTheme(theme==="light" ? "dark" : "light")
  }


  return (
    <div className="relative size-full px-5 flex items-center text-white">



      <div
        className={`absolute left-0 top-0 w-full bg-gray-800 p-4 flex flex-col gap-3 transition-all duration-300
        ${showSearch ? "translate-y-1" : "-translate-y-full"}`}
      >

        <div className="flex items-center gap-3">

          <input
            type="text"
            value={searchQuery}
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 p-2 rounded bg-gray-600 outline-none"
          />

          <RxCross1
            className="text-xl cursor-pointer"
            onClick={()=>setShowSearch(false)}
          />

        </div>


        {results.length>0 && (

          <div className="w-full bg-white text-black rounded shadow-lg max-h-60 overflow-y-auto">

            {results.map((item:any)=>(

              <div
                key={`${item.type}-${item.id}`}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={()=>setSelected(item)}
              >

                {item.type==="campaign"
                  ? item.name
                  : `Job ${item.id}`
                }

                <span className="ml-2 text-xs text-gray-500">
                  {item.type}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      <div className="w-1/16 min-w-15 text-3xl">
        {!showSideBar && (
          <MdOutlineMenu onClick={handelShowSideNavBar}/>
        )}
      </div>

      <div>
        <h1>{title}</h1>
      </div>


      <div className="grow h-full flex justify-end items-center gap-6">


 
        <div className="relative grow max-w-100 h-1/2 max-md:w-50 max-sm:hidden shrink-10 pl-5">

          <input
            value={searchQuery}
            onChange={(e)=>handleSearch(e.target.value)}
            type="text"
            className="size-full bg-gray-500 rounded-lg outline-0 px-2"
            placeholder="Search campaigns or jobs..."
          />

          {results.length>0 && (

            <div className="absolute top-full left-0 w-full bg-white text-black rounded shadow-lg max-h-60 overflow-y-auto">

              {results.map((item:any)=>(

                <div
                  key={`${item.type}-${item.id}`}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={()=>setSelected(item)}
                >

                  {item.type==="campaign"
                    ? item.name
                    : `Job ${item.id}`
                  }

                  <span className="ml-2 text-xs text-gray-500">
                    {item.type}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>



        <div
          className="hidden max-sm:block text-2xl cursor-pointer"
          onClick={()=>setShowSearch(true)}
        >
          <FaSearch/>
        </div>


        <div
          className="min-w-10 text-3xl cursor-pointer"
          onClick={()=>setShowProfile(true)}
        >
          <CgProfile/>
        </div>

      </div>


  

      {showProfile && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">

          <div className="bg-white text-black p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">
              Profile
            </h2>

            <p><b>Name:</b> Test User</p>
            <p><b>Email:</b> test@something.com</p>
            <p><b>Role:</b> Admin</p>

            <div className="mt-4 flex justify-between items-center">

              {/* <span className="font-semibold">
                Theme
              </span> */}
{/* 
              <button
                onClick={toggleTheme}
                className="bg-gray-800 text-white px-3 py-1 rounded"
              >
                {theme==="light" ? "Dark Mode" : "Light Mode"}
              </button> */}

            </div>

            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={()=>setShowProfile(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* DETAILS MODAL */}

      {selected && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">

          <div className="bg-white text-black p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">

              {selected.type==="campaign"
                ? selected.name
                : `Job ${selected.id}`
              }

            </h2>

            <p><b>ID:</b> {selected.id}</p>

            {selected.type==="campaign" && (
              <>
                <p><b>Status:</b> {selected.status}</p>
                <p><b>Budget:</b> {selected.budget}</p>
              </>
            )}

            {selected.type==="job" && (
              <>
                <p><b>Campaign ID:</b> {selected.campaignId}</p>
                <p><b>Status:</b> {selected.status}</p>
              </>
            )}

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={()=>setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Header