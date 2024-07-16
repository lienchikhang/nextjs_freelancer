export interface SessionContextType {
    isExpired: boolean;
    handleExpired: (data: boolean) => void;
}