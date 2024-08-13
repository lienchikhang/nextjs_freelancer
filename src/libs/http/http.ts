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
            .then((res) => res.json())
            .catch((err) => {
                console.log('err', err);
                return {
                    data: null,
                    error: true,
                    status: err.status,
                }
            })
    },

    post(route: string, body: any) {
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
    },

    upload: (route: string, formData: any) => {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'POST',
            credentials: "include",
            body: formData,
        }).then((res) => res.json())
            .catch((err) => {
                return {
                    data: null,
                    error: true,
                }
            })
    },

    patch: (route: string) => {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'PATCH',
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
            // body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .catch((err) => {
                return {
                    data: null,
                    error: true,
                }
            })
    },

    patchWithBody: (route: string, body: any) => {
        return fetch(`http://localhost:8080/${route}`, {
            method: 'PATCH',
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