'use client';
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IData } from "./RegisterSection";
import Otp from "./OtpSection";
import { Input, Typography } from "antd";
import type { GetProp } from "antd";
import type { OTPProps } from "antd/es/input/OTP";
import http from "@/libs/http/http";
import { useRouter } from "next/navigation";

interface Props {
    updateState: (number: number) => void;
    notifyError: (mess: string) => void;
    notifySuccess: (mess: string) => void;
    data: IData | null;
}

interface FormValues {
    otp: string;
}

const ModalStateOtp: React.FC<Props> = ({ updateState, data, notifySuccess, notifyError }) => {
    const { Title } = Typography;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();
    const [otp, setCode] = useState("");
    const router = useRouter();

    const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
        console.log("onChange:", text);
        setCode(text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    console.log({ errors });

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        const rs = await http.post('auth/register', {
            email: data?.email,
            password: data?.password,
            fullName: data?.full_name,
            otp: formData.otp,
        });

        console.log('rs in submit regis', rs);

        if (rs.status == 400) {
            //notify
            notifyError(rs.mess);
        }

        if (rs.status == 200) {
            //notify
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);

            notifySuccess(rs.mess);
        }
    };

    return (
        <div>
            <button onClick={() => updateState(-1)} className="btn-back">
                <ArrowBackIcon />
                Back
            </button>
            <h1>Confirm your email</h1>
            <div className="form__wrapper">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="otp"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Otp không được bỏ trống",
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className="modal__form">
                                    <Title level={5}>
                                        Enter the verification code we emailed to: {data?.email}.
                                    </Title>
                                    <Input.OTP
                                        formatter={(str) => str.toUpperCase()}
                                        {...sharedProps}
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <span className="error">{fieldState.error.message}</span>
                                    )}
                                </div>
                            );
                        }}
                    />
                    <div>
                        <p>Don't get OTP? <a href="">Reset now</a></p>
                    </div>
                    <div className="btn__wrapper">
                        <button
                            className={`${errors.otp ? "unactive" : "active"}`}
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalStateOtp;