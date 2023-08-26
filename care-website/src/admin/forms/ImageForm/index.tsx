import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { BlogTypeToLabel } from '@/admin/tables/BlogsTable'
import Blog, { BlogType } from '@/application/models/Blog.model'
import Image from '@/application/models/Image.model'
import { API } from '@/application/networking'
import {
   Avatar,
   Box,
   Button,
   Container,
   Flex,
   Modal,
   SimpleGrid,
   Stack,
   TextInput,
   Image as MantineImage,
   FileInput,
} from '@mantine/core'
import { forwardRef, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Group, Text, useMantineTheme, rem } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import {
   Dropzone,
   DropzoneProps,
   FileWithPath,
   IMAGE_MIME_TYPE,
} from '@mantine/dropzone'
import { set } from 'date-fns'
import { NotificationType, Notify } from '@/admin/components/Notification'

type BlogFormProps = {
   opened: boolean
   handleOnClose: () => void

   editImage?: Image
   setEditImage: React.Dispatch<React.SetStateAction<Image | undefined>>
}

type FormValues = {
   name: string
   image: File
}

export default function ImageForm(props: BlogFormProps) {
   const { opened, handleOnClose, editImage, setEditImage } = props
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
         name: editImage?.name ?? '',
      },
   })

   const { setLoading } = useAdminDataContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      const { name, image } = data

      if (!name || !image) {
         Notify({
            title: 'Fill all the fields',
            message: 'Please fill all the fields',
            type: NotificationType.ERROR,
         })
         return
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify({ name }))
      formData.append('image', image)

      setLoading(true)

      if (!editImage) {
         try {
            const newImage = await AdminNetworkingManager.addImage(formData)
            setImageList([newImage, ...imageList])
            handleOnClose()
            reset()
            setLoading(false)
            Notify({
               title: 'Image Added',
               message: 'Image has been added successfully',
               type: NotificationType.SUCCESS,
            })
         } catch (error) {
            setLoading(false)
            handleOnClose()
            Notify({
               title: 'Error',
               message: 'Something went wrong',
               type: NotificationType.ERROR,
            })
         }
      } else {
      }
   }

   const theme = useMantineTheme()
   const [file, setFile] = useState<FileWithPath | undefined>(undefined)
   const imageURL = !!file ? URL.createObjectURL(file) : null
   const preview = !!imageURL ? (
      <MantineImage
         src={imageURL}
         imageProps={{ onLoad: () => URL.revokeObjectURL(imageURL) }}
      />
   ) : null

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
                     <TextInput
                        {...register('name', {
                           required: 'Title is required!',
                        })}
                        withAsterisk
                        label="Image Title"
                        sx={{ width: '20rem', zIndex: 10 }}
                     />

                     <FileInput
                        onChange={(uploaded) => {
                           if (uploaded) {
                              setFile(uploaded)
                              setValue('image', uploaded)
                           }
                        }}
                        label="Upload file"
                        placeholder="Upload file"
                        accept="image/png,image/jpeg"
                     />

                     <SimpleGrid
                        cols={4}
                        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                        mt={0}
                     >
                        {preview}
                     </SimpleGrid>
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
