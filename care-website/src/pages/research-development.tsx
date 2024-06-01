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
   Text,
   Title,
   useMantineTheme,
} from '@mantine/core'
import { useEffect, useState } from 'react'

export default function ResearchDevelopment() {
   const theme = useMantineTheme()

   const [loading, setLoading] = useState(true)
   const {
      researchDevelopmentBlogs: blogs,
      setResearchDevelopmentBlogs: setBlogs,
   } = useDataContext()

   async function listBlogs() {
      if (blogs && blogs.length) {
         setLoading(false)
         return
      }
      const response = await NetworkingManager.listResearchDevelopmentBlogs()
      setBlogs(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await listBlogs()
      })()
   }, [])

   function BlogComponent(props: { blog: Blog }) {
      const { blog } = props
      return (
         <>
            <Grid.Col lg={4} md={4} sm={9}>
               <Box mx="auto">
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
               </Box>
            </Grid.Col>
            {blog.imageList?.length == 0 ? null : (
               <Grid.Col lg={4} md={4} sm={9}>
                  <Carousel maw={420} mx="auto" withIndicators height={300}>
                     {blog.imageList.map((image, index) => (
                        <Image
                           key={index}
                           radius={'md'}
                           src={image?.url}
                           alt="Care"
                           height={300}
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

   return (
      <>
         <Box>
            <Center maw={800} mx="auto">
               <Blockquote className="light-pink" cite="- Thomas Nagel">
                  Altruism itself depends on a recognition of the reality of
                  other persons, and on the equivalent capacity to regard
                  oneself as merely one individual among many.
               </Blockquote>
            </Center>

            <Container size="sm" mx="auto" mt={30}>
               <Center>
                  <Title className="dark-pink" order={2}>
                     Research and Development
                  </Title>
               </Center>

               <Text
                  sx={{
                     fontWeight: 600,
                  }}
                  className={
                     theme.colorScheme === 'dark' ? 'light-pink' : 'light-pink'
                  }
               >
                  In pursuance of raising awareness CARE has initiated its
                  innovative and much needed Community Outreach Programme (COP).
                  The COP is aimed to start a conversation on alarming issues
                  that are predominant in our society, however, it is
                  unfortunate that these issues are not actively recognized or
                  are as informed as they should be. The CARE team is currently
                  working on seeking institutional participation in spreading
                  awareness on the following topics:
               </Text>
            </Container>

            <Container fluid mt={50}>
               {blogs.map((blog, index) => (
                  <Grid key={index} mt={40}>
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
                     theme.colorScheme === 'dark' ? 'light-pink' : 'light-pink'
                  }
               >
                  The student demographic of any country is its most potential
                  filled, as well as, its most volatile population segment.
                  Given the alarming figures stated above, and the blatant
                  disregard for basic practices, imposes upon us an ever more
                  important duty to guide them. In this age of information there
                  is a perception of an informed individual, however,
                  ironically, we have never been so misinformed due to the
                  widespread of false information. Thus, it is crucial that we
                  relay reliable and correct information to the young pupils of
                  our community.
               </Text>
               <Text
                  sx={{
                     fontWeight: 600,
                  }}
                  className={
                     theme.colorScheme === 'dark' ? 'light-pink' : 'light-pink'
                  }
               >
                  Be kind, even a small contribution from your side would make a
                  change for someone fighting a hard battle
               </Text>
            </Container>

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
