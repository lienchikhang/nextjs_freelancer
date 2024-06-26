// import { cookies } from "next/headers";

const http = {
    get(route: string) {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },

        })
            .then((res) => {
                return res.json()
            })
            .catch((err) => {
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
    },

    update(route: string) {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'PATCH',
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
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