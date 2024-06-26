'use client';
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { User, UserContextType } from '../interfaces/user.interface';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        setUser(null);
        const rs = await fetch('http://localhost:8080/auth/logout', {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
        }).then((res) => res.json());
        if (rs.status == 200) {
            localStorage.removeItem('root::user');
            //all to server to clearCookie
            await fetch('/api/auth', {
                method: 'DELETE',
            });
        }

    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};