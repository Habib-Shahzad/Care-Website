import { Button, rem, useMantineColorScheme } from '@mantine/core'

type PrimaryButtonProps = {
   text: string
   onClick: () => void
   loading?: boolean | null
}

export default function PrimaryButton(props: PrimaryButtonProps) {
   const { text, onClick, loading } = props
   const theme = useMantineColorScheme()

   return (
      <Button
         className={
            theme.colorScheme === 'dark'
               ? 'gray-color light-pink-bg'
               : 'dark-pink-bg'
         }
         styles={(theme) => ({
            root: {
               backgroundColor: '#00acee',
               border: 0,
               height: rem(42),
               paddingLeft: rem(20),
               paddingRight: rem(20),
               '&:not([data-disabled])': theme.fn.hover({
                  backgroundColor:
                     theme.colorScheme == 'dark'
                        ? theme.fn.darken('#f178b6', 0.05)
                        : theme.fn.darken('#e82fb4', 0.05),
               }),
            },

            leftIcon: {
               marginRight: theme.spacing.md,
            },
         })}
         variant="filled"
         onClick={onClick}
         loading={!!loading}
      >
         {text}
      </Button>
   )
}
