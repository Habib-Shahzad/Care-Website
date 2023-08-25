import { AdminNetworkingManeger } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { BlogTypeToLabel } from '@/admin/tables/BlogsTable'
import Blog, { BlogType } from '@/application/models/Blog.model'
import { API } from '@/application/networking'
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
import { forwardRef, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type BlogFormProps = {
   opened: boolean
   handleOnClose: () => void

   editBlog?: Blog
   setEditBlog: React.Dispatch<React.SetStateAction<Blog | undefined>>
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
   type: string
   active: boolean
}

export default function BlogForm(props: BlogFormProps) {
   const { opened, handleOnClose, editBlog, setEditBlog } = props
   const { imageList, setImageList, loading } = useAdminDataContext()

   async function listImages() {
      try {
         const images = await AdminNetworkingManeger.listImages()
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
         title: editBlog?.title ?? '',
         content: editBlog?.content ?? '',
         imageList: editBlog?.imageList?.map((image) => image?._id) ?? [],
         active: editBlog?.active ?? true,
      },
   })

   const { blogList, setBlogList, setLoading } = useAdminDataContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      if (data.imageList.length === 0) return
      setLoading(true)

      if (!editBlog) {
         const newBlog = await AdminNetworkingManeger.addBlog(data)
         setBlogList([newBlog, ...blogList])
         handleOnClose()
         reset()
         setLoading(false)
      } else {
         const updatedBlog = await AdminNetworkingManeger.updateBlog(
            editBlog._id,
            data
         )
         setBlogList(
            blogList.map((blog) =>
               blog._id === updatedBlog._id ? updatedBlog : blog
            )
         )
         handleOnClose()
         setEditBlog(undefined)
         setLoading(false)
         reset()
      }
   }

   useEffect(() => {
      if (!editBlog) return
      setValue('title', editBlog?.title ?? '')
      setValue('content', editBlog?.content ?? '')
      setValue(
         'imageList',
         editBlog?.imageList?.map((image) => image?._id) ?? []
      )
      setValue('active', editBlog?.active ?? true)
   }, [editBlog])

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
                           defaultValue={editBlog?.title ?? ''}
                           withAsterisk
                           label="Blog Title"
                           sx={{ width: '20rem', zIndex: 10 }}
                        />

                        <Select
                           defaultValue={editBlog?.blogType ?? ''}
                           sx={{ width: '20rem', zIndex: 10 }}
                           label="Blog title"
                           data={Object.keys(BlogType).map((type) => ({
                              value: type,
                              label: BlogTypeToLabel[type],
                           }))}
                        />
                     </Flex>
                  </Stack>

                  <Container mt={30} mb={20} fluid>
                     <Textarea
                        defaultValue={editBlog?.content ?? ''}
                        {...register('content', {
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
                     <Switch
                        defaultChecked={editBlog?.active ?? true}
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
                           image: `${API}/${image.image.filePath}`,
                        }))}
                        defaultValue={editBlog?.imageList?.map(
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
