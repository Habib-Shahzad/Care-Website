import React, { useEffect, useState } from 'react'
import {
   Box,
   Card,
   Center,
   Container,
   Divider,
   Flex,
   Image,
   Text,
   Title,
   useMantineTheme,
} from '@mantine/core'

function OurTeam() {
   const departments = [
      {
         name: 'Care Leadership',

         members: [
            {
               name: 'Wajiha Asim',
               text: 'President',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Muhammad Mustafa',
               text: 'Gen Sec',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Muhammad Ali Amir',
               text: 'Director of Research and Patient Welfare',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Rahmah Ashar Sakrani',
               text: 'Director of Finance',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Namrata Panjwani',
               text: 'Director of Public Relations and Ambassadors',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Abiha Khurram',
               text: 'Director of Media and Marketing',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Rida Batool',
               text: 'Director of World Health Organisation',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Moiz Noman',
               text: 'Director of Event Planning',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },

      {
         name: 'Department Of Public Relations',

         members: [
            {
               name: 'Ahmad Anwar',
               text: 'Head of Public Relations',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Palwasha Kakkar',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Mufize Firoz Vohra',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Qazi Akhtar',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },

      {
         name: 'Department of Research and Development',

         members: [
            {
               name: 'Muhammad Areeb Syed',
               text: 'Head of Research and Development',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Bilal Syed',
               text: 'Head of Public Relations',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Tayyab Zahoor',
               text: 'Head of Public Relations',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Yumna Khabir',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Reeha Amjad',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of Patient Welfare',

         members: [
            {
               name: 'Mahavash Nadeem',
               text: 'Head of Patient Welfare',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Syed Haidar Jalal',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Mahnoor Rehan',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of World Health Organisation',

         members: [
            {
               name: 'Moeez Ibrahim',
               text: 'Head of World Health Organisation',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Haadya Khan',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Syeda Javeria',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Zara Jamil',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of Community Outreach',

         members: [
            {
               name: 'Moiz Noman',
               text: 'Head of Community Outreach',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Saljok Ali',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Arfa Khan',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Jenelle Alvares',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Zara Ahmed Qureshi',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of Event Planning',

         members: [
            {
               name: 'Haniah Mahboob',
               text: 'Head of Event Planning',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Abiha Raza',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Atiqa Fatima',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Ahsan Zaheer',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Khubaib Basit',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Anusha Amir',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Ali Rizvi',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Areeka Irfan',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of Finance',

         members: [
            {
               name: 'Bilal Khan',
               text: 'Head of Finance',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Rana Zargham Asif',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Muhammad Haseeb Shoaib',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Muhammad Azzam',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department of Media and Marketing',

         members: [
            {
               name: 'Areeba Nisa',
               text: 'Head of Media and Marketing',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Fahad Farooq',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Arooba Sheikh',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Yasir Raza',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Maryum Mubbashir',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Anas Aijaz',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
      {
         name: 'Department if Human Resources',

         members: [
            {
               name: 'Syed Wijdan Ali',
               text: 'Head of Human Resources',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Eesha Nadeem',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Abdur Rehman',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
            {
               name: 'Khizar Saeed',
               text: 'Member',
               image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            },
         ],
      },
   ]

   //    const [departments, setDepartments] = useState([])

   //    useEffect(() => {
   //       ;(async () => {
   //          const response = await fetch(`${api}/department/table-data`, {
   //             method: 'GET',
   //             headers: {
   //                'Content-Type': 'application/json',
   //             },
   //             credentials: 'include',
   //             withCredentials: true,
   //          })
   //          const content = await response.json()
   //          setDepartments(content.data)
   //       })()
   //    }, [])

   const theme = useMantineTheme()

   return (
      <Box>
         <Container mb={30}>
            <Center>
               <Title order={2} className="dark-pink">
                  Meet The Team
               </Title>
            </Center>
            <Text
               sx={{
                  textAlign: 'center',
               }}
            >
               CARE, a community & nonprofit organization dedicated to promoting
               well-being and health, encompasses various departments to ensure
               effective operations.
            </Text>
         </Container>

         <div className="margin-global-top-3" />

         {departments.map((department, index) => {
            return (
               <Container key={index} className="box-container">
                  <Box className="box" key={index}>
                     <Center>
                        <Title
                           mb={20}
                           sx={{
                              textAlign: 'center',
                           }}
                           order={3}
                           className="dark-pink"
                        >
                           {department.name}
                        </Title>
                     </Center>

                     <Flex
                        mih={50}
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                     >
                        {department.members.map((member, index) => {
                           const ok = {
                              ...member,

                              role: 'Hello',
                           }
                           return (
                              <Card
                                 sx={{
                                    background:
                                       theme.colorScheme == 'dark'
                                          ? theme.colors.dark[7]
                                          : '#f8bdd6',
                                 }}
                                 p="xl"
                                 shadow="sm"
                                 padding="lg"
                                 radius="md"
                                 withBorder
                              >
                                 <Card.Section>
                                    <Center>
                                       <Image
                                          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                          height={160}
                                          width={160}
                                          alt="Norway"
                                       />
                                    </Center>
                                 </Card.Section>

                                 <Container>
                                    <Text weight={500}>{ok.name}</Text>
                                    <Center>
                                       <Text size="sm">{ok.role}</Text>
                                    </Center>
                                 </Container>
                              </Card>
                           )
                        })}
                     </Flex>
                  </Box>
                  <Divider mt={30} mb={30} />
               </Container>
            )
         })}
      </Box>
   )
}

export default OurTeam
