import { NotificationType, Notify } from '@/admin/components/Notification'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import Image from '@/application/models/Image.model'
import { API, NETWORKING_API } from '@/application/networking'
import {
   Avatar,
   Box,
   Button,
   Container,
   Flex,
   Group,
   Loader,
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
import { forwardRef, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type HomePageFormProps = {
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
   mainContent: string | null
   mainImage: string | null
   ambassadorImage: string | null
}

type HomePageData = {
   _id: string | null
   mainContent: string | null
   mainImage: Image | null
   ambassadorImage: Image | null
}

export default function HomePageForm(props: HomePageFormProps) {
   const { homePageData, setHomePageData } = useAdminDataContext()

   async function loadData() {
      const response = await AdminNetworkingManager.getHomePageData()
      if (response) setHomePageData(response)
      else
         setHomePageData({
            _id: null,
            mainContent: '',
            mainImage: null,
            ambassadorImage: null,
         })
   }

   useEffect(() => {
      if (!!homePageData) return
      setLoading(true)
      ;(async () => {
         await loadData()
      })()

      setLoading(false)
   }, [])

   const { opened, handleOnClose } = props
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
      control,
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm<FormValues>()

   const { setActiveTab } = useAdminContext()
   const { setLoading } = useAdminDataContext()

   const onSubmit = async (data: any) => {
      setLoading(true)

      const _data = JSON.stringify({
         ...data,
         _id: homePageData?._id,
      })
      await AdminNetworkingManager.updateHomePage(_data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Notify({
         title: 'Success',
         message: 'Home Page updated successfully',
         type: NotificationType.SUCCESS,
      })

      setHomePageData(null)

      setLoading(false)
      setActiveTab('User')
   }

   useEffect(() => {
      if (!homePageData) return

      setValue('mainContent', homePageData?.mainContent)
      setValue('mainImage', homePageData?.mainImage?._id ?? '')
      setValue('ambassadorImage', homePageData?.ambassadorImage?._id ?? '')
   }, [homePageData, setValue])

   return (
      <Modal
         size="xl"
         opened={true}
         withCloseButton={false}
         onClose={() => {
            handleOnClose()
         }}
         centered
      >
         <Modal.Body className="px-7">
            {!!homePageData ? (
               <Box>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <Container mt={30} mb={20} fluid>
                        <Textarea
                           {...register('mainContent', {
                              required: 'Content is required!',
                           })}
                           label="Blog Content"
                           placeholder="Enter blog content here"
                           minRows={8}
                        />
                     </Container>

                     <Flex
                        align={{ xs: 'flex-start', md: 'center' }}
                        justify="space-evenly"
                        mt="lg"
                     >
                        <Select
                           defaultValue={homePageData?.mainImage?._id}
                           onChange={(value) => {
                              setValue('mainImage', value)
                           }}
                           searchable
                           dropdownPosition="top"
                           ml={20}
                           sx={{ width: '15rem', zIndex: 10 }}
                           label="Choose image"
                           placeholder="Pick one"
                           itemComponent={AutoCompleteItem}
                           data={imageList.map((image) => ({
                              value: image._id,
                              label: image.name,
                              image: `${API}/${image.image.filePath}`,
                           }))}
                           filter={(value, item) => {
                              if (!item) return true
                              if (!item.label) return true
                              return item?.label
                                 ?.toLowerCase()
                                 .includes(value?.toLowerCase()?.trim())
                           }}
                        />

                        <Select
                           defaultValue={homePageData?.ambassadorImage?._id}
                           onChange={(value) => {
                              setValue('ambassadorImage', value)
                           }}
                           searchable
                           dropdownPosition="top"
                           ml={20}
                           sx={{ width: '15rem', zIndex: 10 }}
                           label="Choose Ambassador image"
                           placeholder="Pick one"
                           itemComponent={AutoCompleteItem}
                           data={imageList.map((image) => ({
                              value: image._id,
                              label: image.name,
                              image: `${API}/${image.image.filePath}`,
                           }))}
                           filter={(value, item) => {
                              if (!item) return true
                              if (!item.label) return true
                              return item?.label
                                 ?.toLowerCase()
                                 .includes(value?.toLowerCase()?.trim())
                           }}
                        />
                     </Flex>

                     <Group mt="xl" position="right">
                        <Button
                           variant="subtle"
                           color="red"
                           ml="md"
                           onClick={() => {
                              setActiveTab('User')
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
            ) : (
               <Loader />
            )}
         </Modal.Body>
      </Modal>
   )
}
