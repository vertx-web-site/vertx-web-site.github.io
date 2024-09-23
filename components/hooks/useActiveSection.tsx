import { ReactNode, createContext, useContext, useRef } from "react"
import { StoreApi, UseBoundStore, create, useStore } from "zustand"

interface ActiveSectionState {
  activeSection: string | undefined
  setActiveSection: (activeSection: string | undefined) => void
}

const ActiveSectionContext = createContext<UseBoundStore<
  StoreApi<ActiveSectionState>
> | null>(null)

export const ActiveSectionProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const storeRef = useRef<UseBoundStore<StoreApi<ActiveSectionState>> | null>(
    null,
  )
  if (!storeRef.current) {
    storeRef.current = create<ActiveSectionState>()(set => ({
      activeSection: undefined,
      setActiveSection: activeSection => set(_ => ({ activeSection })),
    }))
  }
  return (
    <ActiveSectionContext.Provider value={storeRef.current}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection<S>(
  selector: (state: ActiveSectionState) => S,
): S {
  const store = useContext(ActiveSectionContext)
  if (!store) {
    throw new Error("Missing ActiveSectionProvider")
  }
  return useStore(store, selector)
}
