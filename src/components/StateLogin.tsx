"use client";
import React, { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import http from "@/libs/http/http";
import { IS_EMAIL } from "@/libs/constants/check.constants";

interface Props {
    updateState: (number: number) => void;
    closeModal: () => void;
}

interface FormValues {
    email: string;
    password: string;
}

const validateEmail = (value: string) => {
    if (!IS_EMAIL.test(value)) {
        return "Email không đúng định dạng!";
    }
    return true;
};

const ModalStateLogin: React.FC<Props> = ({ updateState, closeModal }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {

        console.log({ formData });
        //call api login
        const rs = await http.post('auth/login', formData);

        if (rs.status == 200) {
            await fetch(`/auth`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rs.content),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log('ressss', res);
                    window.location.reload();
                })
        }

        closeModal();
    };

    useEffect(() => {
        setFocus("email");
    }, []);

    return (
        <div>
            <button onClick={() => updateState(-1)} className="btn-back">
                <ArrowBackIcon />
                Back
            </button>
            <h1>Continue with your email or username</h1>
            <div className="form__wrapper">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Email không được bỏ trống",
                            validate: validateEmail,
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className="modal__form">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        placeholder="name@example.com"
                                        {...register("email")}
                                        className={`${errors.email ? "error" : ""}`}
                                    />
                                </div>
                            );
                        }}
                    />

                    {errors.email && (
                        <p className="px-1 text-sm text-red-500">{errors.email.message}</p>
                    )}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Password không được bỏ trống",
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className="modal__form">
                                    <label htmlFor="">Password</label>
                                    <input type="password" {...register("password")} />
                                </div>
                            );
                        }}
                    />

                    {errors.password && (
                        <p className="px-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}

                    <div className="btn__wrapper">
                        <button
                            className={`${errors.email || errors.password ? "unactive" : "active"
                                }`}
                            type="submit"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalStateLogin;