import { User } from '@/admin/models/user.model'
import { NETWORKING_API } from '@/application/networking'
import axios from 'axios'
axios.defaults.withCredentials = true

const createTableData = (data: User) => {
   const { _id, firstName, lastName, email, active, admin } = data
   return { _id, firstName, lastName, email, active, admin }
}

type ActionObject = {
   type: string
   value: string
   label: string
}

const startAction = async (
   obj: ActionObject,
   selected: string[],
   setTableRows: (rows: User[]) => void
) => {
   let data

   if (obj.type == 'admin') {
      data = {
         admin: obj.value,
         selected,
      }
   } else if (obj.type == 'active') {
      data = {
         active: obj.value,
         selected,
      }
   }

   if (!data) return
   const response = await axios.post(
      `${NETWORKING_API}/user/set-${obj.type}`,
      data
   )
   const content = response?.data?.data
   setTableRows(content)
}

export const UserDB = {
   apiTable: `${NETWORKING_API}/user/table-data`,
   deleteApi: `${NETWORKING_API}/user/delete`,
   createTableData: createTableData,
   headCells: [
      { id: 'firstName', label: 'First Name' },
      { id: 'lastName', label: 'Last Name' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Active' },
      { id: 'admin', label: 'Admin' },
   ],
   checkboxSelection: '_id',

   editAllowed: false,
   deleteAllowed: true,
   addAllowed: true,
   modelName: 'User',
   ordering: 'firstName',
   searchField: 'firstName',
   startAction: startAction,
   actionOptions: [
      { label: '', value: '', type: '' },
      { label: 'Set active', value: true, type: 'active' },
      { label: 'Set in-active', value: false, type: 'active' },
      { label: 'Set admin', value: true, type: 'admin' },
      { label: 'Set non-admin', value: false, type: 'admin' },
   ],
}
