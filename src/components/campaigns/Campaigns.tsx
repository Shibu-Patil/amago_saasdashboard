import { useEffect, useState } from "react"
import { campaignService } from "../../services/campaignService"
import type { Campaign } from "../../services/campaignService"

import Label from "../builders/Label"
import Table from "../builders/Table"
import Loader from "../builders/Loader"
import Button from "../builders/Button"
import AddCampaignModal from "./AddCampaignModal"

import { useDebounce } from "../../hooks/useDebounce"

import toast from "react-hot-toast"

const Campaigns = () => {

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const limit = 5

  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const debouncedName = useDebounce(nameFilter, 500)
  const debouncedStatus = useDebounce(statusFilter, 500)

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

  const [bulkAction, setBulkAction] = useState("")

  const fetchCampaigns = async (pageNumber = 1) => {

    try {

      setLoading(true)

      const res = await campaignService.getCampaigns(pageNumber, limit)

      let filtered = [...res.data]

      if (debouncedName) {
        filtered = filtered.filter(c =>
          c.name.toLowerCase().includes(debouncedName.toLowerCase())
        )
      }

      if (debouncedStatus) {
        filtered = filtered.filter(c => c.status === debouncedStatus)
      }

      setCampaigns(filtered)
      setTotal(res.total)
      setPage(res.page)

    } catch (err: any) {

      setError(err.message || "Failed to fetch campaigns")

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    fetchCampaigns()

  }, [debouncedName, debouncedStatus])



  const handleCreateCampaign = async (campaign: Campaign) => {

    try {

      await campaignService.createCampaign(campaign)

      toast.success("Campaign created")

      fetchCampaigns(1)

      setIsModalOpen(false)

    } catch {

      toast.error("Failed to create campaign")

    }
  }



  const toggleSelect = (id: string) => {

    setSelectedCampaigns(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }



  const toggleSelectAll = () => {

    if (selectedCampaigns.length === campaigns.length) {

      setSelectedCampaigns([])

    } else {

      setSelectedCampaigns(campaigns.map(c => c.id))

    }
  }



  const handleBulkDelete = async () => {

    try {

      await Promise.all(
        selectedCampaigns.map(id =>
          campaignService.deleteCampaign(id)
        )
      )

      toast.success("Campaigns deleted")

      setSelectedCampaigns([])

      fetchCampaigns(page)

    } catch {

      toast.error("Failed to delete campaigns")

    }
  }



  const handleBulkPause = async () => {

    try {

      await Promise.all(
        selectedCampaigns.map(id =>
          campaignService.updateCampaign(id, { status: "paused" })
        )
      )

      toast.success("Campaigns paused")

      setSelectedCampaigns([])

      fetchCampaigns(page)

    } catch {

      toast.error("Failed to update campaigns")

    }
  }



  const handleBulkActivate = async () => {

    try {

      await Promise.all(
        selectedCampaigns.map(id =>
          campaignService.updateCampaign(id, { status: "active" })
        )
      )

      toast.success("Campaigns activated")

      setSelectedCampaigns([])

      fetchCampaigns(page)

    } catch {

      toast.error("Failed to update campaigns")

    }
  }



  const handleBulkComplete = async () => {

    try {

      await Promise.all(
        selectedCampaigns.map(id =>
          campaignService.updateCampaign(id, { status: "completed" })
        )
      )

      toast.success("Campaigns completed")

      setSelectedCampaigns([])

      fetchCampaigns(page)

    } catch {

      toast.error("Failed to update campaigns")

    }
  }



  const handleBulkAction = () => {

    if (!bulkAction) return

    switch (bulkAction) {

      case "delete":
        handleBulkDelete()
        break

      case "active":
        handleBulkActivate()
        break

      case "paused":
        handleBulkPause()
        break

      case "completed":
        handleBulkComplete()
        break
    }

    setBulkAction("")
  }



  if (loading) return <Loader />

  if (error) return <div className="p-6 text-red-500">{error}</div>



  const totalPages = Math.ceil(total / limit)



  return (

    <div className="p-4 md:p-6 space-y-6">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <h1 className="text-2xl font-bold">Campaigns</h1>

        <Button text="Add Campaign" onClick={() => setIsModalOpen(true)} />

      </div>



      <AddCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCampaign}
      />



      <div className="flex flex-col sm:flex-row flex-wrap gap-2">

        <input
          type="text"
          placeholder="Filter Name"
          className="border rounded px-2 py-1 sm:w-40 w-full"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <select
          className="border rounded px-2 py-1 sm:w-40 w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>

      </div>



      {selectedCampaigns.length > 0 && (

        <div className="flex items-center gap-3">

          <select
            className="border rounded px-3 py-2"
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
          >

            <option value="">Bulk Action</option>

            <option value="active">Activate</option>

            <option value="paused">Pause</option>

            <option value="completed">Complete</option>

            <option value="delete">Delete</option>

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

        <Table headers={["", "Name", "Status", "Budget", "Created"]}>

          <tr>
            <td className="p-4">
              <input
                type="checkbox"
                checked={selectedCampaigns.length === campaigns.length && campaigns.length > 0}
                onChange={toggleSelectAll}
              />
            </td>
            <td colSpan={4}></td>
          </tr>

          {campaigns.map((campaign) => {

            let labelType: "info" | "success" | "warning" = "info"

            switch (campaign.status) {
              case "active":
                labelType = "success"
                break
              case "paused":
                labelType = "warning"
                break
              case "completed":
                labelType = "info"
                break
            }

            return (

              <tr key={campaign.id} className="border-t">

                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => toggleSelect(campaign.id)}
                  />
                </td>

                <td className="p-4">{campaign.name}</td>

                <td className="p-4">
                  <Label text={campaign.status} type={labelType} />
                </td>

                <td className="p-4">${campaign.budget}</td>

                <td className="p-4">{campaign.createdAt}</td>

              </tr>

            )
          })}

        </Table>

      </div>



      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">

        <button
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => fetchCampaigns(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => fetchCampaigns(page + 1)}
        >
          Next
        </button>

      </div>

    </div>

  )
}

export default Campaigns