'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { SessionContextType } from '../interfaces/session.interface';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const SessionProvider: FC<UserProviderProps> = ({ children }) => {
    const [isExpired, setExpired] = useState<boolean>(false);

    const handleExpired = (data: boolean) => {
        setExpired(data);
    };


    return (
        <SessionContext.Provider value={{ isExpired, handleExpired }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a UserProvider');
    }
    return context;
};