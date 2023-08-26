import { Group, Pagination, ScrollArea, Table, TextInput } from '@mantine/core'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import useStyles from './styles'
import { IconSearch } from '@tabler/icons-react'
import { keys } from '@mantine/utils'

export type PaginatedTableProps<T> = {
   columns: any[]
   items: T[]
   render: (item: T) => JSX.Element
   searchField?: string
}

export default function PaginatedTable<T>(props: PaginatedTableProps<T>) {
   const PAGE_SIZE = 15
   const { columns, items, render, searchField } = props
   const { classes } = useStyles()

   const [search, setSearch] = useState('')
   const [filteredData, setFilteredData] = useState(items)

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget
      setSearch(value)
      const lowercasedValue = value.toLowerCase().trim()
      if (lowercasedValue === '') {
         setFilteredData(items)
      }
      const filteredData = items.filter((item: any) => {
         return keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(lowercasedValue)
         )
      })

      setFilteredData(filteredData)

      onPageChangeHandler(page)
   }

   const [records, setRecords] = useState<T[]>([])
   const [page, setPage] = useState<number>(1)

   const onPageChangeHandler = useCallback(
      (page: number) => {
         const from = (page - 1) * PAGE_SIZE
         const to = from + PAGE_SIZE
         setRecords(filteredData.slice(from, to))
      },
      [filteredData]
   )

   const totalPages = useMemo(
      () => Math.ceil(items.length / PAGE_SIZE),
      [items.length]
   )

   useEffect(() => {
      onPageChangeHandler(page)
   }, [filteredData, onPageChangeHandler, page])

   return (
      <ScrollArea mx="auto">
         {!!searchField && (
            <TextInput
               placeholder="Search"
               variant="filled"
               icon={<IconSearch />}
               onChange={handleSearchChange}
            />
         )}
         <Table
            highlightOnHover
            // striped
            withColumnBorders
            withBorder
            verticalSpacing="xs"
            horizontalSpacing="md"
            className={classes.table}
         >
            <thead>
               <tr>
                  {columns.map((col, index) => (
                     <th key={index}>{col}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {records.map((item, index) => (
                  <Fragment key={index}>{render(item)}</Fragment>
               ))}
            </tbody>
         </Table>
         <Group position="right" mt="lg">
            <Pagination
               value={page}
               withEdges
               total={totalPages}
               color="yellow"
               radius="lg"
               onChange={setPage}
            />
         </Group>
      </ScrollArea>
   )
}
