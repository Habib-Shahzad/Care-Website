import NetworkingManager, { API } from '@/application/networking'
import { useDataContext } from '@/application/providers/ContextProvider'
import { Carousel } from '@mantine/carousel'
import {
   Box,
   Center,
   Container,
   Divider,
   Grid,
   Image as MantineImage,
   Text,
   Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function OurActivites() {
   const [loading, setLoading] = useState(true)
   const { activities, setActivities } = useDataContext()

   async function listActivities() {
      if (activities && activities.length) {
         setLoading(false)
         return
      }
      const response = await NetworkingManager.listActivities()
      setActivities(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await listActivities()
      })()
   }, [])

   return (
      <Box>
         <Container>
            <Center>
               <Title mb={40} className="dark-pink" order={2}>
                  The Work We Have Done
               </Title>
            </Center>

            <Container>
               {activities.map((activity, index) => (
                  <Box key={index}>
                     <Grid>
                        <Grid.Col md={6}>
                           {activity.imageList.length > 0 && (
                              <Carousel
                                 maw={420}
                                 mx="auto"
                                 withIndicators
                                 height={300}
                              >
                                 {activity.imageList.map(
                                    (image: any, index: number) => (
                                       <MantineImage
                                          withPlaceholder
                                          key={index}
                                          radius={'md'}
                                          src={`${API}${image.image.filePath}`}
                                          alt="Care"
                                          height={300}
                                          width={420}
                                       />
                                    )
                                 )}
                              </Carousel>
                           )}
                        </Grid.Col>
                        <Grid.Col md={6}>
                           <Container>
                              <Title order={3}>{activity.title}</Title>
                              <Title order={4}>{activity.activityDate}</Title>
                              <Text>{activity.content}</Text>
                           </Container>
                        </Grid.Col>
                     </Grid>
                     <Divider mt={30} mb={30} />
                  </Box>
               ))}
            </Container>
         </Container>
      </Box>
   )
}
