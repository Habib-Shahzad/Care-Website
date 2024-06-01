import {
   AppShell,
   ColorScheme,
   ColorSchemeProvider,
   MantineProvider,
} from '@mantine/core'

import { useHotkeys } from '@mantine/hooks'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { PropsWithChildren, useState } from 'react'
import Footer from '../../core/Footer'
import CustomNavbar from '../../core/Navbar'

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

   const routes = [
      { link: '/', label: 'Home' },
      { link: '/community-outreach', label: 'Community Outreach' },
      { link: '/research-development', label: 'Research & Development' },
      { link: '/patient-welfare', label: 'Patient Welfare' },
      { link: '/our-activities', label: 'Our Activities' },

      { link: '/our-aims', label: 'Our Aims' },
      { link: '/our-team', label: 'Know the Team' },
      {
         link: 'https://api.whatsapp.com/send?phone=923332401013',
         label: 'Contact Us',
      },
   ]

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
                  header={<CustomNavbar links={routes} />}
                  footer={<Footer />}
               >
                  {children}
               </AppShell>
            </MantineProvider>
         </ColorSchemeProvider>
      </>
   )
}

export default DefaultLayout
