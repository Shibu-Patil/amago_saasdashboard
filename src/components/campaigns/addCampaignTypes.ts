import type { Campaign } from "../../mock/campaigns"

export interface AddCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (campaign: Campaign) => void
}