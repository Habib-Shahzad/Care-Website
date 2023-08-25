import Image from './Image.model'

export default interface Blog {
   _id: string
   title: string
   content: string
   active: boolean
   imageList: Image[]
   blogType: string
}
