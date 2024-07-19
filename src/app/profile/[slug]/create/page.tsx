import React from 'react';
import '../../../../styles/createPage.scss';
import UploadGigImage from '@/components/UploadGigImage';
import CreateSection from '@/components/CreateSection';
import { ChakraProvider } from '@chakra-ui/react';

const CreatePage = () => {
    return (
        <div className='createPage__wrapper'>
            <div className='createPage__heading'>
                <h1>Create New Gig</h1>
            </div>
            <div className='createPage__body'>
                <ChakraProvider>
                    <CreateSection />
                </ChakraProvider>
            </div>
        </div>
    )
}

export default CreatePage