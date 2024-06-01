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
import { formatDate, formatDate2 } from '@/utilities'
import Activity from '@/application/models/Activity.model'

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

   const [sortedActivities, setSortedActivities] = useState<Activity[]>([])

   useEffect(() => {
      if (activities && activities.length) {
         const sortedActivities = activities.sort((a, b) => {
            return (
               new Date(b.activityDate).getTime() -
               new Date(a.activityDate).getTime()
            )
         })
         setSortedActivities(sortedActivities)
      }
   }, [activities])

   return (
      <Box>
         <Container>
            <Center>
               <Title mb={40} className="dark-pink" order={2}>
                  The Work We Have Done
               </Title>
            </Center>

            <Container>
               {sortedActivities.map((activity, index) => (
                  <Box key={index}>
                     <Grid>
                        <Grid.Col md={6}>
                           {activity.imageList.length > 0 && (
                              <Carousel
                                 maw={420}
                                 mx="auto"
                                 withIndicators
                                 height={500}
                              >
                                 {activity.imageList.map(
                                    (image: any, index: number) => (
                                       <MantineImage
                                          withPlaceholder
                                          key={index}
                                          radius={'md'}
                                          src={image.url}
                                          alt="Care"
                                          height={500}
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
                              <Title order={4}>
                                 {formatDate2(activity.activityDate)}
                              </Title>
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
