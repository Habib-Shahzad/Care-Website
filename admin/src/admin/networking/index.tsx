import { NETWORKING_API as API } from '@/application/networking'
import axios from 'axios'

const webClient = axios.create({
   baseURL: API,
   withCredentials: true,
})

webClient.interceptors.request.use((config) => {
   let token
   if (typeof window !== 'undefined') {
      token = localStorage.getItem('access_token_admin')
   }
   if (token) {
      config.headers['authorization'] = `Bearer ${token}`
   }
   return config
})

webClient.interceptors.response.use(
   (response) => {
      return response
   },
   async (error) => {
      if (error.response?.status === 403) {
         if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token_admin')
         }
      }
      return Promise.reject(error)
   }
)

export class AdminNetworkingManager {
   public static async loggedInUser() {
      const response = await webClient.get(`auth`)
      const content = response.data
      return content ?? null
   }

   public static async getHomePageData() {
      const response = await webClient.get(`home-page/data`)
      const content = response.data
      return content?.data
   }

   public static async loginUser(email: string, password: string) {
      const response = await webClient.post(`auth/admin-login`, {
         email: email,
         password: password,
      })
      const data = response.data
      const token = data?.token

      if (token) {
         localStorage.setItem('access_token_admin', token)
      }

      return data
   }

   public static async logoutUser() {
      await webClient.post(`auth/logout-admin`)
      if (typeof window !== 'undefined') {
         localStorage.removeItem('access_token_admin')
      }
   }

   public static async listModelData(model: string) {
      const response = await webClient.get(`${model}/table-data`)
      const content = response.data
      return content?.data
   }

   public static async setActiveModelData(
      model: string,
      selected: string[],
      active: boolean
   ) {
      const response = await webClient.patch(`${model}/set-active`, {
         selected: selected,
         active: active,
      })
      const content = response.data
      return content?.data
   }

   public static async setUsersAdmin(selected: string[], admin: boolean) {
      const response = await webClient.post(`user/set-admin`, {
         selected: selected,
         admin: admin,
      })
      const content = response.data
      return content?.data
   }

   public static async setUsersActive(selected: string[], active: boolean) {
      return await this.setActiveModelData('user', selected, active)
   }

   public static async setBlogsActive(selected: string[], active: boolean) {
      return await this.setActiveModelData('blog', selected, active)
   }

   public static async setDepartmentsActive(
      selected: string[],
      active: boolean
   ) {
      return await this.setActiveModelData('department', selected, active)
   }

   public static async setActivitiesActive(
      selected: string[],
      active: boolean
   ) {
      return await this.setActiveModelData('activity', selected, active)
   }

   private static async deleteModelData(model: string, selected: string[]) {
      const response = await webClient.post(`${model}/delete-multiple`, {
         data: selected,
      })
      const content = response.data

      return content?.data
   }

   public static async listUsers() {
      return await this.listModelData('user')
   }

   public static async listBlogs() {
      return await this.listModelData('blog')
   }

   public static async listDepartments() {
      return await this.listModelData('department')
   }

   public static async listActivities() {
      return await this.listModelData('activity')
   }

   public static async listImages() {
      return await this.listModelData('image')
   }

   public static async deleteUsers(selected: string[]) {
      return await this.deleteModelData('user', selected)
   }

   public static async deleteBlogs(selected: string[]) {
      return await this.deleteModelData('blog', selected)
   }

   public static async deleteDepartments(selected: string[]) {
      return await this.deleteModelData('department', selected)
   }

   public static async deleteActivities(selected: string[]) {
      return await this.deleteModelData('activity', selected)
   }

   public static async deleteImages(selected: string[]) {
      return await this.deleteModelData('image', selected)
   }

   private static async addModelData(model: string, data: any) {
      const response = await webClient.post(`${model}`, data, {
         headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
         },
      })
      const content = await response.data
      return content?.data
   }

   public static async addBlog(data: any) {
      return await this.addModelData('blog', data)
   }

   public static async addUser(data: any) {
      return await this.addModelData('user', data)
   }

   public static async addImage(data: any) {
      const response = await webClient.post('image', data, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      const content = await response.data
      return content?.data
   }

   public static async addActivity(data: any) {
      return await this.addModelData('activity', data)
   }

   public static async addDepartment(data: any) {
      return await this.addModelData('department', data)
   }

   private static async updateModelData(model: string, data: any) {
      const response = await webClient.patch(`${model}`, data, {
         headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
         },
      })
      const content = await response.data
      return content?.data
   }

   public static async updateBlog(id: string, data: any) {
      return await this.updateModelData('blog', { ...data, _id: id })
   }

   public static async updateActivity(id: string, data: any) {
      return await this.updateModelData('activity', { ...data, _id: id })
   }

   public static async updateDepartment(id: string, data: any) {
      return await this.updateModelData('department', { ...data, _id: id })
   }

   public static async updateUser(id: string, data: any) {
      return await this.updateModelData('user', { ...data, _id: id })
   }

   public static async updateHomePage(data: any) {
      return await this.updateModelData('home-page', data)
   }
}
