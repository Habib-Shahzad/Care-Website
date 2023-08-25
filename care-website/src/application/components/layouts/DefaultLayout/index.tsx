import {
   AppShell,
   ColorScheme,
   ColorSchemeProvider,
   MantineProvider,
   useMantineTheme,
} from '@mantine/core'

import { useHotkeys } from '@mantine/hooks'
import { ReactNode, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import CustomNavbar from '../../core/Navbar'
import Footer from '../../core/Footer'

export type DefaultLayoutProps = {
   children: ReactNode
}

const DefaultLayout = (props: DefaultLayoutProps) => {
   const { children } = props

   const [colorScheme, setColorScheme] = useState<ColorScheme>(
      getCookie('mantine-color-scheme') as ColorScheme
   )

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

      { link: '/aims', label: 'Our Aims' },
      { link: '/team', label: 'Know the Team' },
      { link: '/contact', label: 'Contact Us' },
   ]

   return (
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
   )
}

export default DefaultLayout
