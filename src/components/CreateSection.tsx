'use client';
import React, { useEffect, useState } from 'react'
import UploadGigImage from './UploadGigImage'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, layout } from '@chakra-ui/react';
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import http from '@/libs/http/http';
import { Card, Cascader, Form, Radio, TreeSelect, Space, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface Input {
    jobName: string;
    jobDesc: string;
}

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}


const CreateSection = () => {

    const [input, setInput] = useState<Input>({
        jobName: '',
        jobDesc: '',
    });
    const [types, setTypes] = useState<any[]>([]);
    const [typeValue, setValue] = useState<string>();
    const [options, setOption] = useState([
        {
            price: 0,
            serviceDesc: "",
            serviceBenefit: "",
            deliveryDate: 1,
            serviceLevel: ""
        },
    ])
    const [form] = Form.useForm();

    const onChange = (newValue: string) => {
        const sub = newValue.split(' ')[1];
        setValue(sub);
    };

    const fetching = async () => {
        const rs = await http.get('type/get-all');

        console.log('rs in CreateSection', rs);

        if (rs.status == 200) setTypes(rs.content);
    }

    const onCasChange = (value: any, selectedOptions: any) => {
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

    console.log({ input, typeValue, options });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value })

    const isErrorGigName = input.jobName === '';
    const isErrorGigDesc = input.jobDesc === '';

    useEffect(() => {
        fetching();
    }, [])

    return (
        <React.Fragment>
            <UploadGigImage />
            <div className='gigInfo'>
                <div className='gigForm'>
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
                </div>
                <div className="gigForm">
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
                <div className='gigSelect'>
                    <h2>Gig type:</h2>
                    <Cascader
                        style={{ width: '100%' }}
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
                    initialValues={{ items: [{}] }}
                >
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Service ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item label="Service Description" name={[field.name, 'serviceDesc']}>
                                            <FormControl isInvalid={isErrorGigDesc}>
                                                <Input type='text' name='serviceDesc' value={options[field.key].serviceDesc} onChange={(e) => {
                                                    const updatedOptions = [...options];
                                                    updatedOptions[field.key] = {
                                                        ...updatedOptions[field.key],
                                                        [e.currentTarget.name]: e.currentTarget.value
                                                    };
                                                    setOption(updatedOptions);
                                                }} />
                                                {!isErrorGigDesc ? (
                                                    <FormHelperText>
                                                        Enter the email you'd like to receive the newsletter on.
                                                    </FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                                )}
                                            </FormControl>
                                        </Form.Item>

                                        <Form.Item label="Service price" name={[field.name, 'price']}>
                                            <FormControl isInvalid={isErrorGigDesc}>
                                                <Input type='number' name='price' value={options[field.key].price} onChange={(e) => {
                                                    const updatedOptions = [...options];
                                                    updatedOptions[field.key] = {
                                                        ...updatedOptions[field.key],
                                                        [e.currentTarget.name]: e.currentTarget.value
                                                    };
                                                    setOption(updatedOptions);
                                                }} />
                                                {!isErrorGigDesc ? (
                                                    <FormHelperText>
                                                        Enter the email you'd like to receive the newsletter on.
                                                    </FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                                )}
                                            </FormControl>
                                        </Form.Item>

                                        <Form.Item label="Service benefit" name={[field.name, 'serviceBenefit']}>
                                            <FormControl isInvalid={isErrorGigDesc}>
                                                <Input type='text' name='serviceBenefit' value={options[field.key].serviceBenefit} onChange={(e) => {
                                                    const updatedOptions = [...options];
                                                    updatedOptions[field.key] = {
                                                        ...updatedOptions[field.key],
                                                        [e.currentTarget.name]: e.currentTarget.value
                                                    };
                                                    setOption(updatedOptions);
                                                }} />
                                                {!isErrorGigDesc ? (
                                                    <FormHelperText>
                                                        Enter the email you'd like to receive the newsletter on.
                                                    </FormHelperText>
                                                ) : (
                                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                                )}
                                            </FormControl>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button type="dashed" onClick={() => {
                                    if (fields.length === 3) return;
                                    add();
                                    setOption([...options, {
                                        price: 0,
                                        serviceDesc: "",
                                        serviceBenefit: "",
                                        deliveryDate: 1,
                                        serviceLevel: ""
                                    },])
                                }} block>
                                    + Add Item
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form>
            </div>
        </React.Fragment >
    )
}

export default CreateSection