import { Carousel } from '@mantine/carousel'
import {
   Box,
   Center,
   Container,
   Divider,
   Grid,
   Image,
   Text,
   Title,
} from '@mantine/core'

export default function OurActivites() {
   const activities = [
      {
         name: 'Fehmida’s Senior Care Home',
         date: '30 June 2022',
         description:
            'Our team visited Fehmida’s Senior Care Home, another old age home and spent the day there with senior citizens, doing activities and having lunch as well as listening to all difficulties they’re going through. We wanted this to be our last project before summer break.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'World Blood Donor Day',
         date: '14 June 2022',
         description:
            'A blood donation drive to take place in the Blood Bank where students across campus are encouraged to come and donate blood. This drive is arranged in order to gather blood for the blood bank as well as patients in Dow Hospital, Ojha.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Brain Tumour Awareness Seminar  - Dar Ul Sukoon',
         date: '6 June 2022',
         description:
            'A session was conducted by our team at Dar Ul Sukoon to train the staff on brain tumours and management as they’ve children with disabilities. It was an interactivity session with many further follow ups. This session was a part of our recently launched Community Outreach Program which targets educating our society on topics not openly discussed such as rape, self harm, hygiene etc. The program also works in accordance with Dow’s SDG goals.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Dar Ul Sukoon - Old Age Home',
         date: '4 June 2022',
         description:
            'Our team visited Dar Ul Sukoon old age home to spend a day with them. They conducted activities, heard their stories, arranged lunch, flowers and cards for them. At the end an amount of 25000/- was also donated. 120+ seniors were targeted during this visit.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'First Year Guide - Blood Module',
         date: '24 April 2022',
         description:
            'An online seminar was conducted by 2nd year students who shared their opinions and study techniques for the first year students throughout Pakistan.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Girls Chaand Raat ',
         date: '24 April 202',
         description:
            'Earings, bangles, henna were arranged on campus for girls specially in hostels to make Eid easier in the heat of Ramadan.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Khayaal Campaign',
         date: '3 April 2022 - 3 May 2022',
         description:
            'This has been the biggest campaign of the year till now. A total of 9 lakh rupees were utilised. Khayal campaign was to provide relief to the underprivileged in the month of Ramadan. We conducted multiple street iftars as well as ration drives across Karachi. We also donated to many small organisations that were in need as well as individual needy cases that were brought up. During Khayaal Campaign CARE fed iftar to 1000+ people as well as rationing to 100+ families across Karachi.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Ramadan Ambassador Programme',
         date: '3 April 2022 - 3 May 2022',
         description:
            'This program was launched to gather donations for our Khayal Campaign. This ambassadorship program was opened to students from different universities across Karachi. Their tasks were to collect donations and spread awareness of our goals. They were divided in groups with CARE members as group leaders. Each ambassador was awarded a certificate by CARE upon accomplishment of tasks.100+ students across universities in Karachi took part, this also increased CARE’s public reach.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Research Insiders - Introduction to Research Seminar',
         date: '25 March 2022 ',
         description:
            'Our Research department conducted an Online workshop for students across Pakistan with Dr.Asif Qureshi as our host who guided the audience on how to start with their research. Our participant list exceeded 250+ students.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         name: 'Culture Day',
         date: '22 March 2022',
         description:
            'A performance about all provinces and cultures as well as food stalls were arranged by our team to celebrate Pakistan Day and our culture with the entire student body at Dow Ojha',
         images: [],
      },
   ]

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
                           {activity.images.length > 0 && (
                              <Carousel
                                 maw={420}
                                 mx="auto"
                                 withIndicators
                                 height={300}
                              >
                                 {activity.images.map((image, index) => (
                                    <Image
                                       key={index}
                                       radius={'md'}
                                       src={image}
                                       alt="Care"
                                       height={300}
                                       width={420}
                                    />
                                 ))}
                              </Carousel>
                           )}
                        </Grid.Col>
                        <Grid.Col md={6}>
                           <Container>
                              <Title order={3}>{activity.name}</Title>
                              <Title order={4}>{activity.date}</Title>
                              <Text>{activity.description}</Text>
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
