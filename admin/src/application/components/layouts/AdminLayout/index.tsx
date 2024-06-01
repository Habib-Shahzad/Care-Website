import AdminHeader from '@/admin/components/Header'
import AdminNavbarSimple from '@/admin/components/Navbar'
import AdminContextProvider from '@/admin/providers/AdminContextProvider'
import AdminDataContextProvider from '@/admin/providers/AdminDataContext'
import { AppShell, Footer } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ReactNode } from 'react'

export default function AdminLayout(props: { children: ReactNode }) {
   const { children } = props

   return (
      <>
         <AdminContextProvider>
            <AdminDataContextProvider>
               <AppShell
                  styles={(theme) => {
                     return {
                        main: {
                           backgroundColor:
                              theme.colorScheme === 'dark'
                                 ? theme.colors.dark[8]
                                 : theme.colors.gray[0],
                        },
                     }
                  }}
                  navbarOffsetBreakpoint="sm"
                  header={<AdminHeader />}
                  navbar={<AdminNavbarSimple />}
                  footer={
                     <Footer
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                        }}
                        height={60}
                        p="md"
                     >
                        Care Admin Panel @ 2023
                     </Footer>
                  }
               >
                  <Notifications />
                  {children}
               </AppShell>
            </AdminDataContextProvider>
         </AdminContextProvider>
      </>
   )
}
