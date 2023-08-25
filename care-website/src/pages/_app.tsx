import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { FC, ReactNode, useEffect } from 'react'

import '@/styles/globals.scss'
import { LayoutProvider } from '@/application/providers/LayoutProvider'

const SafeHydrate: FC<{ children: ReactNode }> = (props) => {
   /*
	 * ---------- WARNING: THIS WILL DISABLE SSR AND THE NEXT.JS DYNAMIC ROUTING FEATURE ----------
	 
	 */

   const { children } = props
   return (
      <div suppressHydrationWarning>
         {typeof window === 'undefined' ? null : children}
      </div>
   )
}

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <SafeHydrate>
         <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
               fontFamily: 'Poppins, sans-serif',
               colors: {
                  primary: ['#f2ae1c'],
                  secondary: ['#05046a', '#5e85bc'],
                  accent: ['#f27781'],
                  background: [
                     '#f5f5f5',
                     '#f2f2f2',
                     '#b6b6b6',
                     '#646466',
                     '#333333',
                  ],
                  lightBlue: ['#5e85bc'],
               },
               primaryColor: 'primary',
               globalStyles: (theme) => ({
                  '*, *::before, *::after': {
                     boxSizing: 'border-box',
                     margin: 0,
                     padding: 0,
                  },
                  body: {
                     fontFamily: 'Poppins, sans-serif',
                  },

                  '.pointer': {
                     cursor: 'pointer',
                  },
               }),
            }}
         >
            <LayoutProvider>
               <Component {...pageProps} />
            </LayoutProvider>
         </MantineProvider>
      </SafeHydrate>
   )
}

export default dynamic(() => Promise.resolve(App), { ssr: false })
