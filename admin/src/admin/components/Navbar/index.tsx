import { useState } from 'react'
import {
   createStyles,
   Navbar,
   Group,
   Code,
   getStylesRef,
   rem,
   Image,
   useMantineColorScheme,
   useMantineTheme,
   Switch,
} from '@mantine/core'
import {
   IconBellRinging,
   IconFingerprint,
   IconKey,
   IconSettings,
   Icon2fa,
   IconDatabaseImport,
   IconReceipt2,
   IconSwitchHorizontal,
   IconLogout,
   IconUser,
   IconBrandBlogger,
   IconCameraSelfie,
   IconCalendarEvent,
   IconBrandOffice,
   IconHome,
   IconMoonStars,
   IconSun,
} from '@tabler/icons-react'
import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import { AdminNetworkingManager } from '@/admin/networking'

const useStyles = createStyles((theme) => ({
   header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: `${rem(1)} solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
      }`,
   },

   footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
         theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
      }`,
   },

   link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
         backgroundColor:
            theme.colorScheme === 'dark'
               ? theme.colors.dark[6]
               : theme.colors.gray[0],
         color: theme.colorScheme === 'dark' ? theme.white : theme.black,

         [`& .${getStylesRef('icon')}`]: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
         },
      },
   },

   linkIcon: {
      ref: getStylesRef('icon'),
      color:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
   },

   linkActive: {
      '&, &:hover': {
         backgroundColor: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
         }).background,
         color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
         }).color,
         [`& .${getStylesRef('icon')}`]: {
            color: theme.fn.variant({
               variant: 'light',
               color: theme.primaryColor,
            }).color,
         },
      },
   },
}))

const data = [
   { link: '', label: 'User', icon: IconUser },
   { link: '', label: 'Blogs', icon: IconBrandBlogger },
   { link: '', label: 'Images', icon: IconCameraSelfie },
   { link: '', label: 'Activities', icon: IconCalendarEvent },
   { link: '', label: 'Department', icon: IconBrandOffice },
   { link: '', label: 'Home Page', icon: IconHome },
]

export default function AdminNavbarSimple() {
   const { classes, cx } = useStyles()
   const { activeTab, setActiveTab } = useAdminContext()

   const links = data.map((item) => (
      <a
         className={cx(classes.link, {
            [classes.linkActive]: item.label === activeTab,
         })}
         href={item.link}
         key={item.label}
         onClick={(event) => {
            event.preventDefault()
            setActiveTab(item.label)
         }}
      >
         <item.icon className={classes.linkIcon} stroke={1.5} />
         <span>{item.label}</span>
      </a>
   ))

   const { adminUserState, setAdminUserState } = useAdminContext()

   const theme = useMantineColorScheme()
   const isDarkTheme = theme.colorScheme === 'dark'

   const theme2 = useMantineTheme()

   const { toggleColorScheme } = useMantineColorScheme()

   return (
      <>
         {adminUserState && (
            <Navbar height={700} width={{ sm: 300 }} p="md">
               <Switch
                  size="md"
                  color={isDarkTheme ? 'gray' : 'dark'}
                  checked={isDarkTheme}
                  onLabel={
                     <IconSun
                        size="1rem"
                        stroke={2.5}
                        color={theme2.colors.yellow[4]}
                     />
                  }
                  offLabel={
                     <IconMoonStars
                        size="1rem"
                        stroke={2.5}
                        color={theme2.colors.blue[6]}
                     />
                  }
                  onClick={() => toggleColorScheme()}
               />

               <Navbar.Section grow>
                  <Group className={classes.header} position="apart">
                     <Image maw={140} mx="auto" radius="md" src={'/logo.png'} />
                  </Group>
                  {links}
               </Navbar.Section>

               <Navbar.Section className={classes.footer}>
                  <a
                     href="#"
                     className={classes.link}
                     onClick={async (event) => {
                        event.preventDefault()
                        await AdminNetworkingManager.logoutUser()
                        setAdminUserState(null)
                     }}
                  >
                     <IconLogout className={classes.linkIcon} stroke={1.5} />
                     <span>Logout</span>
                  </a>
               </Navbar.Section>
            </Navbar>
         )}
      </>
   )
}
