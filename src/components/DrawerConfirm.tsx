"use client";
import { Drawer, Skeleton, SwipeableDrawer, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/libs/reduxStore/drawer.slide";
import { IStateDrawer, IStateOrder } from "@/libs/interfaces/state.interface";

interface IState {
    order: {
        id: number,
        price: number,
        name: string,
        image: string,
        level: string,
        jobId: number,
    },
    drawer: {
        isDrawerOpen: boolean,
    }
}

const DrawerComfirm = () => {
    const router = useRouter()
    const selectOrder = useSelector<IState>(state => state.order) as IStateOrder;
    const selectorDrawer = useSelector<IState>(state => state.drawer) as IStateDrawer;

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(selectOrder));
    }, [selectOrder])

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            dispatch(
                toggle(open)
            )
        };


    const handleClose = useCallback(() => {
        dispatch(
            toggle(false)
        );
    }, []);

    const handleConfirm = () => {
        router.push(`/payment/${selectOrder.name}`, {
            scroll: true,
        })
    }

    return (
        <SwipeableDrawer
            anchor={"right"}
            open={(selectorDrawer.isDrawerOpen) as boolean}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <div className="drawer__title">
                <h2>Order options</h2>
                <button onClick={handleClose}>
                    <ClearIcon />
                </button>
            </div>
            <div className="drawer__content">
                <div className="hiredType">
                    <h2>{selectOrder.level}</h2>
                    <p>{selectOrder.price.toLocaleString()}</p>
                </div>
                <p className="desc">
                    {selectOrder.name.replaceAll('-', ' ')}
                </p>
                <div className="quantity">
                    <h2>How often do you need this order?</h2>
                    <div className="quantity__wrapper">
                        <div className="quantity__price">
                            <h2>Single order</h2>
                            {/* {state?.infoOrder?.price ? <p>{(state.infoOrder.price * quantity).toLocaleString()}</p> : <Typography variant="h6">
                                <Skeleton />
                            </Typography>} */}
                        </div>
                    </div>
                    <div className="subscribe__wrapper">
                        <div className="subscribe__title">
                            <h2>Subscribe to Save</h2>
                            <p>Unlock 10% off from 2nd order</p>
                        </div>
                        <div className="subscribe__bottom">
                            <ul>
                                <li>Save time & effort with automatic monthly orders</li>
                                <li>No commitment—cancel anytime</li>
                                <li>Work long-term with your seller for best results</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer__footer">
                <button className="btn" onClick={handleConfirm}>
                    Continue ({selectOrder.price.toLocaleString()})
                </button>
                <p>You won’t be charged yet</p>
            </div>
        </SwipeableDrawer>
    );
};

export default DrawerComfirm;