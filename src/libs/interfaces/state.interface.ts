export interface IStateOrder {
    id: number,
    price: number,
    name: string,
    image: string,
    level: string,
    jobId: number,
    method: string,
}

export interface IStateDrawer {
    isDrawerOpen: boolean,
}

export interface IStateModal {
    isOpen: boolean,
}


export interface IStateUser {
    full_name: string,
    avatar: string,
}