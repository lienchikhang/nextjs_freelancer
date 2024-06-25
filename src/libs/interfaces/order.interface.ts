export interface Order {
    id: number,
    price: number,
    name: string,
    image: string,
    level: string,
    method: string,
    jobId: number,
}

export interface OrderContextType {
    order: Order | null;
    createOrder: (orderData: Order) => void;
    updateMethod: (method: string) => void;
}