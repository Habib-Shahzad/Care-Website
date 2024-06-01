import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import { Header, Text } from '@mantine/core'

export default function AdminHeader() {
   const { adminUserState } = useAdminContext()

   return (
      <>
         {adminUserState && (
            <Header height={{ base: 66 }} p="md">
               <div className="flex flex-row flex-nowrap justify-between h-100">
                  <div className="flex flex-nowrap">
                     <Text className="self-center">{`${adminUserState?.email}`}</Text>
                  </div>
               </div>
            </Header>
         )}
      </>
   )
}
