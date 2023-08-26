import React, { useState, useEffect, useMemo } from 'react'
import PaginatedTable, {
   PaginatedTableProps,
} from '@/admin/components/PaginatedTable'
import TableSkeleton from '@/admin/components/TableSkeleton'
import { AdminNetworkingManager } from '@/admin/networking'
import { useAdminDataContext } from '@/admin/providers/AdminDataContext'
import { Avatar, Box, Button, Checkbox, Flex, TextInput } from '@mantine/core'
import {
   IconEdit,
   IconLock,
   IconSquareCheck,
   IconSquareRoundedX,
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ConfirmationDialog from '@/admin/components/Dialog'
import Image from '@/application/models/Image.model'
import ImageForm from '@/admin/forms/ImageForm'
import { keys } from '@mantine/utils'

export const ImageTypeToLabel: Record<string, string> = {
   PATIENT_WELFARE: 'Patient Welfare',
   COMMUNITY_OUTREACH: 'Community Outreach',
   RESEARCH_DEVELOPMENT: 'Research & Development',
}

export default function ImagesTable() {
   const [selectedImages, setSelectedImages] = useState<Image[]>([])
   const onRowClick = (Image: any) => {}

   const { imageList, setImageList, loading, setLoading } =
      useAdminDataContext()

   async function getImageFileSize(imageUrl: string) {
      try {
         const response = await fetch(imageUrl)

         if (!response.ok) {
            throw new Error('Network response was not ok')
         }

         const blob = await response.blob()
         const fileSizeInBytes = blob.size
         const fileSizeInKilobytes = fileSizeInBytes / 1024
         const fileSizeInMegabytes = fileSizeInKilobytes / 1024

         return {
            bytes: fileSizeInBytes,
            kilobytes: fileSizeInKilobytes,
            megabytes: fileSizeInMegabytes,
         }
      } catch (error) {
         console.error('Error fetching image:', error)
         return null
      }
   }

   async function listImages() {
      setLoading(true)
      try {
         const images = await AdminNetworkingManager.listImages()
         //  const imagesWithFileSize = await Promise.all(
         //     images.map(async (image: Image) => {
         //        const url = `${image.image.filePath}`
         //        const fileSize = await getImageFileSize(url)
         //        return {
         //           ...image,
         //           fileSize: fileSize,
         //        }
         //     })
         //  )
         setImageList(images)
      } catch (error) {
         console.log(error)
         setImageList([])
      }
      setLoading(false)
   }

   useEffect(() => {
      if (!!imageList && imageList.length > 0) return
      ;(async () => {
         await listImages()
      })()
   }, [])

   const handleCheckboxChange = (image: any) => {
      if (selectedImages.includes(image)) {
         setSelectedImages(
            selectedImages.filter((selectedImage) => selectedImage !== image)
         )
      } else {
         setSelectedImages([...selectedImages, image])
      }
   }

   const handleDeleteSelected = async () => {
      console.log(selectedImages)
      if (selectedImages.length === 0) return
      setLoading(true)
      try {
         const response = await AdminNetworkingManager.deleteImages(
            selectedImages?.map((image) => image._id)
         )
         setSelectedImages([])
         setImageList(response)
         setLoading(false)
         closeDelete()
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   const handleSelectAll = () => {
      if (selectedImages.length === imageList.length) {
         setSelectedImages([])
      } else {
         setSelectedImages([...imageList])
      }
   }

   const imageTableProps = useMemo<PaginatedTableProps<any>>(
      () => ({
         columns: [
            <Checkbox
               onChange={handleSelectAll}
               checked={selectedImages.length === imageList.length}
               label=""
            />,
            'Title',
            'Image',
            'File Size',
            'File Path',
            'Actions',
         ],
         items: imageList,
         render: (image: any) => {
            return (
               <tr className="pointer">
                  <td>
                     <Checkbox
                        onChange={() => handleCheckboxChange(image)}
                        color="blue"
                        checked={selectedImages.includes(image)}
                        label=""
                     />
                  </td>
                  <td>{image.name}</td>
                  <td>
                     <Avatar
                        src={`${image.image.filePath}`}
                        alt={image.name}
                        radius="xl"
                     />
                  </td>
                  <td>{image?.['fileSize']?.bytes ?? 'N/A'}</td>

                  <td>{image.image.filePath ?? 'N/A'}</td>

                  <td>
                     <Button
                        leftIcon={<IconLock />}
                        color="blue"
                        variant="white"
                        disabled={true}
                     >
                        Edit
                     </Button>
                  </td>
               </tr>
            )
         },
      }),
      [imageList, selectedImages, onRowClick]
   )

   const [confirmDelete, { toggle: toggleDelete, close: closeDelete }] =
      useDisclosure(false)

   const [editImage, setEditImage] = useState<Image | undefined>(undefined)
   const [openImageForm, { open, close }] = useDisclosure(false)

   function filterData(data: any[], search: string) {
      const query = search.toLowerCase().trim()
      return data.filter((item) =>
         keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
      )
   }

   return (
      <div>
         <ConfirmationDialog
            text={`Are you sure you want to delete ${selectedImages.length} image(s)?`}
            opened={confirmDelete}
            close={closeDelete}
            onConfirm={handleDeleteSelected}
         />
         <Box>
            {selectedImages.length > 0 && !loading && (
               <>
                  <span>{`${selectedImages.length} activity(s) selected`}</span>
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
                  </Flex>
               </>
            )}
            <ImageForm
               setEditImage={setEditImage}
               editImage={editImage}
               opened={openImageForm}
               handleOnClose={close}
            />
            {selectedImages.length == 0 && (
               <>
                  <Button
                     color="green"
                     onClick={() => {
                        open()
                        setEditImage(undefined)
                     }}
                  >
                     Add new
                  </Button>
               </>
            )}
         </Box>

         {loading && <TableSkeleton />}
         {!loading && <PaginatedTable searchField {...imageTableProps} />}
      </div>
   )
}
