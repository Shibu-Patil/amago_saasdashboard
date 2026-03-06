
export type Paginated<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

export const paginate = <T>(data: T[], page: number, limit: number): Paginated<T> => {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    data: data.slice(start, end),
    total: data.length,
    page,
    limit
  }
}