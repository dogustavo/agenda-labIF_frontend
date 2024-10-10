import { create } from 'zustand'

export interface IToast {
  isOpen: boolean
  type?: 'success' | 'error' | null
}

export interface ToastStore extends IToast {
  setShowToast: (props: IToast) => void
  setCloseToast: () => void
}

const initialState: IToast = {
  isOpen: false,
  type: null
}

export const useToast = create<ToastStore>()((set) => ({
  ...initialState,
  setShowToast: (toast: IToast) =>
    set(() => {
      return toast
    }),
  setCloseToast: () => set(() => initialState)
}))