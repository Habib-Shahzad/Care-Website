// import { NETWORKING_API as API } from '@/application/networking'

const API = 'http://localhost:3000/api'
import axios from 'axios'
axios.defaults.withCredentials = true

export class AdminNetworkingManeger {
   public static async loggedInUser() {
      const response = await axios.get(`${API}/user/loggedIn`)
      const content = response.data
      return content ?? null
   }

   public static async loginUser(email: string, password: string) {
      const response = await axios.post(`${API}/user/admin-login`, {
         email: email,
         password: password,
      })
      return response.data
   }

   public static async logoutUser() {
      await axios.post(`${API}/user/logout-admin`)
   }

   public static async listModelData(model: string) {
      const response = await axios.get(`${API}/${model}/table-data`)
      const content = response.data
      return content?.data
   }

   public static async setActiveModelData(
      model: string,
      selected: string[],
      active: boolean
   ) {
      const response = await axios.post(`${API}/${model}/set-active`, {
         selected: selected,
         active: active,
      })
      const content = response.data
      return content?.data
   }

   public static async setUsersAdmin(selected: string[], admin: boolean) {
      const response = await axios.post(`${API}/user/set-admin`, {
         selected: selected,
         admin: admin,
      })
      const content = response.data
      return content?.data
   }

   public static async setUsersActive(selected: string[], active: boolean) {
      return await this.setActiveModelData('user', selected, active)
   }

   private static async deleteModelData(model: string, selected: string[]) {
      const response = await axios.post(`${API}/${model}/table-data`, {
         selected: selected,
      })
      const content = response.data
      return content?.data
   }

   public static async listUsers() {
      return await this.listModelData('user')
   }

   public static async deleteUsers(selected: string[]) {
      return await this.deleteModelData('user', selected)
   }
}
