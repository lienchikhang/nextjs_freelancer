import http from "../http/http";

interface Strategy {
    make(payload: IPayment, price?: number, bankCode?: string): any;
}

export class Payment {

    constructor(private strategy: Strategy) {
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public async make(payload: IPayment, price?: number, bankCode?: string) {
        return this.strategy.make(payload, price, bankCode);
    }

    public getStrategy() {
        return this.strategy;
    }
}

interface IPayment {
    serviceId: number,
    method: string,
    name: string,
    jobId: number,
    email: string,
}

export class VNPay implements Strategy {
    async make(payload: IPayment, price?: number, bankCode: string = 'NCB') {
        try {
            const data = {
                bankCode: bankCode,
                price,
                method: payload.method,
                service: payload.serviceId,
                name: payload.name,
                jobId: payload.jobId,
                email: payload.email,
            }
            const rs = await fetch(`http://localhost:8080/vnpay/create_payment_url`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
                body: JSON.stringify(data),
            }).then((res) => res.json())
            return rs;
        } catch (error) {
            console.log('errrrrr:::', error);
        }
    }
}

export class Balance implements Strategy {
    async make(payload: IPayment) {
        try {
            const rs = await http.post(`hire/pay-with-balance`, payload)
            return rs;
        } catch (error) {
            console.log('errrrrr:::', error);
        }
    }
}