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

export default function PatientWelfare() {
   const theme = useMantineTheme()

   const blogs = [
      {
         title: 'Self Harm and Suicide',
         description:
            'Suicide and self-harm are major global public health problems with more than 800,000 (suicide) incidents worldwide annually. Seventy-five percent of the global suicides occur in low and middle-income countries (LMICs). Pakistan being one these LMICs has one of the population most vulnerable to suicide and self-harm. More alarmingly there is a lack of information on suicidal behavior. Considering all of the above CARE has decided to engage with the student body opting for various approaches, like conducting workshops and educating the ones who are more likely to indulge in such activities.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },
      {
         title: 'Mental Health',
         description:
            'Maintaining sound mental health is crucial for everyone, from a child to an elderly individual alike.A recent study, the first of its kind in Pakistan, has revealed that a substantial number of school - going adolescents are suffering from symptoms of anxiety and depression.Both of these, and other mental health impairments, can have a debilitating impact on the developing mind of a teenager if not managed properly.Unfortunately, a lack of mental health awareness, negative stigmas around therapy and the paucity of trained professionals in schools and healthcare facilities has led to a growing proportion of our adolescents with their mental health needs unmet and no proper guidance on where to seek help.Addressing these issues is an urgent need of the Pakistani population.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },

      {
         title: 'Personal Hygiene',
         description:
            'Puberty and Self hygiene is an important topic yet, it is something which is not discussed freely in our society. Young individuals are often left to deal with their bodies and the changes they are going through all by themselves, which unfortunately leads to the spread of incorrect information within these children.CARE plans to eradicate myths prevalent among children.Our goal is to educate them about the right ways to deal with puberty and all the changes our body goes through while also maintaining a sense of personal hygiene.CARE plans to do this by having a small workshop with girls and boys of ages close to puberty where we are going to teach them about how to process the effects of puberty.',
         images: [
            'https://swiperjs.com/demos/images/nature-1.jpg',
            'https://swiperjs.com/demos/images/nature-2.jpg',
         ],
      },

      {
         title: 'Racism',
         description:
            'Racism is one of the major global issues that needs to be addressed. It includes differentiating people on the basis of their religion, ethnicity and skin tone.Unfortunately, it is far more common in Pakistan than acknowledged.Based on the survey we conducted, as part of our research, 52% of the respondents were a victim to Racism.This is an unnerving figure.CARE intends to remedy this by conducting seminars and workshop on absolving prejudices and having a spirit of acceptance.CARE shall also provide information material such as brochures.',
         images: [],
      },

      {
         title: 'Child Abuse',
         description:
            'The Child abuse campaign revolves around fighting against the stigma and neglect around child abuse awareness, since 2018 there has been an 11% increase in reports of child abuse incidents. Children in Pakistan are vulnerable to many forms of violence(physical, psychological, sexual) and exploitation, the shocking statistics on child abuse is testimony of the severity of the issue at hand.CARE intends to host online campaigns as well as workshops for children in schools to teach them about what child abuse is and how it can be prevented.',
         images: [],
      },
   ]

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

                  {blog.images.length > 0 && (
                     <Container>
                        <Carousel
                           maw={420}
                           mx="auto"
                           withIndicators
                           height={300}
                        >
                           {blog.images.map((image, index) => (
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
                     </Container>
                  )}
                  <Container size={'sm'}>
                     <Text
                        sx={{
                           color:
                              theme.colorScheme == 'dark' ? 'white' : 'black',
                        }}
                     >
                        {blog.description}
                     </Text>
                  </Container>

                  <Divider mt={30} mb={30} />
               </Box>
            ))}
         </Container>
      </Box>
   )
}
