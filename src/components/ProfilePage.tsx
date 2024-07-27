'use client';
import React, { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserGig from './UserGig';
import RegisterSeller from './RegisterSeller';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, useDisclosure } from '@chakra-ui/react';
import SessionExpired from './SessionExpired';
import http from '@/libs/http/http';
import { useRouter } from 'next/navigation';

interface IResponse {
    status: number,
    mess: string,
    content: any,
    date: Date,
}

interface Props {
    data: any[]
}

interface IGig {
    id: number,
    job_image: string,
    job_name: string,
    job_desc: string,
    Services: {
        id: number,
        price: number,
        serviceDesc: string,
        serviceBenefit: string,
        serviceLevel: string,
        deliveryDate: 0,
    }[],
}

const ProfilePage: React.FC<Props> = ({ data }) => {

    console.log('data in profilepaGE', data);

    const [gigs, setGigs] = useState<IGig[]>([]);
    const [isOpenAlert, setOpenAlert] = useState(false);
    const [deletedOne, setDeletedOne] = useState(0);
    useEffect(() => {
        setGigs(data[3].content);
    }, [])
    const cancelRef = React.useRef(null);
    const notifySuccess = (mess: string) => toast.success(mess, {
        position: "bottom-center",
        transition: Flip,
    });

    const handleOpenAlert = (gigId: number) => {
        setOpenAlert(true);
        setDeletedOne(gigId);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleDelete = async () => {
        if (deletedOne) {
            const rs = await http.patch(`job/delete/${deletedOne}`);

            // console.log('rss in delete gig', rs);
            if (rs.status == 200) {
                notifySuccess(rs.mess);
                //remove gig
                const newGigs = gigs.filter((gig: IGig) => {
                    return gig.id != deletedOne;
                });

                setGigs(newGigs);
            }
        }
    }

    if (data[0]?.error
        || data[1]?.error
        || data[2]?.error
        || data[3]?.error
        || data[0].status == 404
        || data[1].status == 404
        || data[2].status == 404
        || data[3].status == 404
    ) {
        return <div className="gig__wrapper">
            <h1>Something is wrong!</h1>
        </div>
    }

    return (
        <React.Fragment>
            <ChakraProvider>
                <AlertDialog
                    isOpen={isOpenAlert}
                    leastDestructiveRef={cancelRef}
                    onClose={handleCloseAlert}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Customer
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure deleting {deletedOne}? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={handleCloseAlert}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={() => {
                                    handleCloseAlert();
                                    //delete
                                    handleDelete();
                                }} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                <SessionExpired />
            </ChakraProvider>
            <ToastContainer />
            <div className='profile__wrapper'>
                <div className='profile__main'>
                    <div className='profile__info'>
                        <ProfileInfo data={data[0]} skill={data[1]} certi={data[2]} />
                    </div>
                    <div className='profile__jobList'>
                        <div className='jobList__tile'>
                            <h2>Your job</h2>
                        </div>
                        {data[3].status == 403 && <RegisterSeller notifySuccess={notifySuccess} />}
                        {data[3].status == 200 && <UserGig data={gigs} handleDelete={handleOpenAlert} />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfilePage