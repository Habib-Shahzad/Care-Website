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
import Blog from '@/application/models/Blog.model'
import BlogForm from '@/admin/forms/BlogsForm'

export const BlogTypeToLabel: Record<string, string> = {
   PATIENT_WELFARE: 'Patient Welfare',
   COMMUNITY_OUTREACH: 'Community Outreach',
   RESEARCH_DEVELOPMENT: 'Research & Development',
}

export default function BlogTable() {
   const [selectedBlogs, setSelectedBlogs] = useState<Blog[]>([])
   const onRowClick = (Blog: any) => {}

   const { blogList, setBlogList, loading, setLoading } = useAdminDataContext()

   async function listBlogs() {
      setLoading(true)
      try {
         const blogs = await AdminNetworkingManager.listBlogs()
         setBlogList(blogs)
      } catch (error) {
         console.log(error)
         setBlogList([])
      }
      setLoading(false)
   }

   useEffect(() => {
      if (!!blogList && blogList.length > 0) return
      ;(async () => {
         await listBlogs()
      })()
   }, [])

   const handleCheckboxChange = (blog: any) => {
      if (selectedBlogs.includes(blog)) {
         setSelectedBlogs(
            selectedBlogs.filter((selectedBlog) => selectedBlog !== blog)
         )
      } else {
         setSelectedBlogs([...selectedBlogs, blog])
      }
   }

   const handleDeleteSelected = async () => {
      console.log(selectedBlogs)
      if (selectedBlogs.length === 0) return
      setLoading(true)
      try {
         const response = await AdminNetworkingManager.deleteBlogs(
            selectedBlogs?.map((blog) => blog._id)
         )
         setSelectedBlogs([])
         setBlogList(response)
         setLoading(false)
         closeDelete()
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   const handleActivation = async (active: boolean) => {
      if (selectedBlogs.length === 0) return
      setLoading(true)
      const response = await AdminNetworkingManager.setBlogsActive(
         selectedBlogs?.map((blog) => blog._id),
         active
      )
      setSelectedBlogs([])
      setBlogList(response)
      setLoading(false)
   }

   const handleSelectAll = () => {
      if (selectedBlogs.length === blogList.length) {
         setSelectedBlogs([])
      } else {
         setSelectedBlogs([...blogList])
      }
   }

   const blogTableProps = useMemo<PaginatedTableProps<any>>(
      () => ({
         columns: [
            <Checkbox
               onChange={handleSelectAll}
               checked={selectedBlogs.length === blogList.length}
               label=""
            />,
            'Title',
            'Type',
            'Content Length',
            'Active',
            'Actions',
         ],
         items: blogList,
         render: (blog: Blog) => {
            return (
               <tr className="pointer">
                  <td>
                     <Checkbox
                        onChange={() => handleCheckboxChange(blog)}
                        color="blue"
                        checked={selectedBlogs.includes(blog)}
                        label=""
                     />
                  </td>
                  <td onClick={() => onRowClick(blog)}>{blog.title}</td>
                  <td onClick={() => onRowClick(blog)}>
                     {BlogTypeToLabel?.[blog.blogType] ?? ''}
                  </td>
                  <td onClick={() => onRowClick(blog)}>
                     {blog?.content?.length}
                  </td>

                  <td onClick={() => onRowClick(blog)}>
                     {blog.active ? (
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
                           setEditBlog(blog)
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
      [blogList, selectedBlogs, onRowClick]
   )

   const [confirmDelete, { toggle: toggleDelete, close: closeDelete }] =
      useDisclosure(false)

   const [editBlog, setEditBlog] = useState<Blog | undefined>(undefined)
   const [openBlogForm, { open, close }] = useDisclosure(false)

   return (
      <div>
         <ConfirmationDialog
            text={`Are you sure you want to delete ${selectedBlogs.length} blog(s)?`}
            opened={confirmDelete}
            close={closeDelete}
            onConfirm={handleDeleteSelected}
         />

         <Box mb={30}>
            {selectedBlogs.length > 0 && (
               <>
                  <span>{`${selectedBlogs.length} blog(s) selected`}</span>
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
            <BlogForm
               setEditBlog={setEditBlog}
               editBlog={editBlog}
               opened={openBlogForm}
               handleOnClose={close}
            />
            {selectedBlogs.length == 0 && (
               <Button
                  color="green"
                  onClick={() => {
                     open()
                     setEditBlog(undefined)
                  }}
               >
                  Add new
               </Button>
            )}
         </Box>

         {loading && <TableSkeleton />}
         {!loading && <PaginatedTable {...blogTableProps} />}
      </div>
   )
}
