const API = 'http://localhost:3000'
// export const API = 'https://asherewecare.pk'
export const NETWORKING_API = `${API}/api`
import axios from 'axios'

enum BlogType {
   PATIENT_WELFARE = 'PATIENT_WELFARE',
   COMMUNITY_OUTREACH = 'COMMUNITY_OUTREACH',
   RESEARCH_DEVELOPMENT = 'RESEARCH_DEVELOPMENT',
}

export default class NetworkingManager {
   private static async listBlogs(blogType: BlogType) {
      try {
         const response = await axios.get(
            `${NETWORKING_API}/blog-by-type/${blogType}`
         )
         const data = response.data
         return data?.data ?? []
      } catch (error) {
         return []
      }
   }

   private static async modelData(modelName: string) {
      try {
         const response = await axios.get(
            `${NETWORKING_API}/${modelName}/table-data`
         )
         const data = response.data
         const result = data?.data ?? []
         return result
      } catch (error) {
         console.log(error)
         return []
      }
   }

   public static async getHomePageData() {
      try {
         const response = await axios.get(`${NETWORKING_API}/home-page/data`)
         const data = response.data
         const result = data?.data ?? {}
         return result
      } catch (error) {
         console.log(error)
         return {}
      }
   }

   public static async listPatientWelfareBlogs() {
      return await this.listBlogs(BlogType.PATIENT_WELFARE)
   }

   public static async listCommunityOutreachBlogs() {
      return await this.listBlogs(BlogType.COMMUNITY_OUTREACH)
   }

   public static listResearchDevelopmentBlogs() {
      return this.listBlogs(BlogType.RESEARCH_DEVELOPMENT)
   }

   public static listActivities() {
      return this.modelData('activity')
   }

   public static async listDepartments() {
      return await this.modelData('department')
   }
}
