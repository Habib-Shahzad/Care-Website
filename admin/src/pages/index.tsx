export const getServerSideProps = async () => {
   return {
      redirect: {
         destination: '/admin',
         permanent: false,
      },
   }
}

function index() {
   return <></>
}

export default index
