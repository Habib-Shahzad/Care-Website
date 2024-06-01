import PrimaryButton from '@/application/components/PrimaryButton'
import Blog from '@/application/models/Blog.model'
import NetworkingManager, { API } from '@/application/networking'
import { useDataContext } from '@/application/providers/ContextProvider'
import { Carousel } from '@mantine/carousel'
import {
   Blockquote,
   Box,
   Center,
   Container,
   Grid,
   Image,
   Loader,
   MediaQuery,
   Text,
   Title,
   rem,
   useMantineTheme,
} from '@mantine/core'
import { useEffect, useState } from 'react'

export default function CommunityOutreach() {
   function BlogComponent(props: { blog: Blog }) {
      const { blog } = props
      return (
         <>
            <Grid.Col lg={4} md={4} sm={9}>
               <Container>
                  <Title className="dark-pink" order={3}>
                     {blog.title}
                  </Title>
                  <Text
                     sx={{
                        fontWeight: 550,
                     }}
                     className={
                        theme.colorScheme === 'dark'
                           ? 'light-pink'
                           : 'light-pink'
                     }
                  >
                     {blog.content}
                  </Text>
               </Container>
            </Grid.Col>
            {blog.imageList?.length == 0 ? null : (
               <Grid.Col
                  style={{
                     top: '0',
                     verticalAlign: 'text-top',
                  }}
                  lg={4}
                  md={4}
                  sm={9}
               >
                  <Carousel maw={420} mx="auto" withIndicators height={500}>
                     {blog.imageList.map((image: any, index: number) => (
                        <Image
                           key={index}
                           radius={'md'}
                           src={image.url}
                           alt="Care"
                           height={500}
                           width={420}
                        />
                     ))}
                  </Carousel>
               </Grid.Col>
            )}
         </>
      )
   }

   const isSmallDevice = window.matchMedia('(max-width: 768px)').matches

   const [loading, setLoading] = useState(true)
   const {
      communityOutreachBlogs: blogs,
      setCommunityOutreachBlogs: setBlogs,
   } = useDataContext()

   async function listBlogs() {
      if (blogs && blogs.length) {
         setLoading(false)
         return
      }
      const response = await NetworkingManager.listCommunityOutreachBlogs()
      setBlogs(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await listBlogs()
      })()
   }, [])

   const theme = useMantineTheme()

   return (
      <>
         <Box>
            <Center maw={800} mx="auto">
               <Blockquote className="light-pink" cite="- Thomas Nagel">
                  Altruism itself depends on a recognition of the reality of
                  other persons, and on the equivalent capacity to regard
                  oneself as merely one individual among many
               </Blockquote>
            </Center>

            <MediaQuery
               smallerThan={'sm'}
               styles={{
                  fontSize: rem(20),
                  textAlign: 'center',
               }}
            >
               <Container size="sm" mx="auto" mt={30}>
                  <Center>
                     <Title className="dark-pink" order={2}>
                        Community Outreach Programme
                     </Title>
                  </Center>

                  <Text
                     sx={{
                        fontWeight: 600,
                     }}
                     className={
                        theme.colorScheme === 'dark'
                           ? 'light-pink'
                           : 'light-pink'
                     }
                  >
                     In pursuance of raising awareness CARE has initiated its
                     innovative and much needed Community Outreach Programme
                     (COP). The COP is aimed to start a conversation on alarming
                     issues that are predominant in our society, however, it is
                     unfortunate that these issues are not actively recognized
                     or are as informed as they should be. The CARE team is
                     currently working on seeking institutional participation in
                     spreading awareness on the following topics:
                  </Text>
               </Container>
            </MediaQuery>

            {loading ? (
               <Center mt={30}>
                  <Loader />
               </Center>
            ) : (
               <Container fluid mt={50}>
                  {blogs.map((blog: any, index) => (
                     <Grid
                        mx={'auto'}
                        style={{
                           justifyContent: 'center',
                        }}
                        key={index}
                        mt={40}
                     >
                        {isSmallDevice ? (
                           <BlogComponent blog={blog} />
                        ) : (
                           <Center>
                              <BlogComponent blog={blog} />
                           </Center>
                        )}
                     </Grid>
                  ))}
               </Container>
            )}

            <MediaQuery
               smallerThan={'sm'}
               styles={{
                  fontSize: rem(20),
                  textAlign: 'center',
               }}
            >
               <Container size="sm" mx="auto" mt={30}>
                  <Center>
                     <Title className="dark-pink" order={2}>
                        Our Purpose!
                     </Title>
                  </Center>

                  <Text
                     sx={{
                        fontWeight: 600,
                     }}
                     className={
                        theme.colorScheme === 'dark'
                           ? 'light-pink'
                           : 'light-pink'
                     }
                  >
                     The student demographic of any country is its most
                     potential filled, as well as, its most volatile population
                     segment. Given the alarming figures stated above, and the
                     blatant disregard for basic practices, imposes upon us an
                     ever more important duty to guide them. In this age of
                     information there is a perception of an informed
                     individual, however, ironically, we have never been so
                     misinformed due to the widespread of false information.
                     Thus, it is crucial that we relay reliable and correct
                     information to the young pupils of our community.
                  </Text>
                  <Text
                     sx={{
                        fontWeight: 600,
                     }}
                     className={
                        theme.colorScheme === 'dark'
                           ? 'light-pink'
                           : 'light-pink'
                     }
                  >
                     Be kind, even a small contribution from your side would
                     make a change for someone fighting a hard battle
                  </Text>
               </Container>
            </MediaQuery>

            <Container>
               <Center>
                  <Title className="dark-pink" order={2}>
                     Assist Us
                  </Title>
               </Center>
               <Center>
                  <Text>Make a change</Text>
               </Center>
               <Center>
                  <PrimaryButton
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
