import Image from './Image.model'

interface Member {
   name: string
   role: string
   image: Image
   _id: string
}



export default interface Department {
   _id: string
   name: string
   active: boolean
   members: Member[]
   __v: number
}
