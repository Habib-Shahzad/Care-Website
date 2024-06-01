import { NotificationType, Notify } from '@/admin/components/Notification'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import Activity from '@/application/models/Activity.model'
import {
   Avatar,
   Box,
   Button,
   Container,
   Flex,
   Group,
   Modal,
   MultiSelect,
   Select,
   SelectItemProps,
   Stack,
   Switch,
   Text,
   TextInput,
   Textarea,
} from '@mantine/core'
import { DateTimePicker, DateValue } from '@mantine/dates'
import { forwardRef, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type ActivityFormProps = {
   opened: boolean
   handleOnClose: () => void

   editActivity?: Activity
   setEditActivitiy: React.Dispatch<React.SetStateAction<Activity | undefined>>
}

interface ItemProps extends SelectItemProps {
   name: string
   image: string
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
   ({ label, value, image, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
         <Group noWrap>
            <Avatar src={image} />

            <div>
               <Text>{label}</Text>
            </div>
         </Group>
      </div>
   )
)

type FormValues = {
   title: string
   content: string
   imageList: string[]
   activityDate: DateValue
   active: boolean
}

export default function ActivityForm(props: ActivityFormProps) {
   const { opened, handleOnClose, editActivity, setEditActivitiy } = props
   const { imageList, setImageList, loading } = useAdminDataContext()

   async function listImages() {
      try {
         const images = await AdminNetworkingManager.listImages()
         setImageList(images)
      } catch (error) {
         console.log(error)
         setImageList([])
      }
   }

   useEffect(() => {
      if (!!imageList && imageList.length > 0) return
      ;(async () => {
         await listImages()
      })()
   }, [])

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm<FormValues>({
      defaultValues: {
         title: editActivity?.title ?? '',
         content: editActivity?.content ?? '',
         activityDate: editActivity
            ? new Date(editActivity?.activityDate)
            : new Date(),
         imageList: editActivity?.imageList?.map((image) => image?._id) ?? [],
         active: editActivity?.active ?? true,
      },
   })

   const { activityList, setActivityList, setLoading } = useAdminDataContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (data.imageList.length === 0) {
         Notify({
            title: 'No Images Selected',
            message: 'Please select at least one image',
            type: NotificationType.ERROR,
         })

         return
      }

      setLoading(true)

      if (!editActivity) {
         const newActivity = await AdminNetworkingManager.addActivity(data)
         setActivityList([newActivity, ...activityList])
         handleOnClose()
         reset()
         setLoading(false)

         Notify({
            title: 'Activity Added',
            message: 'Activity has been added successfully',
            type: NotificationType.SUCCESS,
         })
      } else {
         const updatedActivity = await AdminNetworkingManager.updateActivity(
            editActivity?._id,
            data
         )
         setActivityList(
            activityList.map((activity) =>
               activity._id === updatedActivity._id ? updatedActivity : activity
            )
         )
         handleOnClose()
         setEditActivitiy(undefined)
         setLoading(false)
         reset()

         Notify({
            title: 'Activity Updated',
            message: 'Activity has been updated successfully',
            type: NotificationType.SUCCESS,
         })
      }

      setLoading(false)
   }

   useEffect(() => {
      if (!editActivity) return
      setValue('title', editActivity?.title ?? '')
      setValue('content', editActivity?.content ?? '')
      setValue(
         'imageList',
         editActivity?.imageList?.map((image) => image?._id) ?? []
      )
      setValue('active', editActivity?.active ?? true)
   }, [editActivity])

   return (
      <Modal
         size="xl"
         opened={opened}
         withCloseButton={false}
         onClose={() => {
            reset()
            handleOnClose()
         }}
         centered
      >
         <Modal.Body className="px-7">
            <Box>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack>
                     <Flex wrap="nowrap" justify="space-between" mt="lg">
                        <TextInput
                           {...register('title', {
                              required: 'Title is required!',
                           })}
                           defaultValue={editActivity?.title ?? ''}
                           withAsterisk
                           label="Activity Title"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />

                        <DateTimePicker
                           defaultValue={
                              editActivity
                                 ? new Date(editActivity?.activityDate)
                                 : new Date()
                           }
                           onChange={(date) => {
                              setValue('activityDate', date)
                           }}
                           label="Pick date and time"
                           placeholder="Activity Date"
                           maw={400}
                           mx="auto"
                        />
                     </Flex>
                  </Stack>

                  <Container mt={30} mb={20} fluid>
                     <Textarea
                        defaultValue={editActivity?.content ?? ''}
                        {...register('content', {
                           required: 'Content is required!',
                        })}
                        label="Activity Content"
                        placeholder="Enter activity content here"
                        minRows={8}
                     />
                  </Container>

                  <Flex
                     align={{ xs: 'flex-start', md: 'center' }}
                     justify="space-evenly"
                     mt="lg"
                  >
                     <Switch
                        defaultChecked={editActivity?.active ?? true}
                        {...register('active')}
                        label="Active"
                     />

                     <MultiSelect
                        sx={{ width: '20rem', zIndex: 10 }}
                        label="Choose Images"
                        placeholder="Pick images"
                        itemComponent={AutoCompleteItem}
                        data={imageList.map((image) => ({
                           value: image._id,
                           label: image.name,
                           image: image?.url,
                        }))}
                        defaultValue={editActivity?.imageList?.map(
                           (image) => image?._id
                        )}
                        searchable
                        nothingFound="No Images Found"
                        maxDropdownHeight={400}
                        onChange={(value) => {
                           setValue('imageList', value)
                        }}
                        filter={(value, selected, item) => {
                           if (!item.label) return true
                           return (
                              !selected &&
                              item?.label
                                 ?.toLowerCase()
                                 .includes(value?.toLowerCase()?.trim())
                           )
                        }}
                     />
                  </Flex>

                  <Group mt="xl" position="right">
                     <Button
                        variant="subtle"
                        color="red"
                        ml="md"
                        onClick={handleOnClose}
                        disabled={loading}
                        loading={loading}
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        className="bg-blue-500"
                        disabled={loading}
                        loading={loading}
                     >
                        Submit
                     </Button>
                  </Group>
               </form>
            </Box>
         </Modal.Body>
      </Modal>
   )
}
