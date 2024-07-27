'use client';
import React, { createContext, useContext, useState } from 'react';
import { Order, OrderContextType } from '../interfaces/order.interface';
import { GigEdit, GigEditContextType } from '../interfaces/gigEdit.interface';

const GigEditContext = createContext<GigEditContextType | undefined>(undefined);

interface OrderProviderProps {
    children: React.ReactNode
}

const GigEditProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [gigEdit, setGig] = useState<GigEdit | null>(null);

    const setGigEdit = (orderData: GigEdit) => {
        setGig(orderData);
    }


    return (
        <GigEditContext.Provider value={{ gigEdit, setGigEdit }}>
            {children}
        </GigEditContext.Provider>
    )
}

export default GigEditProvider;

export const useGigEdit = (): GigEditContextType => {
    const context = useContext(GigEditContext);
    if (context === undefined) {
        throw new Error('gigEdit must be used within a GigEditProvider');
    }
    return context;
};