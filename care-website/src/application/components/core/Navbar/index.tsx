import {
   createStyles,
   Menu,
   Center,
   Header,
   Container,
   Group,
   Button,
   Burger,
   rem,
   Transition,
   Paper,
   useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import Image from 'next/image'

const HEADER_HEIGHT = rem(65)

const useStyles = createStyles((theme) => ({
   inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   links: {
      [theme.fn.smallerThan('sm')]: {
         display: 'none',
      },
   },

   burger: {
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },

   dropdown: {
      position: 'absolute',
      top: HEADER_HEIGHT,
      left: 0,
      right: 0,
      zIndex: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
      overflow: 'hidden',

      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },

   link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
      fontSize: theme.fontSizes.md,
      fontWeight: 500,

      '&:hover': {
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
      },
   },

   linkLabel: {
      marginRight: rem(5),
   },
}))

interface HeaderActionProps {
   links: {
      link: string
      label: string
   }[]
}

export default function CustomNavbar({ links }: HeaderActionProps) {
   const { classes } = useStyles()
   const [opened, { toggle }] = useDisclosure(false)
   const items = links.map((link) => {
      return (
         <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
         >
            {link.label}
         </a>
      )
   })

   const theme = useMantineTheme()

   return (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
         <Container className={classes.inner} fluid>
            <Group>
               {/* <Burger
                  opened={opened}
                  onClick={toggle}
                  className={classes.burger}
                  size="sm"
               /> */}

               <Transition
                  transition="pop-top-right"
                  duration={200}
                  mounted={opened}
               >
                  {(styles) => (
                     <Paper
                        className={classes.dropdown}
                        withBorder
                        style={styles}
                     >
                        {items}
                     </Paper>
                  )}
               </Transition>
               {theme.colorScheme === 'dark' ? (
                  <Image
                     src="/logo-no-bg-dark.png"
                     alt="Care"
                     height={60}
                     width={85}
                  />
               ) : (
                  <Image
                     src="/logo-no-bg.png"
                     alt="Care"
                     height={60}
                     width={85}
                  />
               )}
            </Group>
            <Group spacing={5} className={classes.links}>
               {items}
            </Group>
         </Container>
      </Header>
   )
}
