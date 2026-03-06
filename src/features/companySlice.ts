import { createSlice } from "@reduxjs/toolkit"
import  type {PayloadAction } from "@reduxjs/toolkit"

export interface Company {
  id: string
  name: string
  industry: string
}

interface CompanyState {
  companies: Company[]
}

const initialState: CompanyState = {
  companies: []
}

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {

    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload
    },

    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload)
    },

    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        c => c.id !== action.payload
      )
    }
  }
})

export const { setCompanies, addCompany, removeCompany } = companySlice.actions
export default companySlice.reducer