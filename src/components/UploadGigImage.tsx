'use client';
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

interface Props {
    handleSetImage: (value: any) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadGigImage: React.FC<Props> = ({ handleSetImage }) => {


    const [img, setPlaceImg] = useState('');

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        async onChange(info) {
            console.log(info)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully.`);
                const file = info?.file?.originFileObj;
                if (file) {
                    handleSetImage(file);
                    setPlaceImg(await getBase64(file));
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    console.log({ img })

    return (
        <div className='gigImage'>
            <Dragger {...props}>
                {
                    !img ? <React.Fragment>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </React.Fragment> : <img src={img} />
                }
            </Dragger>
        </div>
    )
}

export default UploadGigImage