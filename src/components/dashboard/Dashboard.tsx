import { useEffect, useState } from "react"

import { campaignService } from "../../services/campaignService"
import { jobService } from "../../services/jobService"

import Loader from "../builders/Loader"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const COLORS = ["#f00", "#f59e0b", "#3b82f6","#10b981"]

const Dashboard = () => {

  const [campaigns,setCampaigns] = useState<any[]>([])
  const [jobs,setJobs] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function loadData(){

      try{

        setLoading(true)

        const campaignRes = await campaignService.getCampaigns(1,100)
        const jobRes = await jobService.getJobs(1,100)

        setCampaigns(campaignRes.data)
        setJobs(jobRes.data)

      }catch(err){
        console.error(err)
      }
      finally{
        setLoading(false)
      }

    }

    loadData()

  },[])


  if(loading){
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader/>
      </div>
    )
  }


  const totalCampaigns = campaigns.length

  const activeCampaigns = campaigns.filter(
    c => c.status === "active"
  ).length

  const totalJobs = jobs.length

  const completedJobs = jobs.filter(
    j => j.status === "completed"
  ).length


  const campaignStatusData = [
    {
      name: "Active",
      value: campaigns.filter(c => c.status === "active").length
    },
    {
      name: "Paused",
      value: campaigns.filter(c => c.status === "paused").length
    },
    {
      name: "Completed",
      value: campaigns.filter(c => c.status === "completed").length
    }
  ]


  const jobStatusData = [
    {
      name: "Failed",
      value: jobs.filter(j => j.status === "failed").length
    },
    {
      name: "Processing",
      value: jobs.filter(j => j.status === "processing").length
    },
    {
      name: "Completed",
      value: jobs.filter(j => j.status === "completed").length
    },    {
      name: "Pending",
      value: jobs.filter(j => j.status === "pending").length
    }

  ]

  // console.log(jobStatusData);
  


  return (
    <div className="p-4 md:p-6 space-y-6">

  

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-gray-500 text-sm">Total Campaigns</h2>
          <p className="text-2xl md:text-3xl font-bold">{totalCampaigns}</p>
        </div>

        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-gray-500 text-sm">Active Campaigns</h2>
          <p className="text-2xl md:text-3xl font-bold">{activeCampaigns}</p>
        </div>

        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-gray-500 text-sm">Total Jobs</h2>
          <p className="text-2xl md:text-3xl font-bold">{totalJobs}</p>
        </div>

        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="text-gray-500 text-sm">Completed Jobs</h2>
          <p className="text-2xl md:text-3xl font-bold">{completedJobs}</p>
        </div>

      </div>




      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="mb-4 font-semibold text-sm md:text-base">
            Campaign Status
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={campaignStatusData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="value" fill="#6366f1"/>
            </BarChart>
          </ResponsiveContainer>

        </div>


        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="mb-4 font-semibold text-sm md:text-base">
            Job Status
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={jobStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >

                {jobStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]}/>
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

export default Dashboard