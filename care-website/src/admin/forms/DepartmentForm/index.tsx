import { NotificationType, Notify } from '@/admin/components/Notification'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import Department, { _Member } from '@/application/models/Department.model'
import {
   Avatar,
   Box,
   Button,
   Center,
   Container,
   Divider,
   Flex,
   Group,
   Modal,
   Select,
   SelectItemProps,
   Switch,
   Text,
   TextInput,
} from '@mantine/core'
import { IconMinus, IconPlus, IconTrashFilled } from '@tabler/icons-react'
import { forwardRef, useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

type ActivityFormProps = {
   opened: boolean
   handleOnClose: () => void

   editDepartment?: Department
   setEditDepartment: React.Dispatch<
      React.SetStateAction<Department | undefined>
   >
}

interface ItemProps extends SelectItemProps {
   label: string
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
   name: string
   content: string
   active: boolean
   members: any[]
}

export default function DepartmentForm(props: ActivityFormProps) {
   const { opened, handleOnClose, editDepartment, setEditDepartment } = props
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

   const edittedMembers = editDepartment?.members.map((member) => ({
      ...member,
      image: member.image._id,
   }))

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      control,
   } = useForm<FormValues>({
      defaultValues: {
         members: edittedMembers,
      },
   })

   const {
      fields: memberFields,
      append: membersAppend,
      remove: membersRemove,
   } = useFieldArray({
      control,
      name: 'members',
   })

   const addMembersRow = () => {
      membersAppend({
         name: '',
         role: '',
         image: '',
      })
   }
   const { departmentList, setDepartmentList, setLoading } =
      useAdminDataContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (data.members.length === 0) {
         Notify({
            title: 'Members are required!',
            message: 'Please add at least one member',
            type: NotificationType.ERROR,
         })
         return
      }

      setLoading(true)

      if (!editDepartment) {
         const newDepartment = await AdminNetworkingManager.addDepartment(data)
         setDepartmentList([newDepartment, ...departmentList])
         handleOnClose()
         reset()
         setLoading(false)
         Notify({
            title: 'Department added!',
            message: 'Department has been added successfully',
            type: NotificationType.SUCCESS,
         })
      } else {
         const updatedActivity = await AdminNetworkingManager.updateDepartment(
            editDepartment?._id,
            data
         )
         setDepartmentList(
            departmentList.map((activity) =>
               activity._id === updatedActivity._id ? updatedActivity : activity
            )
         )
         handleOnClose()
         setEditDepartment(undefined)
         setLoading(false)
         reset()

         Notify({
            title: 'Department updated!',
            message: 'Department has been updated successfully',
            type: NotificationType.SUCCESS,
         })
      }

      setLoading(false)
   }

   useEffect(() => {
      // if (!editDepartment) return
      // const fixedMembers = editDepartment?.members.map((member) => ({
      //    ...member,
      //    image: member.image,
      // }))
      setValue('name', editDepartment?.name ?? '')
      setValue('members', editDepartment?.members ?? [])
      setValue('active', editDepartment?.active ?? true)
   }, [editDepartment])

   return (
      <Modal
         size="lg"
         opened={opened}
         withCloseButton={false}
         onClose={() => {
            reset()
            handleOnClose()
         }}
         centered
      >
         <Modal.Body className="px-4">
            <Box>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Container fluid>
                     <TextInput
                        {...register('name', {
                           required: 'Title is required!',
                        })}
                        defaultValue={editDepartment?.name ?? ''}
                        withAsterisk
                        label="Department Name"
                        sx={{ width: '20rem', zIndex: 10 }}
                     />

                     <Switch
                        mt={'lg'}
                        defaultChecked={editDepartment?.active ?? true}
                        {...register('active')}
                        label="Active"
                     />
                  </Container>

                  <Container mt={'lg'}>
                     <Flex
                        sx={{
                           justifyContent: 'space-evenly',
                        }}
                     >
                        <IconPlus
                           style={{
                              cursor: 'pointer',
                           }}
                           onClick={addMembersRow}
                           stroke={5}
                        />
                        <IconMinus
                           onClick={() => {
                              membersRemove(-1)
                           }}
                           style={{
                              cursor: 'pointer',
                           }}
                           stroke={5}
                        />
                     </Flex>
                  </Container>

                  <Divider mt={30} />

                  <Container>
                     {memberFields.map((field, index) => {
                        console.log(field)

                        return (
                           <div key={field.id}>
                              <Flex
                                 sx={{
                                    justifyContent: 'space-around',
                                 }}
                              >
                                 <TextInput
                                    {...register(`members.${index}.name`, {
                                       required: 'Name is required!',
                                    })}
                                    withAsterisk
                                    label="Member Name"
                                    sx={{ width: '15rem', zIndex: 10 }}
                                 />

                                 <Select
                                    searchable
                                    dropdownPosition="top"
                                    onChange={(value) => {
                                       setValue(`members.${index}.image`, value)
                                    }}
                                    defaultValue={field.image}
                                    ml={20}
                                    sx={{ width: '15rem', zIndex: 10 }}
                                    label="Choose image"
                                    placeholder="Pick one"
                                    itemComponent={AutoCompleteItem}
                                    data={imageList.map((image) => ({
                                       value: image._id,
                                       label: image.name,
                                       image: `${image.image.filePath}`,
                                    }))}
                                    filter={(value, item) => {
                                       if (!item) return true
                                       if (!item.label) return true
                                       return item?.label
                                          ?.toLowerCase()
                                          .includes(
                                             value?.toLowerCase()?.trim()
                                          )
                                    }}
                                 />

                                 <Center ml={20} mt={20}>
                                    <IconTrashFilled
                                       color="red"
                                       onClick={() => {
                                          console.log(index)
                                          membersRemove(index)
                                       }}
                                       style={{
                                          cursor: 'pointer',
                                       }}
                                       stroke={5}
                                    />
                                 </Center>
                              </Flex>
                              <TextInput
                                 {...register(`members.${index}.role`, {
                                    required: 'Role is required!',
                                 })}
                                 defaultValue={field.role}
                                 withAsterisk
                                 label="Member Role"
                                 sx={{ width: '15rem', zIndex: 10 }}
                              />
                              <Divider mt={20} mb={15} />
                           </div>
                        )
                     })}
                  </Container>

                  <Group mt="xl" position="right">
                     <Button
                        variant="subtle"
                        color="red"
                        ml="md"
                        onClick={() => {
                           reset()
                           setEditDepartment(undefined)
                           handleOnClose()
                        }}
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
