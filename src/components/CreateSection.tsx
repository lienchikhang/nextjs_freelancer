'use client';
import React, { useEffect, useState } from 'react'
import UploadGigImage from './UploadGigImage'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Textarea, layout } from '@chakra-ui/react';
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import http from '@/libs/http/http';
import { Card, Cascader, Form, Radio, TreeSelect, Space, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';
import { ToastContainer, toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/libs/contexts/user.context';
import { useGigEdit } from '@/libs/contexts/gigEdit.content';

interface Input {
    jobName: string;
    jobDesc: string;
}

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

interface IOption {
    price: number,
    serviceDesc: string,
    serviceBenefit: string,
    deliveryDate: number,
    serviceLevel: string
}


const CreateSection = () => {

    const { gigEdit } = useGigEdit();
    const [form] = Form.useForm();
    const { handleExpired } = useSession();
    const [imageUpload, setImage] = useState<any>(null);
    const { user } = useUser();
    const path = usePathname();
    const route = useRouter();
    const finalSegment = path.split('/')[3];
    const [hasChange, setHasChange] = useState(false);
    const [updatedBase, setUpdatedBase] = useState<any>(null);
    const [updatedService, setUpdatedService] = useState<any[]>([]);
    const [input, setInput] = useState<Input>({
        jobName: gigEdit?.job_name || '',
        jobDesc: gigEdit?.job_desc || '',
    });
    const [types, setTypes] = useState<any[]>([]);
    const [typeValue, setValue] = useState<string | number>(
        gigEdit?.subId || '',
    );
    const [options, setOption] = useState<IOption[]>(
        gigEdit?.Services.map((service) => {
            return {
                price: service.price,
                serviceDesc: service.service_desc,
                serviceBenefit: service.service_benefit,
                deliveryDate: service.delivery_date,
                serviceLevel: service.service_level,
            }
        }) || [
            {
                price: 0,
                serviceDesc: "",
                serviceBenefit: "",
                deliveryDate: 1,
                serviceLevel: "BASIC"
            },
        ]
    )
    const [isMaximumSer, setMaximum] = useState<boolean>(false);
    const [changedBase, setChangeBase] = useState(false);
    const [changedService, setChangeService] = useState(false);
    const [changedImage, setChangeImage] = useState(false);
    const router = useRouter();

    // console.log({ options });
    // console.log({ types });
    // console.log({ input });
    console.log({ gigEdit });
    console.log({ imageUpload });



    const notifySuccess = (mess: string) => {
        toast.success(mess);
    }

    const notifyError = (mess: string) => {
        toast.error(mess);
    }

    const onChange = (newValue: string) => {
        const sub = newValue.split(' ')[1];
        setValue(sub);
    };

    const handleSetImage = (value: any) => {
        setImage(value);
    }

    const handleCreate = async () => {
        //check loggin expired
        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        if (!imageUpload) {
            //notifyx   
            notifyError('Please add image!');
            return;
        }

        const form = new FormData();
        form.append('file', imageUpload);

        const newJob = await http.post('job/add', {
            data: {
                jobName: input.jobName,
                jobDesc: input.jobDesc,
                subId: typeValue,
            },
            services: options,
        });

        if (newJob.status == 201) {

            //delete all form
            const jobImage = await http.upload(`job/upload/${newJob.content.id}`, form);

            if (jobImage.status == 400) {
                notifyError(jobImage.mess);
                return;
            }

            if (jobImage.status == 200) {
                //notify
                notifySuccess(jobImage.mess);

                //navigate to all gigs
                setTimeout(() => {
                    route.push(`/profile/${user?.name}`);
                }, 1000);
            }
        }

    }

    const handleCheckChangedBase = () => {
        let hasChangedBase = false;

        //check gigName, gigDesc, type
        if (input.jobName != gigEdit?.job_name) { hasChangedBase = true; setUpdatedBase({ ...updatedBase, jobName: input.jobName }) }
        if (input.jobDesc != gigEdit?.job_desc) { hasChangedBase = true; setUpdatedBase({ ...updatedBase, jobDesc: input.jobDesc }) }
        if (typeValue != gigEdit?.subId) { hasChangedBase = true; setUpdatedBase({ ...updatedBase, subId: +typeValue }) }

        if (hasChangedBase) setChangeBase(true)
        else setChangeBase(false)
    }

    const handleCheckChangedService = () => {
        gigEdit?.Services.forEach((service, idx: number) => {
            if (service.price != options[idx].price) {
                const cloneUpdatedService = [...updatedService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    price: options[idx].price,
                }
                setUpdatedService(cloneUpdatedService);
            }
        })
    }

    const handleUpdate = async () => {

        if (!gigEdit?.Services) return;

        //case update base (name, desc, subId)
        let finalUpdateBase = {};
        let finalUpdateService: any[] = [];
        let isSuccess = false;
        let formImage = new FormData();

        if (input.jobName != gigEdit?.job_name) { finalUpdateBase = { ...finalUpdateBase, jobName: input.jobName } }
        if (input.jobDesc != gigEdit?.job_desc) { finalUpdateBase = { ...finalUpdateBase, jobDesc: input.jobDesc } }
        if (typeValue != gigEdit?.subId) { finalUpdateBase = { ...finalUpdateBase, subId: +typeValue } }

        //case edit service == gigEdit
        gigEdit.Services.length == options.length && gigEdit?.Services.forEach((service, idx: number) => {
            if (service.price != options[idx].price) {
                const cloneUpdatedService = [...finalUpdateService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    price: +options[idx].price,
                }
                // setUpdatedService(cloneUpdatedService);
                finalUpdateService = [...cloneUpdatedService];
            }

            if (service.service_benefit != options[idx].serviceBenefit) {
                const cloneUpdatedService = [...finalUpdateService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    serviceBenefit: options[idx].serviceBenefit,
                }
                // setUpdatedService(cloneUpdatedService);
                finalUpdateService = [...cloneUpdatedService];
            }

            if (service.service_desc != options[idx].serviceDesc) {
                const cloneUpdatedService = [...finalUpdateService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    serviceDesc: options[idx].serviceDesc,
                }
                // setUpdatedService(cloneUpdatedService);
                finalUpdateService = [...cloneUpdatedService];
            }

            if (service.service_level != options[idx].serviceLevel) {
                const cloneUpdatedService = [...finalUpdateService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    serviceLevel: options[idx].serviceLevel,
                }
                // setUpdatedService(cloneUpdatedService);
                finalUpdateService = [...cloneUpdatedService];
            }

            if (service.delivery_date != options[idx].deliveryDate) {
                const cloneUpdatedService = [...finalUpdateService];
                cloneUpdatedService[idx] = {
                    ...cloneUpdatedService[idx],
                    id: service.id,
                    deliveryDate: +options[idx].deliveryDate,
                }
                // setUpdatedService(cloneUpdatedService);
                finalUpdateService = [...cloneUpdatedService];
            }
        })

        //case gigEdit's service > cur options (delete service)
        if (gigEdit?.Services?.length > options.length) {
            //in gigEdit Services, get the one which is not exist in options
            //after that, call api delete it.
            // set isSuccess = true
        }

        //case gigEdit's service < cur options (add new service)
        if (gigEdit?.Services?.length < options.length) {
            //in options Services, get the one which is not exist in gigEdit
            //after that, call api add it.
            // set isSuccess = true
        }

        console.log('final update base', finalUpdateBase);
        console.log('final update service', finalUpdateService);

        if (finalUpdateBase.hasOwnProperty('jobName')
            || finalUpdateBase.hasOwnProperty('jobDesc')
            || finalUpdateBase.hasOwnProperty('subId')
        ) {
            const rs = await http.patchWithBody(`job/update/${gigEdit?.id}`, finalUpdateBase);

            console.log('rs in update base', rs);
            if (rs.status === 200) {
                isSuccess = true;
            }
        }

        if (finalUpdateService.length) {

            const promiseUpdateServices = finalUpdateService.map(async (upSer) => await http.patchWithBody(`service/update/${upSer.id}`, upSer));

            const rs = await Promise.all(promiseUpdateServices);

            console.log('rs in final update service', rs);

            const isUpdateSuccess = rs.every((r) => r.status === 200);

            if (isUpdateSuccess) isSuccess = true;
            else isSuccess = false;
        }

        //case update image
        if (imageUpload) {
            formImage.append('file', imageUpload)

            const rs = await http.upload(`job/upload/${gigEdit.id}`, formImage);

            console.log('rs in update upload image', rs);

            if (rs.status === 200) isSuccess = true;
        }

        if (isSuccess) {
            //notify
            notifySuccess('Update successfully!');

            //redirect
            setTimeout(() => {
                router.push(`/profile/${user?.name}`);
            }, 1000)
        }
    }

    const fetching = async () => {
        const rs = await http.get('type/get-all');
        if (rs.status == 200) setTypes(rs.content);
    }

    const onCasChange = (value: any, selectedOptions: any) => {
        handleCheckChangedBase();
        // Extract the selected node information
        const isChildNode = selectedOptions?.length === 3; // We want only to select a leaf node
        if (isChildNode) {
            console.log({ value, selectedOptions });
            // const sub = value.split(' ')[1];
            setValue(value[2].split(' ')[1]);
        } else {
            // If not a leaf node, reset the selection
            setValue('');
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (finalSegment == 'edit') {
            setChangeBase(true);
            setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
        } else {
            setChangeBase(false);
            setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
        }
    }

    useEffect(() => {
        setUpdatedBase({ ...updatedBase, })
    }, [])

    const isErrorGigName = input.jobName === '';
    const isErrorGigDesc = input.jobDesc === '';

    useEffect(() => {
        fetching();
    }, [])

    return (
        <React.Fragment>
            <ToastContainer />
            <div className='create__section'>
                <UploadGigImage handleSetImage={handleSetImage} />
                <div className='gigInfo'>
                    <div className='gigForm'>
                        <FormControl isInvalid={isErrorGigName}>
                            <FormLabel>Gig Name</FormLabel>
                            <Input type='text' name='jobName' value={input.jobName.replaceAll('-', ' ')} onChange={handleInputChange} />
                            {!isErrorGigName ? (
                                <FormHelperText>
                                    Enter the email you'd like to receive the newsletter on.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </div>
                    <div className="gigForm">
                        <FormControl isInvalid={isErrorGigDesc}>
                            <FormLabel>Gig Description</FormLabel>
                            <Textarea name='jobDesc' value={input.jobDesc} onChange={(e) => setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value })} />
                            {!isErrorGigDesc ? (
                                <FormHelperText>
                                    Enter the email you'd like to receive the newsletter on.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </div>
                    <div className='gigSelect'>
                        <h2>Gig type:</h2>
                        <Cascader
                            style={{ width: '100%' }}
                            defaultValue={
                                [
                                    `type ${gigEdit?.typeId}`,
                                    `child ${gigEdit?.childTypeId}`,
                                    `sub ${gigEdit?.subId}`,
                                ]
                            }
                            options={types.map((type: any) => {
                                return {
                                    value: `type ${type.id}`,
                                    label: type.type_name,
                                    selectable: false,
                                    children: type.ChildTypes.map((child: any) => {
                                        return {
                                            value: `child ${child.id}`,
                                            label: child.child_type_name,
                                            selectable: false,
                                            children: child.Subs.map((sub: any) => {
                                                return {
                                                    value: `sub ${sub.id}`,
                                                    label: sub.sub_name,

                                                }
                                            })
                                        }
                                    })
                                }
                            })}
                            onChange={onCasChange}
                            multiple={false}
                            maxTagCount="responsive"
                        />
                    </div>
                </div>
                <div className='gigService'>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        form={form}
                        name="dynamic_form_complex"
                        style={{ width: '100%' }}
                        autoComplete="off"
                        initialValues={{ items: gigEdit?.Services }}
                    >
                        <Form.List name="items">
                            {(fields, { add, remove }) => {
                                // console.log({ fields });
                                return <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                    {fields.map((field) => {
                                        return <Card
                                            size="small"
                                            title={`Service ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        console.log('key', field.name);
                                                        //delete option
                                                        // const curOps  = [...options];
                                                        // let deleted = options[field.key];
                                                        options.splice(field.name, 1);

                                                        //update service level
                                                        const newOtps = options.map((opt, idx) => {
                                                            return {
                                                                ...opt,
                                                                serviceLevel: idx == 0 ? 'BASIC' : idx == 1 ? 'ADVANCE' : 'PREMIUM'
                                                            }
                                                        });

                                                        console.log('after map', newOtps);
                                                        setOption([...newOtps]);
                                                        remove(field.name);

                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item label="Service Description" name={[field.name, 'serviceDesc']}>
                                                <FormControl isInvalid={options[field.name]?.serviceDesc === ''}>
                                                    <Textarea name='serviceDesc' value={options[field.name]?.serviceDesc} onChange={(e) => {
                                                        handleCheckChangedService();
                                                        const updatedOptions = [...options];
                                                        updatedOptions[field.name] = {
                                                            ...updatedOptions[field.name],
                                                            [e.currentTarget.name]: e.currentTarget.value
                                                        };
                                                        setOption(updatedOptions);
                                                    }} />
                                                    {!options[field.name]?.serviceDesc ? (
                                                        <FormHelperText>
                                                            Enter service description.
                                                        </FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Service description is required.</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            </Form.Item>

                                            <Form.Item label="Service price" name={[field.name, 'price']}>
                                                <FormControl isInvalid={options[field.name]?.price === 0 || options[field.name]?.price <= 0}>
                                                    <Input type='number' name='price' value={options[field.name]?.price} onChange={(e) => {
                                                        handleCheckChangedService();
                                                        const updatedOptions = [...options];
                                                        updatedOptions[field.name] = {
                                                            ...updatedOptions[field.name],
                                                            [e.currentTarget.name]: e.currentTarget.value
                                                        };
                                                        setOption(updatedOptions);
                                                    }} />
                                                    {!options[field.name]?.price || options[field.name]?.price > 0 ? (
                                                        <FormHelperText>
                                                            Enter service price you'd like to receive.
                                                        </FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Service price is required.</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            </Form.Item>

                                            <Form.Item label="Service benefit" name={[field.name, 'serviceBenefit']}>
                                                <FormControl isInvalid={options[field.name]?.serviceBenefit === ''}>
                                                    <Textarea name='serviceBenefit' value={options[field.name]?.serviceBenefit} onChange={(e) => {
                                                        handleCheckChangedService();
                                                        const updatedOptions = [...options];
                                                        updatedOptions[field.name] = {
                                                            ...updatedOptions[field.name],
                                                            [e.currentTarget.name]: e.currentTarget.value
                                                        };
                                                        setOption(updatedOptions);
                                                    }} />
                                                    {!options[field.name]?.serviceBenefit ? (
                                                        <FormHelperText>
                                                            Enter service benefit you'd like to give.
                                                        </FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Service benefit is required.</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            </Form.Item>

                                            <Form.Item label="Service level" name={[field.name, 'serviceLevel']}>
                                                <FormControl isInvalid={options[field.name]?.serviceLevel === ''}>
                                                    <Select name='serviceLevel' placeholder={
                                                        (field.name == 0) ? 'BASIC' : (field.name == 1) ? 'ADVANCED' : 'PREMIUM'
                                                    } value={
                                                        (field.name == 0) ? 'BASIC' : (field.name == 1) ? 'ADVANCED' : 'PREMIUM'
                                                    }
                                                    //  onChange={(e) => {
                                                    //     const updatedOptions = [...options];
                                                    //     updatedOptions[field.name] = {
                                                    //         ...updatedOptions[field.name],
                                                    //         [e.currentTarget.name]: e.currentTarget.value
                                                    //     };
                                                    //     setOption(updatedOptions);
                                                    // }} 
                                                    >
                                                        {/* {(field.name == 0) && <option value={'BASIC'}>BASIC</option>}
                                                {(field.name == 1) && <option value={'ADVANCED'}>ADVANCED</option>}
                                                {(field.name == 2) && <option value={'PREMIUM'}>PREMIUM</option>} */}

                                                    </Select>
                                                    {!options[field.name]?.serviceLevel ? (
                                                        <FormHelperText>
                                                            Enter delivery date.
                                                        </FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Delivery date is required.</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            </Form.Item>

                                            <Form.Item label="Delivery date" name={[field.name, 'deliveryDate']}>
                                                <FormControl isInvalid={options[field.name]?.deliveryDate === 0}>

                                                    <Select name='deliveryDate' placeholder='Select date' defaultValue={options[field.name].deliveryDate} onChange={(e) => {
                                                        handleCheckChangedService();
                                                        const updatedOptions = [...options];
                                                        updatedOptions[field.name] = {
                                                            ...updatedOptions[field.name],
                                                            [e.currentTarget.name]: e.currentTarget.value
                                                        };
                                                        setOption(updatedOptions);
                                                    }} >
                                                        <option value='1'>Express 24H</option>
                                                        <option value='3'>Up to 3 days</option>
                                                        <option value='7'>Up to 7 days</option>
                                                        <option value=''>Anytime</option>
                                                    </Select>
                                                    {!options[field.name]?.deliveryDate ? (
                                                        <FormHelperText>
                                                            Enter delivery date.
                                                        </FormHelperText>
                                                    ) : (
                                                        <FormErrorMessage>Delivery date is required.</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            </Form.Item>


                                        </Card>
                                    })}

                                    <Button type="dashed" disabled={fields.length === 3} onClick={() => {
                                        console.log('btn click', fields.length);
                                        if (fields.length + 1 === 3) {
                                            setMaximum(true);
                                        }
                                        if (fields.length === 3) {
                                            return;
                                        }
                                        add();
                                        setOption([...options, {
                                            price: 0,
                                            serviceDesc: "",
                                            serviceBenefit: "",
                                            deliveryDate: 1,
                                            serviceLevel: (fields.length + 1 == 1) ? 'BASIC' : (fields.length + 1 == 2) ? 'ADVANCED' : 'PREMIUM'
                                        },])
                                    }} block>
                                        + Add Item
                                    </Button>
                                </div>
                            }}
                        </Form.List>
                    </Form>

                    {finalSegment.toLowerCase() == 'create' && <button className='final-btn' onClick={handleCreate}>Create Gig</button>}
                    {finalSegment.toLowerCase() == 'edit' && <button className={`final-btn ${hasChange ? 'active' : ''}`} onClick={handleUpdate}>Update Gig</button>}
                </div>
            </div >
        </React.Fragment>
    )
}

export default CreateSection