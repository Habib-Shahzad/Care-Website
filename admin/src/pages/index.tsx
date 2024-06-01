import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function index() {
   const router = useRouter()
   useEffect(() => {
      router.replace('/admin')
   }, [])

   return <></>
}

export default index
