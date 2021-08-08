export interface Pagination {
  limit: number,
  page: number,
  total: number
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>