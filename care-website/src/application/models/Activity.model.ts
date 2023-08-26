import Image from './Image.model'

export default interface Activity {
   _id: string
   imageList: Image[]
   active: boolean
   activityDate: string
   title: string
   content: string
   __v: number
}
