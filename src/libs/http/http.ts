import { IPayloadHttp } from "../interfaces";

const http = {
    get(route: string) {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'GET',
            credentials: "include",
        })
            .then((res) => {
                console.log('res in http', res);
                return res.json()
            })
            .catch((err) => {
                console.log('error in http:: ', err);
                return {
                    data: null,
                    error: true,
                }
            })
    },

    post(route: string, body: any) {
        console.log('body', body);
        return fetch(`http://localhost:8080/${route}`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .catch((err) => {
                return {
                    data: null,
                    error: true,
                }
            })
    }
}

export default http;