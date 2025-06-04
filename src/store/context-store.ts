import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MenuStoreProps {
  origem: {
    nome: string | null
    value: string | null
  }
  setOrigem: (menu: { 
    nome: string | null; 
    value: string | null 
  }) => void
 }

interface PageProps {
page: 'home' | 'pdca' | 'notFound' | 'login' | 'admin' | null
setPage: (page: 'home' | 'pdca' | 'notFound' | 'login' | 'admin' | null) => void
}
interface GlobalFilterStoreProps {
  version: string | null
  costCenter: string | null
  period: string | null
  accountingAccount: string | null
  setAccountingAccount: (filter: string) => void
  setPeriod: (filter: string) => void
  setCostCenter: (filter: string) => void
  setVersion: (filter: string) => void
}

export const useStoreOrigem = create<MenuStoreProps>()(
  persist(
    (set) => ({
      origem: {
        nome: null,
        value: null,
      },
      setOrigem: (menu) => {
        set({ origem: { nome: menu.nome, value: menu.value } })
      }
    }),
    {
      name: 'menu-selection',
    }
  )
)

export const usePageStore = create<PageProps>(set => ({
  page: null,
  setPage: (page) => set({ page: page }),
}))

export const useUserInfoStore = create(set => ({
  user: null,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setUser: (user:any) => set({ user: user }),
}))

export const GlobalFilterStore = create<GlobalFilterStoreProps>()(
  persist(
    (set) => ({
      version: null,
      costCenter: null,
      period: null,
      accountingAccount: null,
      setAccountingAccount: (filter) => set({ accountingAccount: filter }),
      setPeriod: (filter) => set({ period: filter }),
      setCostCenter: (filter) => set({ costCenter: filter }),
      setVersion: (filter) => set({ version: filter }),
    }),
    {
      name: 'global-filter',
    }
  )       
)