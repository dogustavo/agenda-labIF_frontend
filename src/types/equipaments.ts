interface IMeta {
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface IEquipaments {
  id: number
  equipamentName: string
  availableFrom: string
  availableTo: string
}

export interface IEquipamentsResponse {
  data: IEquipaments[]
  meta: IMeta
}
