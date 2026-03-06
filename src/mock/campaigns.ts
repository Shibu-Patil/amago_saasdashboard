export type CampaignStatus =
  | "active"
  | "paused"
  | "completed"

export type Campaign = {
  id: string
  name: string
  status: CampaignStatus
  budget: number
  createdAt: string
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale",
    status: "active",
    budget: 5000,
    createdAt: "2026-03-01"
  },
  {
    id: "2",
    name: "Black Friday",
    status: "paused",
    budget: 8000,
    createdAt: "2026-03-02"
  },
  {
    id: "3",
    name: "Winter Ads",
    status: "completed",
    budget: 3000,
    createdAt: "2026-03-03"
  },
  {
    id: "4",
    name: "Diwali Campaign",
    status: "active",
    budget: 9000,
    createdAt: "2026-03-04"
  }
]