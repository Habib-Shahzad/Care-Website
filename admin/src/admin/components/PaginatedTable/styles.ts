import { createStyles, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
   table: {
      borderCollapse: 'collapse',
      borderRadius: '0.5rem',
      border: 'none',
   },

   th: {
      padding: '0 !important',
   },

   control: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,

      '&:hover': {
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
      },
   },

   icon: {
      width: rem(21),
      height: rem(21),
      borderRadius: rem(21),
   },
}))

export default useStyles
