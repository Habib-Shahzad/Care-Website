import {
   Center,
   Group,
   Pagination,
   ScrollArea,
   Table,
   Text,
   TextInput,
   UnstyledButton,
} from '@mantine/core'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import useStyles from './styles'
import {
   IconChevronDown,
   IconChevronUp,
   IconSearch,
   IconSelector,
} from '@tabler/icons-react'
import { keys } from '@mantine/utils'
import React from 'react'

export type PaginatedTableProps<T> = {
   columns: any[]
   items: T[]
   render: (item: T) => JSX.Element
   searchField?: boolean
   allowSorting?: boolean
   sortingLabelToKey?: Record<string, string>
}

interface ThProps {
   children: React.ReactNode
   reversed: boolean
   sorted: boolean
   onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
   const { classes } = useStyles()
   const Icon = sorted
      ? reversed
         ? IconChevronUp
         : IconChevronDown
      : IconSelector
   return (
      <th className={classes.th}>
         <UnstyledButton onClick={onSort} className={classes.control}>
            <Group position="apart">
               <Text fw={500} fz="sm">
                  {children}
               </Text>
               <Center className={classes.icon}>
                  <Icon size="0.9rem" stroke={1.5} />
               </Center>
            </Group>
         </UnstyledButton>
      </th>
   )
}

function filterData(data: any[], search: string) {
   const query = search.toLowerCase().trim()
   return data.filter((item) =>
      keys(data[0]).some((key) => {
         const itemKey = item[key]
         if (!(typeof itemKey == 'string')) return null
         return item[key].toLowerCase().includes(query)
      })
   )
}

function sortData(
   data: any[],
   payload: { sortBy: keyof any | null; reversed: boolean; search: string }
) {
   const { sortBy } = payload

   if (!sortBy) {
      return filterData(data, payload.search)
   }

   return filterData(
      [...data].sort((a, b) => {
         const key1 = a[sortBy]
         const key2 = b[sortBy]

         if (typeof key1 == 'number' && typeof key2 == 'number') {
            if (payload.reversed) {
               return key2 - key1
            }

            return key1 - key2
         }

         if (typeof key1 == 'boolean' && typeof key2 == 'boolean') {
            if (payload.reversed) {
               return key2 ? -1 : 1
            }

            return key1 ? -1 : 1
         }

         if (typeof key1 == 'string' && typeof key2 == 'string') {
            if (payload.reversed) {
               return b[sortBy].localeCompare(a[sortBy])
            }

            return a[sortBy].localeCompare(b[sortBy])
         }
      }),
      payload.search
   )
}

export default function PaginatedTable<T>(props: PaginatedTableProps<T>) {
   const PAGE_SIZE = 15
   const { columns, items, render, searchField } = props
   const { classes } = useStyles()
   const [sortBy, setSortBy] = useState<keyof any | null>(null)

   const [search, setSearch] = useState('')
   const [sortedData, setSortedData] = useState(items)

   const [reverseSortDirection, setReverseSortDirection] = useState(false)

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget
      setSearch(value)
      setSortedData(
         sortData(items, {
            sortBy,
            reversed: reverseSortDirection,
            search: value,
         })
      )
   }

   const setSorting = (field: keyof any) => {
      const reversed = field === sortBy ? !reverseSortDirection : false
      setReverseSortDirection(reversed)
      setSortBy(field)
      setSortedData(sortData(items, { sortBy: field, reversed, search }))
   }

   const [records, setRecords] = useState<T[]>([])
   const [page, setPage] = useState<number>(1)

   const onPageChangeHandler = useCallback(
      (page: number) => {
         const from = (page - 1) * PAGE_SIZE
         const to = from + PAGE_SIZE
         setRecords(sortedData.slice(from, to))
      },
      [sortedData]
   )

   const totalPages = useMemo(
      () => Math.ceil(items.length / PAGE_SIZE),
      [items.length]
   )

   useEffect(() => {
      onPageChangeHandler(page)
   }, [sortedData, onPageChangeHandler, page])

   return (
      <ScrollArea mx="auto">
         {!!searchField && (
            <>
               <TextInput
                  mt={30}
                  mb={30}
                  placeholder="Search"
                  variant="filled"
                  icon={<IconSearch />}
                  onChange={handleSearchChange}
               />
            </>
         )}
         <Table
            highlightOnHover
            withColumnBorders
            withBorder
            verticalSpacing="xs"
            horizontalSpacing="md"
            className={classes.table}
         >
            <thead>
               <tr>
                  {columns.map((col, index) => (
                     <React.Fragment key={index}>
                        {props.allowSorting &&
                        !!props.sortingLabelToKey?.[col] ? (
                           <Th
                              sorted={sortBy === props.sortingLabelToKey?.[col]}
                              reversed={reverseSortDirection}
                              onSort={() =>
                                 setSorting(
                                    props.sortingLabelToKey?.[col] ?? ''
                                 )
                              }
                           >
                              {col}
                           </Th>
                        ) : (
                           <th>{col}</th>
                        )}
                     </React.Fragment>
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
