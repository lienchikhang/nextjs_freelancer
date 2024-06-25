export interface User {
    name: string;
    avatar: string;
    email: string;
}

export interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}