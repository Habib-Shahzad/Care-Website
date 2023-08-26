import React, { useEffect, useState } from 'react'
import {
   Box,
   Card,
   Center,
   Container,
   Divider,
   Flex,
   Text,
   Title,
   useMantineTheme,
} from '@mantine/core'
import { useDataContext } from '@/application/providers/ContextProvider'
import NetworkingManager from '@/application/networking'
import Image from 'next/image'
import { shimmer, toBase64 } from '@/application/components/shimmer'

function OurTeam() {
   const [loading, setLoading] = useState(true)
   const { departments, setDepartments } = useDataContext()

   async function listDepartments() {
      if (departments && departments.length) {
         setLoading(false)
         return
      }
      const response = await NetworkingManager.listDepartments()
      setDepartments(response)
      setLoading(false)
   }

   useEffect(() => {
      ;(async () => {
         await listDepartments()
      })()
   }, [])

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
                        {department.members.map((member, index: number) => {
                           return (
                              <Card
                                 key={index}
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
                                          blurDataURL={
                                             'data:image/svg+xml;base64,' +
                                             toBase64(shimmer(200, 200))
                                          }
                                          placeholder="blur"
                                          src={`${member.image.image.filePath}`}
                                          height={200}
                                          width={200}
                                          priority
                                          alt="Team Member"
                                       />
                                    </Center>
                                 </Card.Section>

                                 <Container>
                                    <Center>
                                       <Text weight={500}>{member.name}</Text>
                                    </Center>
                                    <Center>
                                       <Text size="sm">{member.role}</Text>
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
