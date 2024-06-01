import { NotificationType, Notify } from '@/admin/components/Notification'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { User } from '@/admin/models/user.model'
import {
   Avatar,
   Box,
   Button,
   Container,
   Flex,
   Group,
   Modal,
   MultiSelect,
   PasswordInput,
   Select,
   SelectItemProps,
   Stack,
   Switch,
   Text,
   TextInput,
   Textarea,
} from '@mantine/core'
import { forwardRef, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IconAt } from '@tabler/icons-react'

type UserFormProps = {
   opened: boolean
   handleOnClose: () => void
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
   firstName: string
   lastName: string
   email: string
   admin: boolean
   active: boolean
   password: string
}

export default function UserForm(props: UserFormProps) {
   const { opened, handleOnClose } = props
   const { loading } = useAdminDataContext()

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<FormValues>({
      defaultValues: {
         firstName: '',
         lastName: '',
         email: '',
         admin: true,
         active: true,
      },
   })

   const { userList, setUserList, setLoading } = useAdminDataContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (!data.email || !data.firstName || !data.lastName) {
         Notify({
            title: 'Form fields missing',
            message: 'Please fill all the required fields',
            type: NotificationType.ERROR,
         })
         return
      }
      setLoading(true)

      const newUser = await AdminNetworkingManager.addUser(data)
      if (!newUser || !newUser?._id) {
         handleOnClose()
         Notify({
            title: 'User not added',
            message: 'User has not been added',
            type: NotificationType.ERROR,
         })
         reset()

         setLoading(false)
         return
      }
      setUserList([newUser, ...userList])
      handleOnClose()
      reset()
      setLoading(false)

      Notify({
         title: 'User Added',
         message: 'User has been added successfully',
         type: NotificationType.SUCCESS,
      })
   }

   const emailValidation = (value: string) => {
      // prettier-ignore
      var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!value.match(mailformat)) {
         return 'Please enter a valid email address'
      }
   }

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
                           {...register('firstName', {
                              required: 'First name is required!',
                           })}
                           withAsterisk
                           label="First Name"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />

                        <TextInput
                           {...register('lastName', {
                              required: 'Last name is required!',
                           })}
                           withAsterisk
                           label="Last Name"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />
                     </Flex>
                  </Stack>

                  <Stack>
                     <Flex wrap="nowrap" justify="space-between" mt="lg">
                        <TextInput
                           {...register('email', {
                              required: 'Email is required!',
                              validate: emailValidation,
                           })}
                           type="email"
                           name="email"
                           icon={<IconAt />}
                           withAsterisk
                           label="Email"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />

                        <PasswordInput
                           {...register('password', {
                              required: 'Password is required!',
                           })}
                           withAsterisk
                           label="New Password"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />
                     </Flex>
                  </Stack>

                  <Stack>
                     <Flex justify={'space-evenly'} wrap="nowrap" mt="lg">
                        <Switch
                           defaultChecked={true}
                           {...register('admin')}
                           label="Admin"
                        />

                        <Switch
                           defaultChecked={true}
                           {...register('active')}
                           label="Active"
                        />
                     </Flex>
                  </Stack>

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
