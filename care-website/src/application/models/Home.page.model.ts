import Image from './Image.model'

export default interface HomePageData {
   _id: string | null
   mainContent: string | null
   mainImage: Image | null
   ambassadorImage: Image | null
}
