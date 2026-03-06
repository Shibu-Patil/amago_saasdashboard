import { createSlice } from "@reduxjs/toolkit"
import  type{ PayloadAction } from "@reduxjs/toolkit"

export type JobStatus = "pending" | "processing" | "completed" | "failed"

// ✅ Updated Job interface to match jobService and CreateJob
export interface Job {
  id: string
  campaignId: string
  status: JobStatus
}

interface JobState {
  jobs: Job[]
}

const initialState: JobState = {
  jobs: []
}

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload)
    },
    updateJobStatus: (
      state,
      action: PayloadAction<{ id: string; status: JobStatus }>
    ) => {
      const job = state.jobs.find(j => j.id === action.payload.id)
      if (job) job.status = action.payload.status
    }
  }
})

export const { setJobs, addJob, updateJobStatus } = jobSlice.actions
export default jobSlice.reducer