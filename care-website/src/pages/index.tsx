import PrimaryButton from '@/application/components/PrimaryButton'
import SecondaryButton from '@/application/components/SecondaryButton'
import {
   Blockquote,
   Box,
   Center,
   Container,
   Flex,
   Grid,
   Image,
   Text,
   Title,
   createStyles,
   rem,
} from '@mantine/core'
import { IconNotes } from '@tabler/icons-react'
import Link from 'next/link'

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

   return (
      <>
         <Box mt={30}>
            <Box>
               <Grid justify="space-around">
                  <Grid.Col md={5} lg={5}>
                     <Title order={3} className="dark-pink">
                        AS HERE WE CARE
                     </Title>
                     <p>
                        CARE is a student-led community organization founded in
                        Karachi, Pakistan. Our primary objective is to effect
                        meaningful and sustainable change within our society,
                        which is plagued by various challenges. We strive to
                        contribute towards building a better future for all by
                        addressing these issues with unwavering dedication and
                        purpose.
                     </p>
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
                           onClick={() => {}}
                        />
                        <PrimaryButton text="Support Us" onClick={() => {}} />
                     </Flex>
                  </Grid.Col>

                  <Grid.Col md={4} lg={3} sm={7}>
                     <Box mx="auto">
                        <Image radius="md" src="/sample.jpeg" alt="Care" />
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
                                 href="mailto:dimccaresorg.hr@gmail.com"
                                 target="_blank"
                              >
                                 dimccaresorg.hr@gmail.com
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
                        <Image radius="md" src="/sample.jpeg" alt="Care" />
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
                  <SecondaryButton text="Donate Now" onClick={() => {}} />
               </Center>
            </Container>
         </Box>
      </>
   )
}
