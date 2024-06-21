import { IPayloadHttp } from "../interfaces";

const http = {
    get(route: string) {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'GET',
            credentials: "include",
        })
            .then((res) => res.json())
            .catch((err) => {
                // console.log('error in http:: ', err);
                return {
                    data: null,
                    error: true,
                }
            })
    }
}

export const fetching = async (route: string, method: string, data?: any) => {
    switch (method.toUpperCase()) {
        case 'GET': {
            const rs = await http.get(route);
            return rs;
        }
    }
}
export default http;