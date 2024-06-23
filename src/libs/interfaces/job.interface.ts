export interface IJob {
    id: number;
    job_name: string;
    job_image: string;
    rate: number;
    stars: number;
    createdAt: Date,
    Services: [
        {
            price: number,
        }
    ];
}

export interface IFilter {
    deliveryTime?: number;
    budget?: number;
}