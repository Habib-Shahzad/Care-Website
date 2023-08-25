import { ReactNode } from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'

type LayoutProviderProps = {
   children: ReactNode
}

export const LayoutProvider = (props: LayoutProviderProps) => {

   return <DefaultLayout>{props.children}</DefaultLayout>
}
