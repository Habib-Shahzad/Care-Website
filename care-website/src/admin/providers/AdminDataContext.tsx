import { AdminNetworkingManeger } from '@/admin/networking'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../models/user.model'

// Create the context
type AdminDataContextType = {
   loading: boolean
   setLoading: React.Dispatch<React.SetStateAction<boolean>>

   userList: User[]
   setUserList: React.Dispatch<React.SetStateAction<User[]>>
}

export const AdminDataContext = createContext<AdminDataContextType | undefined>(
   undefined
)

export function useAdminDataContext() {
   const context = useContext(AdminDataContext)
   if (!context) {
      throw new Error(
         'useAdminDataContext must be used within a DataContextProvider'
      )
   }
   return context
}

export default function AdminDataContextProvider(props: {
   children: React.ReactNode
}) {
   const [userList, setUserList] = useState<User[]>([])
   const [loading, setLoading] = useState(true)

   const { children } = props

   return (
      <AdminDataContext.Provider
         value={{
            loading: loading,
            setLoading: setLoading,
            userList: userList,
            setUserList: setUserList,
         }}
      >
         {children}
      </AdminDataContext.Provider>
   )
}
