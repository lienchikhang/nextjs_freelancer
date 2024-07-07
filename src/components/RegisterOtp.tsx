import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IData } from "./RegisterSection";
import Otp from "./OtpSection";
import { Input, Typography } from "antd";
import type { GetProp } from "antd";
import type { OTPProps } from "antd/es/input/OTP";

interface Props {
    updateState: (number: number) => void;
    data: IData | null;
}

interface FormValues {
    otp: string;
}

const ModalStateOtp: React.FC<Props> = ({ updateState, data }) => {
    const { Title } = Typography;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();
    const [code, setCode] = useState("");

    const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
        console.log("onChange:", text);
        setCode(text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        //call api check otp valid (otp was saved at redis)
        // if invalid => type again (setText)
        // if valid => call api register
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
                                    />
                                </div>
                            );
                        }}
                    />

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