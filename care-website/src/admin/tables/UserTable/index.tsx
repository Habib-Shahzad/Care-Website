import React, { useState, useEffect, useMemo } from 'react'
import PaginatedTable, {
   PaginatedTableProps,
} from '@/admin/components/PaginatedTable'
import TableSkeleton from '@/admin/components/TableSkeleton'
import { User } from '@/admin/models/user.model'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { Box, Button, Checkbox, Flex } from '@mantine/core'
import {
   IconLock,
   IconSquareCheck,
   IconSquareRoundedX,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ConfirmationDialog from '@/admin/components/Dialog'

export default function UserTable() {
   const [selectedUsers, setSelectedUsers] = useState<User[]>([])
   const onRowClick = (user: User) => {}

   const { userList, setUserList, loading, setLoading } = useAdminDataContext()

   async function listUsers() {
      setLoading(true)
      try {
         const users = await AdminNetworkingManager.listUsers()
         setUserList(users)
      } catch (error) {
         console.log(error)
         setUserList([])
      }
      setLoading(false)
   }

   useEffect(() => {
      if (!!userList && userList.length > 0) return
      ;(async () => {
         await listUsers()
      })()
   }, [])

   const handleCheckboxChange = (user: User) => {
      if (selectedUsers.includes(user)) {
         setSelectedUsers(
            selectedUsers.filter((selectedUser) => selectedUser !== user)
         )
      } else {
         setSelectedUsers([...selectedUsers, user])
      }
   }

   const handleDeleteSelected = async () => {
      setLoading(true)
      const response = await AdminNetworkingManager.deleteUsers(
         selectedUsers?.map((user) => user._id)
      )
      setUserList(response)
      setSelectedUsers([])
      setLoading(false)
   }

   const handleActivation = async (active: boolean) => {
      setLoading(true)
      const response = await AdminNetworkingManager.setUsersActive(
         selectedUsers?.map((user) => user._id),
         active
      )
      setUserList(response)
      setSelectedUsers([])
      setLoading(false)
   }

   const handleAdmin = async (admin: boolean) => {
      setLoading(true)
      const response = await AdminNetworkingManager.setUsersAdmin(
         selectedUsers?.map((user) => user._id),
         admin
      )
      setUserList(response)
      setSelectedUsers([])
      setLoading(false)
   }

   const handleSelectAll = () => {
      if (selectedUsers.length === userList.length) {
         setSelectedUsers([])
      } else {
         setSelectedUsers([...userList])
      }
   }

   const userTableProps = useMemo<PaginatedTableProps<User>>(
      () => ({
         columns: [
            <Checkbox
               onChange={handleSelectAll}
               checked={selectedUsers.length === userList.length}
               label=""
            />,
            'First Name',
            'Last Name',
            'Email',
            'Admin',
            'Active',
            'Actions',
         ],
         items: userList,
         render: (user: User) => {
            return (
               <tr className="pointer">
                  <td>
                     <Checkbox
                        onChange={() => handleCheckboxChange(user)}
                        color="blue"
                        checked={selectedUsers.includes(user)}
                        label=""
                     />
                  </td>
                  <td onClick={() => onRowClick(user)}>{user.firstName}</td>
                  <td onClick={() => onRowClick(user)}>{user.lastName}</td>
                  <td onClick={() => onRowClick(user)}>{user.email}</td>
                  <td onClick={() => onRowClick(user)}>
                     {user.admin ? (
                        <IconSquareCheck color="green" size={24} />
                     ) : (
                        <IconSquareRoundedX color="red" size={24} />
                     )}
                  </td>
                  <td onClick={() => onRowClick(user)}>
                     {user.active ? (
                        <IconSquareCheck color="green" size={24} />
                     ) : (
                        <IconSquareRoundedX color="red" size={24} />
                     )}
                  </td>
                  <td>
                     <Button
                        leftIcon={<IconLock />}
                        disabled
                        color="blue"
                        variant="white"
                        onClick={() => {}}
                     >
                        Edit
                     </Button>
                  </td>
               </tr>
            )
         },
      }),
      [userList, selectedUsers, onRowClick]
   )

   const [confirmDelete, { toggle: toggleDelete, close: closeDelete }] =
      useDisclosure(false)

   return (
      <div>
         <ConfirmationDialog
            text={`Are you sure you want to delete ${selectedUsers.length} user(s)?`}
            opened={confirmDelete}
            close={closeDelete}
            onConfirm={handleDeleteSelected}
         />

         <Box mb={30}>
            {selectedUsers.length > 0 && (
               <>
                  <span>{`${selectedUsers.length} user(s) selected`}</span>
                  <Flex
                     mih={50}
                     gap="md"
                     justify="flex-start"
                     align="flex-start"
                     direction="row"
                     wrap="wrap"
                  >
                     <Button color="red" onClick={toggleDelete}>
                        Delete Selected
                     </Button>

                     <Button
                        color="blue"
                        onClick={() => {
                           handleActivation(true)
                        }}
                     >
                        Set Active
                     </Button>

                     <Button
                        color="blue"
                        variant="white"
                        onClick={() => {
                           handleActivation(false)
                        }}
                     >
                        Set Inactive
                     </Button>

                     <Button
                        color="blue"
                        onClick={() => {
                           handleAdmin(true)
                        }}
                     >
                        Set Admin
                     </Button>

                     <Button
                        color="blue"
                        variant="white"
                        onClick={() => {
                           handleAdmin(false)
                        }}
                     >
                        Remove Admin
                     </Button>
                  </Flex>
               </>
            )}
         </Box>

         {loading && <TableSkeleton />}
         {!loading && <PaginatedTable {...userTableProps} />}
      </div>
   )
}
