'use client';
import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import { useSession } from '@/libs/contexts/session.context';
import { useRouter } from 'next/navigation';

const SessionExpired = () => {
    const { isExpired, handleExpired } = useSession();
    const { onClose } = useDisclosure();
    const cancelRef = React.useRef(null);
    const router = useRouter();

    const handleReject = () => {
        handleExpired(false);
    }

    const handleAccept = () => {
        handleExpired(false);
        router.push('/auth/login');
    }
    return (
        <AlertDialog
            isOpen={isExpired}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Session Expired
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Please login to do this action
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleReject}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleAccept} ml={3}>
                            Login
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default SessionExpired