import { Button, Center, Container, Dialog, Text } from '@mantine/core'

type DialogProps = {
   opened: boolean
   close: () => void
   onConfirm: () => void
   text: string
}

export default function ConfirmationDialog(props: DialogProps) {
   const { opened, close, onConfirm, text } = props
   return (
      <Dialog
         radius="sm"
         transition="slide-up"
         transitionDuration={300}
         transitionTimingFunction="ease"
         opened={opened}
         withCloseButton
         onClose={close}
         sx={{
            border: '1px solid #ccc',
         }}
         size="lg"
         position={{
            left: 'calc(50% - 250px)',
            top: 'calc(50% - 250px)',
            bottom: 'calc(50% - 250px)',
            right: 'calc(50% - 250px)',
         }}
      >
         <Container>
            <Center>
               <Text size="sm" mb="xs" weight={500}>
                  {text}
               </Text>
            </Center>

            <Center>
               <Button mr={20} color="green" onClick={onConfirm}>
                  Yes
               </Button>
               <Button color="red" onClick={close}>
                  No
               </Button>
            </Center>
         </Container>
      </Dialog>
   )
}
