import Image from './Image.model'

export interface Member {
   name: string
   role: string
   image: Image
   _id: string
}

export interface _Member {
   name: string
   role: string
   image: string
   _id: string
}

export default interface Department {
   _id: string
   name: string
   active: boolean
   members: Member[]
   __v: number
}
