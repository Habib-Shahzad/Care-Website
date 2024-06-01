import NetworkingManager, { API } from '@/application/networking'
import { useDataContext } from '@/application/providers/ContextProvider'
import { Carousel } from '@mantine/carousel'
import {
   Box,
   Center,
   Container,
   Divider,
   Image,
   Text,
   Title,
   useMantineTheme,
} from '@mantine/core'
import { useEffect, useState } from 'react'

export default function PatientWelfare() {
   const theme = useMantineTheme()

   const [loading, setLoading] = useState(true)
   const { patientWelfareBlogs: blogs, setPatientWelfareBlogs: setBlogs } =
      useDataContext()

   async function listBlogs() {
      if (blogs && blogs.length) {
         setLoading(false)
         return
      }
      const response = await NetworkingManager.listPatientWelfareBlogs()
      setBlogs(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await listBlogs()
      })()
   }, [])

   return (
      <Box>
         <Container size="sm" mx="auto" mt={30}>
            <Center>
               <Title className="dark-pink" order={2}>
                  Care Patient Welfare{' '}
               </Title>
            </Center>

            <Text
               sx={{
                  fontWeight: 400,
               }}
            >
               Many disadvantaged patients experience feelings of frustration
               and helplessness when they visit the hospital. The deteriorating
               health of their loved ones, coupled with financial burdens and
               the complexity of the healthcare system, can lead them into a
               state of depression. Our objective is to offer comprehensive care
               to these patients by not only providing financial assistance but
               also guiding them during their hospital stays, helping them find
               the answers they desperately seek. Whether it's supporting young
               adults with an early cancer diagnosis, supplying life-saving
               medication for hepatitis, or organizing blood donation drives for
               bone marrow transplant recipients, our program strives to assist
               anyone who reaches out for help. Join us in bringing smiles to
               those in need during their most challenging times by making a
               donation today!
            </Text>
         </Container>

         <Divider mt={30} mb={30} />

         <Container>
            {blogs.map((blog, index) => (
               <Box
                  sx={{
                     borderRadius: '3rem',
                     backgroundColor:
                        theme.colorScheme == 'dark'
                           ? theme.colors.dark[7]
                           : '#f8bdd6',
                  }}
                  key={index}
               >
                  <Center>
                     <Title className="dark-pink" order={2}>
                        {blog.title}
                     </Title>
                  </Center>

                  {blog.imageList.length > 0 && (
                     <Container>
                        <Carousel
                           maw={420}
                           mx="auto"
                           withIndicators
                           height={500}
                        >
                           {blog.imageList.map((image, index) => (
                              <Image
                                 key={index}
                                 radius={'md'}
                                 src={image?.url}
                                 alt="Care"
                                 height={500}
                                 width={420}
                              />
                           ))}
                        </Carousel>
                     </Container>
                  )}
                  <Container size={'sm'}>
                     <Text
                        sx={{
                           color:
                              theme.colorScheme == 'dark' ? 'white' : 'black',
                        }}
                     >
                        {blog.content}
                     </Text>
                  </Container>

                  <Divider mt={30} mb={30} />
               </Box>
            ))}
         </Container>
      </Box>
   )
}
