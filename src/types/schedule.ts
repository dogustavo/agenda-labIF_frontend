interface ISchedule {
  id: number
  status: 'approved' | 'repproved' | 'pending'
  scheduledBy: string
  equipamentName: string
  evaluatedBy: number | null
  scheduleDate: string // Considerar `Date` se você for manipular como objeto Date
  timeInit: string
  timeEnd: string
}

interface IMeta {
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface IScheduleResponse {
  data: ISchedule[]
  meta: IMeta
}
