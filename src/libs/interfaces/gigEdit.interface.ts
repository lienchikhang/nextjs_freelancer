export interface GigEdit {
    id: number,
    job_image: string,
    job_name: string,
    job_desc: string,
    typeId: number,
    childTypeId: number,
    subId: number,
    Services: {
        id: number,
        price: number,
        service_desc: string,
        service_benefit: string,
        service_level: string,
        delivery_date: 0,
    }[],
}

export interface GigEditContextType {
    gigEdit: GigEdit | null;
    setGigEdit: (data: GigEdit) => void;
}