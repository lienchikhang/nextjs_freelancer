"use client";
import React from "react";
import { Flex, Input, Typography } from "antd";
import type { GetProp } from "antd";
import type { OTPProps } from "antd/es/input/OTP";

const { Title } = Typography;

interface Props {
    email: string | null;
}

const Otp: React.FC<Props> = ({ email }) => {
    const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
        console.log("onChange:", text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    return (
        <div>
            <Title level={5}>
                Enter the verification code we emailed to: {email}.
            </Title>
            <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
        </div>
    );
};

export default Otp;