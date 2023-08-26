import PrimaryButton from '@/application/components/PrimaryButton'
import SecondaryButton from '@/application/components/SecondaryButton'
import NetworkingManager, { API } from '@/application/networking'
import { useDataContext } from '@/application/providers/ContextProvider'
import {
   Blockquote,
   Box,
   Center,
   Container,
   Flex,
   Grid,
   Loader,
   Image as MantineImage,
   Text,
   Title,
   createStyles,
   rem,
} from '@mantine/core'
import { IconNotes } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { shimmer, toBase64 } from '@/application/components/shimmer'

const useStyles = createStyles((theme) => ({
   bottom: {
      width: '100vw',
      position: 'relative',
      marginLeft: 'calc(-50vw + 50%)',
      left: 0,
      marginTop: rem(120),
      paddingTop: `calc(${theme.spacing.xl} * 2)`,
      paddingBottom: `calc(${theme.spacing.xl} * 2)`,
      backgroundColor: theme.colorScheme === 'dark' ? 'black' : '#f178b6',
   },
}))

export default function Home() {
   const { classes } = useStyles()
   const { homePageData, setHomePageData } = useDataContext()
   const [loading, setLoading] = useState(true)

   // useCallback

   async function getData() {
      if (homePageData) {
         setLoading(false)
         return
      }

      const response = await NetworkingManager.getHomePageData()
      setHomePageData(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await getData()
      })()
   }, [])

   return (
      <>
         <Box mt={30}>
            <Box>
               <Grid justify="space-around">
                  <Grid.Col md={5} lg={5}>
                     <Title order={3} className="dark-pink">
                        AS HERE WE CARE
                     </Title>

                     <Text>{homePageData?.mainContent}</Text>

                     <Flex
                        wrap="wrap"
                        direction={{ base: 'column', sm: 'row' }}
                        gap={{ base: 'sm', sm: 'lg' }}
                        align={{
                           sm: 'center',
                           md: 'flex-start',
                        }}
                        mt={10}
                     >
                        <PrimaryButton
                           text="Member Support"
                           onClick={() => {
                              window.open(
                                 'https://linktr.ee/CAREHumanResources',
                                 '_blank'
                              )
                           }}
                        />
                        <PrimaryButton
                           text="Support Us"
                           onClick={() => {
                              window.open(
                                 'https://api.whatsapp.com/send?phone=923332401013',
                                 '_blank'
                              )
                           }}
                        />
                     </Flex>
                  </Grid.Col>

                  <Grid.Col md={4} lg={3} sm={7}>
                     <Box mx="auto">
                        {!loading && (
                           <Image
                              height={300}
                              width={350}
                              style={{
                                 borderRadius: '1rem',
                                 border: '1px solid #e82fb4',
                              }}
                              priority
                              blurDataURL={
                                 'data:image/svg+xml;base64,' +
                                 toBase64(shimmer(200, 200))
                              }
                              placeholder="blur"
                              src={`${homePageData?.mainImage?.image?.filePath}`}
                              alt="Care"
                           />
                        )}
                     </Box>
                  </Grid.Col>
               </Grid>
            </Box>

            <Box pt={50}>
               <Center maw={800} mx="auto">
                  <Blockquote cite="- Mitch Albom">
                     The way you get meaning into your life is to devote
                     yourself to loving others, devote yourself to your
                     community around you, and devote yourself to creating
                     something that gives you purpose and meaning.
                  </Blockquote>
               </Center>
            </Box>

            <Box pt={50}>
               <Grid justify="space-around">
                  <Grid.Col md={4} lg={5}>
                     <Title order={3} className="dark-pink">
                        Become An Ambassador
                     </Title>
                     <p>
                        CARE hosts an ambassador programme where individuals who
                        would like to volunteer on an events basis could join
                        the society. Primary objective of starting this
                        programme is to reduce the workload of CARE members and
                        also increase volunteer participation of students who
                        cannot volunteer as full time CARE members. Ambassadors
                        shall not be promoted and will have to fulfill all their
                        responsibilities to stay in the society.If an ambassador
                        desires to join any other department, they will have to
                        go through the standard recruitment process and will be
                        subject to the same responsibilities as regular members.
                     </p>
                     <Grid mt={10}>
                        <Grid.Col md={5} sm={7}>
                           <Flex>
                              <IconNotes size={30} />
                              <Center>
                                 <Title className="dark-pink" order={5}>
                                    We Appreciate You
                                 </Title>
                              </Center>
                           </Flex>
                           <p
                              style={{
                                 marginTop: '0.5rem',
                              }}
                           >
                              For the services of all ambassadors CARE would
                              provide certificates of appreciation at the end of
                              year to all ambassadors that stay affiliated until
                              the end of year.
                           </p>
                        </Grid.Col>

                        <Grid.Col md={5} sm={7}>
                           <Flex>
                              <IconNotes size={30} />
                              <Center>
                                 <Title className="dark-pink" order={5}>
                                    Get Recruited
                                 </Title>
                              </Center>
                           </Flex>
                           <p
                              style={{
                                 marginTop: '0.5rem',
                              }}
                           >
                              For recruitment related queries you can mail us at{' '}
                              <Link
                                 className="dark-pink"
                                 style={{
                                    textDecoration: 'underline',
                                 }}
                                 href="mailto:dcareorg.pr@gmail.com"
                                 target="_blank"
                              >
                                 careorg.pr@gmail.com
                              </Link>
                              . CARE reserves the right to make any amends in
                              the ambassadorship programme, provided it is
                              beneficial for all parties involved.
                           </p>
                        </Grid.Col>
                     </Grid>
                  </Grid.Col>

                  <Grid.Col md={4} lg={3}>
                     <Box mx="auto">
                        {!loading && (
                           <MantineImage
                              radius="md"
                              src={`${homePageData?.ambassadorImage?.image?.filePath}`}
                           />
                        )}
                     </Box>
                  </Grid.Col>
               </Grid>
            </Box>
         </Box>
         <Box className={classes.bottom}>
            <Container>
               <Center>
                  <Title className="dark-pink font-weight-normal" order={3}>
                     A Small Contribution can make a change
                  </Title>
               </Center>
            </Container>

            <Container mt={30} size={'md'}>
               <Blockquote cite="- Mother Teresa">
                  We ourselves feel that what we are doing is just a drop in the
                  ocean. But the ocean would be less because of that missing
                  drop.
               </Blockquote>
            </Container>

            <Container>
               <Center>
                  <Text>
                     Be kind, even a small contribution from your side would
                     make a change for someone fighting a hard battle
                  </Text>
               </Center>
            </Container>

            <Container mt={20}>
               <Center>
                  <Title className="dark-pink font-weight-normal" order={3}>
                     Even a Small Bit Matters
                  </Title>
               </Center>
            </Container>

            <Container mt={20}>
               <Center>
                  <Text>Make a Change</Text>
               </Center>
               <Center>
                  <SecondaryButton
                     text="Donate Now"
                     onClick={() => {
                        window.open(
                           'https://api.whatsapp.com/send?phone=923332401013',
                           '_blank'
                        )
                     }}
                  />
               </Center>
            </Container>
         </Box>
      </>
   )
}
