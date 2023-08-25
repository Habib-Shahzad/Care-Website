import LoginComponent from '@/admin/components/Login'
import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import { Center, Container, Loader } from '@mantine/core'

import { UserDB } from '@/admin/database/user'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import UserTable from '@/admin/tables/UserTable'
import BlogTable from '@/admin/tables/BlogsTable'
import ActivityTable from '@/admin/tables/ActivityTable'
import DepartmentTable from '@/admin/tables/DepartmentTable'
import ImagesTable from '@/admin/tables/ImageTable'

export default function Admin() {
   const { adminUserState, loading, activeTab } = useAdminContext()

   return (
      <div>
         {loading ? (
            <Center>
               <Loader color="black" />{' '}
            </Center>
         ) : (
            <>
               {!adminUserState ? (
                  <>
                     <LoginComponent />
                  </>
               ) : (
                  <Container>
                     <>{activeTab === 'User' && <UserTable />}</>
                     <>{activeTab === 'Blogs' && <BlogTable />}</>
                     <>{activeTab === 'Activities' && <ActivityTable />}</>
                     <>{activeTab === 'Department' && <DepartmentTable />}</>
                     <>{activeTab === 'Images' && <ImagesTable />}</>
                  </Container>
               )}
            </>
         )}
      </div>
   )
}
