import { ReactNode } from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'

type LayoutProviderProps = {
   children: ReactNode
}

export const LayoutProvider = (props: LayoutProviderProps) => {
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

   return <DefaultLayout>{props.children}</DefaultLayout>
}
