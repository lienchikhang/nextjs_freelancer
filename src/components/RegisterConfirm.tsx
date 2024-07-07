import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IData } from "./RegisterSection";

interface Props {
    updateState: (number: number) => void;
    updateData: (data: IData) => void;
    data: IData | null;
}

interface FormValues {
    full_name: string;
}

const ModalStateConfirm: React.FC<Props> = ({
    updateState,
    updateData,
    data,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        control,
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        updateState(1);
        if (data) {
            updateData({
                ...data,
                full_name: formData.full_name,
            });
        }
    };

    return (
        <div>
            <button onClick={() => updateState(-1)} className="btn-back">
                <ArrowBackIcon />
                Back
            </button>
            <h1>Continue with your email</h1>
            <div className="form__wrapper">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="full_name"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Fullname không được bỏ trống",
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <div className="modal__form">
                                    <label htmlFor="">Full name</label>
                                    <input
                                        type="text"
                                        placeholder="john_wick"
                                        {...register("full_name")}
                                    />
                                </div>
                            );
                        }}
                    />

                    {errors.full_name && (
                        <p className="px-1 text-sm text-red-500">
                            {errors.full_name.message}
                        </p>
                    )}

                    <div className="btn__wrapper">
                        <button
                            className={`${errors.full_name ? "unactive" : "active"}`}
                            type="submit"
                        >
                            Create my account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalStateConfirm;