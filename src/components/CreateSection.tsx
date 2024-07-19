'use client';
import React, { useState } from 'react'
import UploadGigImage from './UploadGigImage'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

interface Input {
    jobName: string;
    jobDesc: string;
}

const CreateSection = () => {

    const [input, setInput] = useState<Input>({
        jobName: '',
        jobDesc: '',
    })

    console.log({ input })

    const handleInputChange = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const isErrorGigName = input.jobName === '';
    const isErrorGigDesc = input.jobDesc === '';

    return (
        <React.Fragment>
            <UploadGigImage />
            <div className='gigInfo'>
                <FormControl isInvalid={isErrorGigName}>
                    <FormLabel>Gig Name</FormLabel>
                    <Input type='text' name='jobName' value={input.jobName} onChange={handleInputChange} />
                    {!isErrorGigName ? (
                        <FormHelperText>
                            Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={isErrorGigDesc}>
                    <FormLabel>Gig Description</FormLabel>
                    <Input type='text' name='jobDesc' value={input.jobDesc} onChange={handleInputChange} />
                    {!isErrorGigDesc ? (
                        <FormHelperText>
                            Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                </FormControl>
            </div>
        </React.Fragment>
    )
}

export default CreateSection