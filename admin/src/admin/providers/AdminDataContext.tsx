import { AdminNetworkingManager } from '@/admin/networking'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../models/user.model'
import Blog from '@/application/models/Blog.model'
import Image from '@/application/models/Image.model'
import Activity from '@/application/models/Activity.model'
import Department from '@/application/models/Department.model'
import HomePageData from '@/application/models/Home.page.model'

// Create the context
type AdminDataContextType = {
   loading: boolean
   setLoading: React.Dispatch<React.SetStateAction<boolean>>

   userList: User[]
   setUserList: React.Dispatch<React.SetStateAction<User[]>>

   blogList: Blog[]
   setBlogList: React.Dispatch<React.SetStateAction<Blog[]>>

   imageList: Image[]
   setImageList: React.Dispatch<React.SetStateAction<Image[]>>

   activityList: Activity[]
   setActivityList: React.Dispatch<React.SetStateAction<Activity[]>>

   departmentList: Department[]
   setDepartmentList: React.Dispatch<React.SetStateAction<Department[]>>

   homePageData: HomePageData | null
   setHomePageData: React.Dispatch<React.SetStateAction<HomePageData | null>>
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(
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
   const [blogList, setBlogList] = useState<Blog[]>([])
   const [imageList, setImageList] = useState<Image[]>([])
   const [activityList, setActivityList] = useState<Activity[]>([])
   const [departmentList, setDepartmentList] = useState<Department[]>([])
   const [homePageData, setHomePageData] = useState<HomePageData | null>(null)
   const [loading, setLoading] = useState(true)

   const { children } = props

   return (
      <AdminDataContext.Provider
         value={{
            loading: loading,
            setLoading: setLoading,
            userList: userList,
            setUserList,
            blogList,
            setBlogList,
            imageList,
            setImageList,
            activityList,
            setActivityList,
            departmentList,
            setDepartmentList,
            homePageData,
            setHomePageData,
         }}
      >
         {children}
      </AdminDataContext.Provider>
   )
}
