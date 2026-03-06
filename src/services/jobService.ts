import { jobs } from "../mock/jobs"
import type { Job, JobStatus } from "../mock/jobTypes"
import { delay } from "../utils/delay"
import { randomFail } from "../utils/randomFail"
import { paginate } from "../utils/pagination"
import type { Paginated } from "../utils/pagination"

let jobStore: Job[] = [...jobs]

export const jobService = {

  getAllJobs() {
    return jobStore
  },

  async getJobs(
    page = 1,
    limit = 5,
    campaignId?: string
  ): Promise<Paginated<Job>> {

    await delay(700)
    randomFail()

    let filtered = jobStore

    if (campaignId) {
      filtered = jobStore.filter(
        (job) => job.campaignId === campaignId
      )
    }

    return paginate<Job>(filtered, page, limit)
  },

  async createJob(job: Job) {

    await delay(500)
    randomFail()

    jobStore.push(job)

    return job
  },

  async updateJobStatus(
    id: string,
    status: JobStatus
  ) {

    await delay(500)
    randomFail()

    const index = jobStore.findIndex(
      (j) => j.id === id
    )

    if (index === -1) {
      throw new Error("Job not found")
    }

    jobStore[index] = {
      ...jobStore[index],
      status
    }

    return jobStore[index]
  }

}