'use client';
import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import { DrawerConfirmContextType } from '../interfaces/drawerConfirm.interface';

const DrawerConfirmContext = createContext<DrawerConfirmContextType | undefined>(undefined);

interface DrawerConfirmProviderProps {
    children: React.ReactNode
}

const DrawerProvider: React.FC<DrawerConfirmProviderProps> = ({ children }) => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleDrawer = (toggle: boolean) => {
        setOpen(toggle);
    }

    return (
        <DrawerConfirmContext.Provider value={{ isOpen, toggleDrawer }}>
            {children}
        </DrawerConfirmContext.Provider>
    )
}

export default DrawerProvider;

export const useDrawer = (): DrawerConfirmContextType => {
    const context = useContext(DrawerConfirmContext);
    if (context === undefined) {
        throw new Error('useDrawer must be used within a UserProvider');
    }
    return context;
};