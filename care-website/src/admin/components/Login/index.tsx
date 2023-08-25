import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { AdminNetworkingManeger as AdminNetworkingManager } from '@/admin/networking'
import { useAdminContext } from '@/admin/providers/AdminContextProvider'
import {
   Anchor,
   Button,
   Center,
   Checkbox,
   Container,
   Group,
   Image,
   Input,
   Paper,
   PasswordInput,
   TextInput,
   Title,
} from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useRouter } from 'next/router'

type FormValues = {
   email: string
   password: string
}

export default function LoginComponent() {
   const [loginMessage, setLoginMessage] = useState('')
   const router = useRouter()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>()

   const { setAdminUserState } = useAdminContext()

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      const response = await AdminNetworkingManager.loginUser(
         data.email,
         data.password
      )

      if (response.success) {
         setAdminUserState(response.data)
         router.push('/admin')
      } else {
         setLoginMessage(response.message)
      }
   }

   const emailValidation = (value: string) => {
      // prettier-ignore
      var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!value.match(mailformat)) {
         return 'Please enter a valid email address'
      }
   }

   return (
      <Container size={420} my={40}>
         <Title
            align="center"
            sx={(theme) => ({
               fontFamily: `Greycliff CF, ${theme.fontFamily}`,
               fontWeight: 900,
            })}
         >
            Welcome back!
         </Title>

         <form onSubmit={handleSubmit(onSubmit)}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
               <TextInput
                  icon={<IconAt />}
                  {...register('email', {
                     required: true,
                     validate: emailValidation,
                  })}
                  label="Email"
                  placeholder="you@mantine.dev"
                  required
               />
               <PasswordInput
                  {...register('password', {
                     required: true,
                  })}
                  label="Password"
                  placeholder="Your password"
                  required
                  mt="md"
               />
               <Group position="apart" mt="lg">
                  <Anchor component="button" size="sm">
                     Forgot password?
                  </Anchor>
               </Group>
               <Button
                  sx={{
                     backgroundColor: 'black',
                  }}
                  type="submit"
                  fullWidth
                  mt="xl"
               >
                  Sign in
               </Button>
            </Paper>
         </form>
      </Container>
   )
}
