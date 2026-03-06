export type JobStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"

export type Job = {
  id: string
  campaignId: string
  status: JobStatus
}