import { campaigns } from "../mock/campaigns"
import { delay } from "../utils/delay"
import { randomFail } from "../utils/randomFail"
import { paginate } from "../utils/pagination"

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

let campaignStore: Campaign[] = [...campaigns]

export const campaignService = {

  getAllCampaigns() {
    return campaignStore
  },

  async getCampaigns(
    page = 1,
    limit = 5,
    search = ""
  ) {

    await delay(700)
    randomFail()

    let filtered = campaignStore

    if (search) {
      filtered = campaignStore.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return paginate(filtered, page, limit)
  },

  async getCampaignById(id: string) {

    await delay(400)
    randomFail()

    const campaign = campaignStore.find(c => c.id === id)

    if (!campaign) {
      throw new Error("Campaign not found")
    }

    return campaign
  },

  async createCampaign(data: Campaign) {

    await delay(500)
    randomFail()

    campaignStore.push(data)

    return data
  },

  async updateCampaign(
    id: string,
    data: Partial<Campaign>
  ) {

    await delay(500)
    randomFail()

    const index = campaignStore.findIndex(c => c.id === id)

    if (index === -1) {
      throw new Error("Campaign not found")
    }

    campaignStore[index] = {
      ...campaignStore[index],
      ...data
    }

    return campaignStore[index]
  },

  async deleteCampaign(id: string) {

    await delay(500)
    randomFail()

    campaignStore = campaignStore.filter(
      c => c.id !== id
    )

    return true
  }

}