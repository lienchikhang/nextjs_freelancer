'use client';
import React, { createContext, useContext, useState } from 'react';
import { Order, OrderContextType } from '../interfaces/order.interface';

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
    children: React.ReactNode
}

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);

    const createOrder = (orderData: Order) => {
        setOrder(orderData);
    }

    const updateMethod = (method: string) => {
        setOrder((prev) => {
            if (!prev) {
                return null;
            }
            return { ...prev, method: method.toUpperCase() };
        })
    }

    return (
        <OrderContext.Provider value={{ order, createOrder, updateMethod }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within a UserProvider');
    }
    return context;
};