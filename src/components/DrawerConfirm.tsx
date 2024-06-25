"use client";
import { SwipeableDrawer } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";
import { useOrder } from "@/libs/contexts/order.context";
import { useDrawer } from "@/libs/contexts/drawerConfirm.context";


const DrawerComfirm = () => {
    const router = useRouter()
    const { order } = useOrder();
    const { isOpen, toggleDrawer } = useDrawer();

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order])

    const toggleDrawerBase =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            toggleDrawer(open);
        };

    const handleClose = useCallback(() => {
        toggleDrawer(false);
    }, []);

    const handleConfirm = () => {
        router.push(`/payment/${order?.name}`, {
            scroll: true,
        })
    }

    if (!order) {
        return <h1>Oops! There is something wrong here. Please try again</h1>
    }

    return (
        <SwipeableDrawer
            anchor={"right"}
            open={isOpen}
            onClose={toggleDrawerBase(false)}
            onOpen={toggleDrawerBase(true)}
        >
            <div className="drawer__title">
                <h2>Order options</h2>
                <button onClick={handleClose}>
                    <ClearIcon />
                </button>
            </div>
            <div className="drawer__content">
                <div className="hiredType">
                    <h2>{order?.level}</h2>
                    <p>{order?.price.toLocaleString()}</p>
                </div>
                <p className="desc">
                    {order?.name.replaceAll('-', ' ')}
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
                    Continue ({order?.price.toLocaleString()})
                </button>
                <p>You won’t be charged yet</p>
            </div>
        </SwipeableDrawer>
    );
};

export default DrawerComfirm;