import { AdminNetworkingManager } from '@/admin/networking'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../models/user.model'

// Create the context
type AdminUserContextType = {
   loading: boolean
   adminUserState: User | null
   setAdminUserState: React.Dispatch<React.SetStateAction<User | null>>
   activeTab: string
   setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const AdminUserContext = createContext<AdminUserContextType | undefined>(
   undefined
)

export function useAdminContext() {
   const context = useContext(AdminUserContext)
   if (!context) {
      throw new Error(
         'useDataContext must be used within a DataContextProvider'
      )
   }
   return context
}

export default function AdminContextProvider(props: {
   children: React.ReactNode
}) {
   const [adminUserState, setAdminUserState] = useState<any>(null)
   const [loading, setLoading] = useState(true)
   const [active, setActive] = useState('User')

   const { children } = props

   useEffect(() => {
      ;(async () => {
         const response = await AdminNetworkingManager.loggedInUser()
         if (response.successAdmin) {
            setAdminUserState(response.admin_user)
         }
         setLoading(false)
      })()
   }, [])

   return (
      <AdminUserContext.Provider
         value={{
            loading: loading,
            adminUserState: adminUserState,
            setAdminUserState: setAdminUserState,
            activeTab: active,
            setActiveTab: setActive,
         }}
      >
         {children}
      </AdminUserContext.Provider>
   )
}
