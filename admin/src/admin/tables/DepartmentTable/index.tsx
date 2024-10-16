import React, { useState, useEffect, useMemo } from 'react'
import PaginatedTable, {
   PaginatedTableProps,
} from '@/admin/components/PaginatedTable'
import TableSkeleton from '@/admin/components/TableSkeleton'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { Box, Button, Checkbox, Flex } from '@mantine/core'
import {
   IconEdit,
   IconSquareCheck,
   IconSquareRoundedX,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ConfirmationDialog from '@/admin/components/Dialog'

import Department from '@/application/models/Department.model'
import DepartmentForm from '@/admin/forms/DepartmentForm'

export default function DepartmentTable() {
   const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(
      []
   )
   const onRowClick = (department: any) => {}

   const { departmentList, setDepartmentList, loading, setLoading } =
      useAdminDataContext()

   async function listDepartments() {
      setLoading(true)
      try {
         const departments = await AdminNetworkingManager.listDepartments()
         setDepartmentList(departments)
      } catch (error) {
         console.log(error)
         setDepartmentList([])
      }
      setLoading(false)
   }

   useEffect(() => {
      if (!!departmentList && departmentList.length > 0) return
      ;(async () => {
         await listDepartments()
      })()
   }, [])

   const handleCheckboxChange = (department: any) => {
      if (selectedDepartments.includes(department)) {
         setSelectedDepartments(
            selectedDepartments.filter(
               (selecteddepartment) => selecteddepartment !== department
            )
         )
      } else {
         setSelectedDepartments([...selectedDepartments, department])
      }
   }

   const handleDeleteSelected = async () => {
      if (selectedDepartments.length === 0) return
      setLoading(true)
      try {
         await AdminNetworkingManager.deleteDepartments(
            selectedDepartments?.map((department) => department._id)
         )
         const updatedDepartmentList = departmentList.filter(
            (department) => !selectedDepartments.includes(department)
         )
         setSelectedDepartments([])
         setDepartmentList(updatedDepartmentList)
         setLoading(false)
         closeDelete()
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   const handleActivation = async (active: boolean) => {
      if (selectedDepartments.length === 0) return
      setLoading(true)
      const response = await AdminNetworkingManager.setDepartmentsActive(
         selectedDepartments?.map((department) => department._id),
         active
      )
      setSelectedDepartments([])
      setDepartmentList(response)
      setLoading(false)
   }

   const handleSelectAll = () => {
      if (selectedDepartments.length === departmentList.length) {
         setSelectedDepartments([])
      } else {
         setSelectedDepartments([...departmentList])
      }
   }

   const departmentTableProps = useMemo<PaginatedTableProps<any>>(
      () => ({
         columns: [
            <Checkbox
               onChange={handleSelectAll}
               checked={selectedDepartments.length === departmentList.length}
               label=""
            />,
            'Title',
            'Number of Members',
            'Active',
            'Actions',
         ],
         items: departmentList,
         render: (department: Department) => {
            return (
               <tr className="pointer">
                  <td>
                     <Checkbox
                        onChange={() => handleCheckboxChange(department)}
                        color="blue"
                        checked={selectedDepartments.includes(department)}
                        label=""
                     />
                  </td>
                  <td>{department.name}</td>
                  <td>{department.members?.length ?? 0}</td>

                  <td>
                     {department.active ? (
                        <IconSquareCheck color="green" size={24} />
                     ) : (
                        <IconSquareRoundedX color="red" size={24} />
                     )}
                  </td>
                  <td>
                     <Button
                        leftIcon={<IconEdit />}
                        color="blue"
                        variant="white"
                        onClick={() => {
                           setEditDepartment(department)
                           open()
                        }}
                     >
                        Edit
                     </Button>
                  </td>
               </tr>
            )
         },
      }),
      [departmentList, selectedDepartments, onRowClick]
   )

   const [confirmDelete, { toggle: toggleDelete, close: closeDelete }] =
      useDisclosure(false)

   const [editDepartment, setEditDepartment] = useState<Department | undefined>(
      undefined
   )
   const [opendepartmentForm, { open, close }] = useDisclosure(false)

   return (
      <div>
         <ConfirmationDialog
            text={`Are you sure you want to delete ${selectedDepartments.length} department(s)?`}
            opened={confirmDelete}
            close={closeDelete}
            onConfirm={handleDeleteSelected}
         />

         <Box>
            {selectedDepartments.length > 0 && !loading && (
               <>
                  <span>{`${selectedDepartments.length} activity(s) selected`}</span>
                  <Flex
                     mt={20}
                     mih={20}
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
                        onClick={() => {
                           handleActivation(false)
                        }}
                     >
                        Set Inactive
                     </Button>
                  </Flex>
               </>
            )}
            <DepartmentForm
               setEditDepartment={setEditDepartment}
               editDepartment={editDepartment}
               opened={opendepartmentForm}
               handleOnClose={close}
            />
            {selectedDepartments.length == 0 && (
               <Button
                  color="green"
                  onClick={() => {
                     setEditDepartment(undefined)
                     open()
                  }}
               >
                  Add new
               </Button>
            )}
         </Box>

         {loading && <TableSkeleton />}
         {!loading && <PaginatedTable searchField {...departmentTableProps} />}
      </div>
   )
}
