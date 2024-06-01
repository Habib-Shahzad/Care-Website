import {
   ColorScheme,
   ColorSchemeProvider,
   MantineProvider,
} from '@mantine/core'

import { useHotkeys } from '@mantine/hooks'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { PropsWithChildren, useState } from 'react'
import AdminLayout from '../AdminLayout'

const DefaultLayout = (props: PropsWithChildren) => {
   const { children } = props

   const [colorScheme, setColorScheme] = useState<ColorScheme>(
      getCookie('mantine-color-scheme') as ColorScheme
   )

   const router = useRouter()
   const { pathname } = router
   const isAdminPath = pathname.startsWith('/admin')

   const toggleColorScheme = (value?: ColorScheme) => {
      const nextColorScheme =
         value || (colorScheme === 'dark' ? 'light' : 'dark')
      setColorScheme(nextColorScheme)
      setCookie('mantine-color-scheme', nextColorScheme, {
         maxAge: 60 * 60 * 24 * 30,
      })
   }

   useHotkeys([['mod+J', () => toggleColorScheme()]])

   return (
      <>
         <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
         >
            <MantineProvider
               theme={{
                  colorScheme,
                  fontFamily: 'Montserrat, sans-serif',
               }}
               withGlobalStyles
               withNormalizeCSS
            >
               {isAdminPath ? <AdminLayout>{children}</AdminLayout> : null}
            </MantineProvider>
         </ColorSchemeProvider>
      </>
   )
}

export default DefaultLayout
