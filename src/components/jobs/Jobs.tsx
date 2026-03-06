// components/jobs/Jobs.tsx
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { jobService } from "../../services/jobService"
import { setJobs } from "../../features/jobSlice"
import type { RootState } from "../../store/store"
import type { Job } from "../../features/jobSlice"
import type { Paginated } from "../../utils/pagination"
import type { JobStatus } from "../../mock/jobTypes"

import Label from "../builders/Label"
import Table from "../builders/Table"
import Loader from "../builders/Loader"
import Button from "../builders/Button"
import CreateJob from "./CreateJob"
import { useDebounce } from "../../hooks/useDebounce"

const Jobs = () => {

  const dispatch = useDispatch()
  const jobs = useSelector((state: RootState) => state.jobs.jobs)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const limit = 5


  const [jobIdFilter, setJobIdFilter] = useState("")
  const [campaignFilter, setCampaignFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const debouncedJobId = useDebounce(jobIdFilter, 500)
  const debouncedCampaign = useDebounce(campaignFilter, 500)
  const debouncedStatus = useDebounce(statusFilter, 500)


  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState("")


  const fetchJobs = async (pageNumber = 1) => {
    try {

      setLoading(true)

      const res: Paginated<Job> = await jobService.getJobs(pageNumber, limit)

      let filtered = [...res.data]

      if (debouncedJobId) filtered = filtered.filter(j => j.id.includes(debouncedJobId))
      if (debouncedCampaign) filtered = filtered.filter(j => j.campaignId.includes(debouncedCampaign))
      if (debouncedStatus) filtered = filtered.filter(j => j.status === debouncedStatus)

      dispatch(setJobs(filtered))

      setTotal(res.total)
      setPage(res.page)

    } catch (err: any) {

      setError(err.message || "Failed to fetch jobs")

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    fetchJobs()

  }, [debouncedJobId, debouncedCampaign, debouncedStatus])



  const toggleSelect = (id: string) => {

    setSelectedJobs(prev =>
      prev.includes(id)
        ? prev.filter(j => j !== id)
        : [...prev, id]
    )
  }


  const toggleSelectAll = () => {

    if (selectedJobs.length === jobs.length) {

      setSelectedJobs([])

    } else {

      setSelectedJobs(jobs.map(j => j.id))

    }
  }



  const updateStatus = async (status: JobStatus) => {

    try {

      await Promise.all(
        selectedJobs.map(id =>
          jobService.updateJobStatus(id, status)
        )
      )

      setSelectedJobs([])

      fetchJobs(page)

    } catch {

      alert("Failed to update jobs")

    }
  }



  const handleBulkAction = () => {

    if (!bulkAction) return

    updateStatus(bulkAction as JobStatus)

    setBulkAction("")
  }



  if (loading) return <Loader />
  if (error) return <div className="p-6 text-red-500">{error}</div>



  return (

    <div className="p-4 md:p-6 space-y-6">


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <h1 className="text-2xl font-bold">Jobs</h1>

        <Button text="Create Job" onClick={() => setIsModalOpen(true)} />

      </div>



      {isModalOpen && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-6 w-96 relative">

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <CreateJob
              onJobCreated={() => {
                fetchJobs(page)
                setIsModalOpen(false)
              }}
            />

          </div>

        </div>

      )}



      <div className="flex flex-col sm:flex-row flex-wrap gap-2">

        <input
          type="text"
          placeholder="Filter Job ID"
          className="border rounded px-2 py-1 sm:w-40 w-full"
          value={jobIdFilter}
          onChange={(e) => setJobIdFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter Campaign ID"
          className="border rounded px-2 py-1 sm:w-40 w-full"
          value={campaignFilter}
          onChange={(e) => setCampaignFilter(e.target.value)}
        />

        <select
          className="border rounded px-2 py-1 sm:w-40 w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

      </div>



      {selectedJobs.length > 0 && (

        <div className="flex items-center gap-3">

          <select
            className="border rounded px-3 py-2"
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
          >

            <option value="">Bulk Action</option>

            <option value="processing">Processing</option>

            <option value="completed">Completed</option>

            <option value="failed">Failed</option>

          </select>

          <button
            className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
            disabled={!bulkAction}
            onClick={handleBulkAction}
          >
            Do
          </button>

        </div>

      )}



      <div className="overflow-x-auto">

        <Table headers={["", "Job ID", "Campaign ID", "Status"]}>

          <tr>
            <td className="p-4">
              <input
                type="checkbox"
                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                onChange={toggleSelectAll}
              />
            </td>
            <td colSpan={3}></td>
          </tr>

          {jobs.map((job: Job) => {

            let labelType: "info" | "warning" | "success" | "danger" = "info"

            switch (job.status) {

              case "pending":
                labelType = "warning"
                break

              case "processing":
                labelType = "info"
                break

              case "completed":
                labelType = "success"
                break

              case "failed":
                labelType = "danger"
                break
            }

            return (

              <tr key={job.id} className="border-t">

                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => toggleSelect(job.id)}
                  />
                </td>

                <td className="p-4">{job.id}</td>

                <td className="p-4">{job.campaignId}</td>

                <td className="p-4">
                  <Label text={job.status} type={labelType} />
                </td>

              </tr>

            )
          })}

        </Table>

      </div>



      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">

        <button
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => fetchJobs(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>

        <button
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => fetchJobs(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default Jobs