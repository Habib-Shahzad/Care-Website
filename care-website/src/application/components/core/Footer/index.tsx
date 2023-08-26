import {
   ActionIcon,
   Box,
   Container,
   Divider,
   Flex,
   Group,
   Text,
   createStyles,
   useMantineTheme,
} from '@mantine/core'
import Image from 'next/image'
import PrimaryButton from '../../PrimaryButton'
import {
   IconBrandFacebook,
   IconBrandInstagram,
   IconBrandTwitter,
   IconBrandWhatsapp,
   IconBrandYoutube,
} from '@tabler/icons-react'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
   footer: {
      marginTop: '-2rem',
      paddingTop: `calc(${theme.spacing.xl} * 2)`,
      paddingBottom: `calc(${theme.spacing.xl} * 2)`,
      backgroundColor:
         theme.colorScheme === 'dark' ? theme.colors.dark[9] : '#f8bdd6',
   },

   inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,

      [theme.fn.smallerThan('xs')]: {
         flexDirection: 'column',
      },
   },
   links: {
      [theme.fn.smallerThan('xs')]: {
         marginTop: theme.spacing.md,
      },
   },
}))

export default function Footer() {
   const { classes } = useStyles()
   const theme = useMantineTheme()
   return (
      <footer className={classes.footer}>
         <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center', md: 'space-evenly' }}
            align="center"
         >
            <Box>
               <Text>CARE © 2022</Text>
            </Box>

            <Box>
               {theme.colorScheme == 'dark' ? (
                  <Image
                     alt="CARE logo"
                     src="/logo-no-bg-dark.png"
                     height={150}
                     width={200}
                  />
               ) : (
                  <Image
                     alt="CARE logo"
                     src="/logo-no-bg.png"
                     height={150}
                     width={200}
                  />
               )}
            </Box>

            <Box>
               <PrimaryButton text="Code of Ethics" onClick={() => {}} />
            </Box>
         </Flex>

         <Divider />

         <Container className={classes.inner}>
            <Link
               className="dark-pink"
               style={{
                  textDecoration: 'underline',
               }}
               href="mailto:careorg.pr@gmail.com"
               target="_blank"
            >
               careorg.pr@gmail.com
            </Link>
            <Group
               align="center"
               spacing={0}
               className={classes.links}
               position="left"
               noWrap
            >
               <ActionIcon
                  onClick={() => {
                     const link =
                        'https://www.facebook.com/profile.php?id=100092137862296&mibextid=LQQJ4d'
                     window.open(link, '_blank')
                  }}
                  size="lg"
               >
                  <IconBrandFacebook size="1.05rem" stroke={1.5} />
               </ActionIcon>
               <ActionIcon
                  onClick={() => {
                     const link = 'https://www.instagram.com/asherewecare/'
                     window.open(link, '_blank')
                  }}
                  size="lg"
               >
                  <IconBrandInstagram size="1.05rem" stroke={1.5} />
               </ActionIcon>
               <ActionIcon
                  onClick={() => {
                     const link =
                        'https://api.whatsapp.com/send?phone=923332401013'
                     window.open(link, '_blank')
                  }}
                  size="lg"
               >
                  <IconBrandWhatsapp size="1.05rem" stroke={1.5} />
               </ActionIcon>
               <ActionIcon
                  onClick={() => {
                     const link = 'https://twitter.com/asherewecare?s=21'
                     window.open(link, '_blank')
                  }}
                  size="lg"
               >
                  <IconBrandTwitter size="1.05rem" stroke={1.5} />
               </ActionIcon>
            </Group>
         </Container>
      </footer>
   )
}
