import { useState } from "react"
import { useDispatch } from "react-redux"

import Input from "../builders/Input"
import Button from "../builders/Button"

import { jobService } from "../../services/jobService"
import { addJob } from "../../features/jobSlice"
import type { Job } from "../../features/jobSlice"
import type { CreateJobProps } from "./createJobTypes"
import toast from "react-hot-toast"




const CreateJob = ({ onJobCreated }: CreateJobProps) => {
  const dispatch = useDispatch()

  const [campaignId, setCampaignId] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!campaignId) return

    try {
      setLoading(true)

      const newJob: Job = {
        id: Date.now().toString(),
        campaignId,
        status: "pending"
      }

      const job = await jobService.createJob(newJob)
      dispatch(addJob(job))
      setCampaignId("")


      if (onJobCreated) await onJobCreated()
    } catch (err) {
      toast.error("Failed to create job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold">Create Job</h2>

      <Input
        placeholder="Campaign ID"
        value={campaignId}
        onChange={(e: any) => setCampaignId(e.target.value)}
      />

      <Button
        onClick={handleCreate}
        text={loading ? "Creating..." : "Create Job"}
      />
    </div>
  )
}

export default CreateJob