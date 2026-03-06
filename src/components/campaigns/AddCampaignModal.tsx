import { useState } from "react"
import Button from "../builders/Button"
import Input from "../builders/Input"
import Label from "../builders/Label"
import type { Campaign, CampaignStatus } from "../../services/campaignService"
import type { AddCampaignModalProps } from "./addCampaignTypes"
import {toast} from "react-hot-toast"



const AddCampaignModal = ({ isOpen, onClose, onCreate }: AddCampaignModalProps) => {
  const [name, setName] = useState("")
  const [budget, setBudget] = useState<number>(0)
  const [status, setStatus] = useState<CampaignStatus>("active")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleCreate = async () => {
    if (!name || !budget) return toast.error("Please Fill the details")

    setLoading(true)
    try {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name,
        status,
        budget,
        createdAt: new Date().toISOString()
      }

      onCreate(newCampaign)
      setName("")
      setBudget(0)
      setStatus("active")
      onClose()
    } catch (err) {
      toast.error("Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed h-screen w-screen left-0 top-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">Add Campaign</h2>

        <Input
          placeholder="Campaign Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e: any) => setBudget(Number(e.target.value))}
        />

        <div>
          <Label text="Status" type="info" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CampaignStatus)}
            className="mt-1 w-full border rounded px-2 py-1"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Button
          onClick={handleCreate}
          text={loading ? "Creating..." : "Create Campaign"}
        />
      </div>
    </div>
  )
}

export default AddCampaignModal