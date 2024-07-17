"use client";
import React, { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import http from "@/libs/http/http";
import { IS_EMAIL } from "@/libs/constants/check.constants";
import { User } from "@/libs/interfaces/user.interface";
import { useUser } from "@/libs/contexts/user.context";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";

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
    const { login, logout, user } = useUser();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();

    useEffect(() => {
        if (user) {
            logout();
            localStorage.removeItem('root:user');
        }
        setFocus("email");
        // handleLogout()
    }, []);

    const notifyError = (mess: string) => toast.error(mess, {
        position: "bottom-center",
        transition: Flip,
    });

    const notifySuccess = (mess: string) => toast.success(mess, {
        position: "bottom-center",
        transition: Flip,
    });

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {

        //call api login
        const rs = await http.post('auth/login', formData);

        //email or password is not valid
        if (rs.status == 502) {
            notifyError(rs.mess);
        }

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
            });

            notifySuccess(rs.mess);

            router.push('/');
        }
    };

    const handleLoginFacebook = async () => {
        window.location.href = 'http://localhost:8080/auth/facebook/login'
    }

    const handleLoginGoogle = async () => {
        window.location.href = 'http://localhost:8080/auth/google/login'
    }

    const responseFacebook = (response: any) => {
        console.log(response);
    }

    return (
        <div className="login__wrapper">
            <ToastContainer position="top-right" />
            <h1>Welcome back!</h1>
            <h2>Continue with your email or username</h2>
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

                    <p>Don’t have an account? <Link className="link__join" href="/auth/register">Join now</Link></p>
                    <div className="btn__wrapper">
                        <button className="google" onClick={handleLoginGoogle} type="button">
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </div>
                    <p className="breakline">OR</p>
                    <div className="btn__wrapper">
                        <button className="apple">
                            <AppleIcon />
                            Apple
                        </button>
                        <button className="facebook" onClick={handleLoginFacebook} type="button">
                            <FacebookIcon /> Facebook
                            {/* <span>Facebook</span> */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginSection;