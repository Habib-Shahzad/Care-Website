import LoginComponent from '@/admin/components/Login'
import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import { Center, Container, Loader } from '@mantine/core'

import HomePageForm from '@/admin/forms/HomePageForm'
import ActivityTable from '@/admin/tables/ActivityTable'
import BlogTable from '@/admin/tables/BlogsTable'
import DepartmentTable from '@/admin/tables/DepartmentTable'
import ImagesTable from '@/admin/tables/ImageTable'
import UserTable from '@/admin/tables/UserTable'
import { useDisclosure } from '@mantine/hooks'

export default function Admin() {
   const { adminUserState, loading, activeTab } = useAdminContext()
   const [openHomePageForm, { close }] = useDisclosure(true)

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
                     <>
                        {activeTab === 'Home Page' && (
                           <HomePageForm
                              opened={openHomePageForm}
                              handleOnClose={close}
                           />
                        )}
                     </>
                  </Container>
               )}
            </>
         )}
      </div>
   )
}
