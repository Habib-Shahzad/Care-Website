import PrimaryButton from '@/application/components/PrimaryButton'
import Blog from '@/application/models/Blog.model'
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

export default function CommunityOutreach() {
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
   const theme = useMantineTheme()

   function Blog(props: { blog: Blog }) {
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
                     {blog.description}
                  </Text>
               </Box>
            </Grid.Col>
            {blog.images?.length == 0 ? null : (
               <Grid.Col lg={4} md={4} sm={9}>
                  <Carousel maw={420} mx="auto" withIndicators height={300}>
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
                  oneself as merely one individual among many
               </Blockquote>
            </Center>

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
                        <Blog blog={blog} />
                     ) : (
                        <Center>
                           <Blog blog={blog} />
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
                  <PrimaryButton text="Donate Now" onClick={() => {}} />
               </Center>
            </Container>
         </Box>
      </>
   )
}
