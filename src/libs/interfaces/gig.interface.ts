export interface IGig {
    status: number,
    mess: string,
    content: {
        id: number,
        job_name: string,
        job_desc: string,
        job_image: string | null,
        rate: number,
        stars: number,
        Users: {
            avatar: string | null,
            full_name: string,
            Skills: {
                skill_name: string,
            }[],
        }
    },
    date: '2024-06-23T10:28:26.141Z'
}

export interface IComment {
    content: string,
    rate: number,
    Users: {
        avatar: string | null,
        full_name: string,
    },
    createdAt: Date
}

export interface IService {
    id: number,
    service_desc: string,
    price: number,
    service_benefit: string,
    service_level: string,
    delivery_date: number
}