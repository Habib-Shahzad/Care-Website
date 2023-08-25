import React, { useState, useEffect, useMemo } from 'react'
import PaginatedTable, {
   PaginatedTableProps,
} from '@/admin/components/PaginatedTable'
import TableSkeleton from '@/admin/components/TableSkeleton'
import { AdminNetworkingManeger } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { Box, Button, Checkbox, Flex } from '@mantine/core'
import {
   IconEdit,
   IconSquareCheck,
   IconSquareRoundedX,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ConfirmationDialog from '@/admin/components/Dialog'

import Activity from '@/application/models/Activity.model'
import ActivityForm from '@/admin/forms/ActivityForm'

export const activityTypeToLabel: Record<string, string> = {
   PATIENT_WELFARE: 'Patient Welfare',
   COMMUNITY_OUTREACH: 'Community Outreach',
   RESEARCH_DEVELOPMENT: 'Research & Development',
}
import { format } from 'date-fns'

function formatDate(dateString: string) {
   const date = new Date(dateString)

   return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
   })
}

export default function ActivityTable() {
   const [selectedActivities, setSelectedActivites] = useState<Activity[]>([])
   const onRowClick = (activity: any) => {}

   const { activityList, setActivityList, loading, setLoading } =
      useAdminDataContext()

   async function listActivities() {
      setLoading(true)
      try {
         const activitys = await AdminNetworkingManeger.listActivities()
         setActivityList(activitys)
      } catch (error) {
         console.log(error)
         setActivityList([])
      }
      setLoading(false)
   }

   useEffect(() => {
      if (!!activityList && activityList.length > 0) return
      ;(async () => {
         await listActivities()
      })()
   }, [])

   const handleCheckboxChange = (activity: any) => {
      if (selectedActivities.includes(activity)) {
         setSelectedActivites(
            selectedActivities.filter(
               (selectedactivity) => selectedactivity !== activity
            )
         )
      } else {
         setSelectedActivites([...selectedActivities, activity])
      }
   }

   const handleDeleteSelected = async () => {
      console.log(selectedActivities)
      if (selectedActivities.length === 0) return
      setLoading(true)
      try {
         const response = await AdminNetworkingManeger.deleteActivities(
            selectedActivities?.map((activity) => activity._id)
         )
         setSelectedActivites([])
         setActivityList(response)
         setLoading(false)
         closeDelete()
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   const handleActivation = async (active: boolean) => {
      if (selectedActivities.length === 0) return
      setLoading(true)
      const response = await AdminNetworkingManeger.setActivitiesActive(
         selectedActivities?.map((activity) => activity._id),
         active
      )
      setSelectedActivites([])
      setActivityList(response)
      setLoading(false)
   }

   const handleSelectAll = () => {
      if (selectedActivities.length === activityList.length) {
         setSelectedActivites([])
      } else {
         setSelectedActivites([...activityList])
      }
   }

   const activityTableProps = useMemo<PaginatedTableProps<any>>(
      () => ({
         columns: [
            <Checkbox
               onChange={handleSelectAll}
               checked={selectedActivities.length === activityList.length}
               label=""
            />,
            'Title',
            'Date',
            'Content Length',
            'Active',
            'Actions',
         ],
         items: activityList,
         render: (activity: Activity) => {
            return (
               <tr className="pointer">
                  <td>
                     <Checkbox
                        onChange={() => handleCheckboxChange(activity)}
                        color="blue"
                        checked={selectedActivities.includes(activity)}
                        label=""
                     />
                  </td>
                  <td>{activity.title}</td>
                  <td>{formatDate(activity.activityDate)}</td>
                  <td>{activity?.content?.length}</td>

                  <td>
                     {activity.active ? (
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
                           setEditActivitiy(activity)
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
      [activityList, selectedActivities, onRowClick]
   )

   const [confirmDelete, { toggle: toggleDelete, close: closeDelete }] =
      useDisclosure(false)

   const [editActivity, setEditActivitiy] = useState<Activity | undefined>(
      undefined
   )
   const [openactivityForm, { open, close }] = useDisclosure(false)

   return (
      <div>
         <ConfirmationDialog
            text={`Are you sure you want to delete ${selectedActivities.length} activity(s)?`}
            opened={confirmDelete}
            close={closeDelete}
            onConfirm={handleDeleteSelected}
         />

         <Box mb={30}>
            {selectedActivities.length > 0 && (
               <>
                  <span>{`${selectedActivities.length} activity(s) selected`}</span>
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
                        onClick={() => {
                           handleActivation(false)
                        }}
                     >
                        Set Inactive
                     </Button>
                  </Flex>
               </>
            )}
            <ActivityForm
               setEditActivitiy={setEditActivitiy}
               editActivity={editActivity}
               opened={openactivityForm}
               handleOnClose={close}
            />
            {selectedActivities.length == 0 && (
               <Button
                  color="green"
                  onClick={() => {
                     open()
                     setEditActivitiy(undefined)
                  }}
               >
                  Add new
               </Button>
            )}
         </Box>

         {loading && <TableSkeleton />}
         {!loading && <PaginatedTable {...activityTableProps} />}
      </div>
   )
}
