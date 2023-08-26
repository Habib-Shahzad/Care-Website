export function formatDate(dateString: string) {
   const date = new Date(dateString)

   return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
   })
}

export function formatDate2(dateString: string) {
   const date = new Date(dateString)

   return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   })
}
