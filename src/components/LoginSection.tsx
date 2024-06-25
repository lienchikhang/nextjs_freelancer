"use client";
import React, { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import http from "@/libs/http/http";
import { IS_EMAIL } from "@/libs/constants/check.constants";
import { User } from "@/libs/interfaces/user.interface";
import { useUser } from "@/libs/contexts/user.context";

interface Props { }

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

const LoginSection: React.FC<Props> = () => {
    const { login } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {

        //call api login
        const rs = await http.post('auth/login', formData);

        if (rs.status == 200) {
            const userData: User = {
                name: rs.content.user.full_name,
                avatar: rs.content.user.avatar,
                email: rs.content.user.email,
            };

            localStorage.setItem('root::user', JSON.stringify(userData));
            login(userData);

            await fetch(`/api/auth`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rs.content),
            })
        }
    };

    useEffect(() => {
        setFocus("email");
    }, []);

    return (
        <div className="login__wrapper">
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

export default LoginSection;