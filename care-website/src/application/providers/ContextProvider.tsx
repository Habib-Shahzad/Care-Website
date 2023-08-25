import React, { createContext, useContext, useState } from 'react'
import Blog from '../models/Blog.model'
import Activity from '../models/Activity.model'
import Department from '../models/Department.model'
import HomePageData from '../models/Home.page.model'

// Create the context
type DataContextType = {
   patientWelfareBlogs: Blog[]
   setPatientWelfareBlogs: React.Dispatch<React.SetStateAction<Blog[]>>
   communityOutreachBlogs: Blog[]
   setCommunityOutreachBlogs: React.Dispatch<React.SetStateAction<Blog[]>>
   researchDevelopmentBlogs: Blog[]
   setResearchDevelopmentBlogs: React.Dispatch<React.SetStateAction<Blog[]>>

   activities: Activity[]
   setActivities: React.Dispatch<React.SetStateAction<Activity[]>>

   departments: Department[]
   setDepartments: React.Dispatch<React.SetStateAction<Department[]>>

   homePageData: HomePageData | null
   setHomePageData: React.Dispatch<React.SetStateAction<HomePageData | null>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useDataContext() {
   const context = useContext(DataContext)
   if (!context) {
      throw new Error(
         'useDataContext must be used within a DataContextProvider'
      )
   }
   return context
}

// Context Provider component
export function DataContextProvider(props: { children: React.ReactNode }) {
   const { children } = props

   const [patientWelfareBlogs, setPatientWelfareBlogs] = useState<Blog[]>([])
   const [communityOutreachBlogs, setCommunityOutreachBlogs] = useState<Blog[]>(
      []
   )
   const [homePageData, setHomePageData] = useState<HomePageData | null>(null)
   const [researchDevelopmentBlogs, setResearchDevelopmentBlogs] = useState<
      Blog[]
   >([])

   const [activities, setActivities] = useState<any[]>([])
   const [departments, setDepartments] = useState<any[]>([])

   return (
      <DataContext.Provider
         value={{
            patientWelfareBlogs,
            setPatientWelfareBlogs,
            communityOutreachBlogs,
            setCommunityOutreachBlogs,
            researchDevelopmentBlogs,
            setResearchDevelopmentBlogs,

            activities,
            setActivities,

            departments,
            setDepartments,

            homePageData,
            setHomePageData,
         }}
      >
         {children}
      </DataContext.Provider>
   )
}
