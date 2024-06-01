import Image from './Image.model'

export enum BlogType {
   PATIENT_WELFARE = 'PATIENT_WELFARE',
   COMMUNITY_OUTREACH = 'COMMUNITY_OUTREACH',
   RESEARCH_DEVELOPMENT = 'RESEARCH_DEVELOPMENT',
}

export default interface Blog {
   _id: string
   title: string
   content: string
   active: boolean
   imageList: Image[]
   blogType: BlogType
}
