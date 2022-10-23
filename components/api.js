import { useEffect, useState } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
    useUser: function(id) {
        const { data: user, error } = useSWR(
            `${API_URL}user/${id}`, fetcher,
        );

        return {
            user,
            isLoading: !error && !user,
            error,
        };
    },
    usePost: id => {
        const { data: post, error } = useSWR(
            `${API_URL}post/${id}`, fetcher,
        );

        return {
            post,
            isLoading: !error && !post,
            error,
        };
    },
    usePosts: (offset, limit, author) => {
        const { data: posts, error } = useSWR(
            `${API_URL}posts?offset=${offset}&limit=${limit}` +
            `${author ? `&author=${author}` : ""}`,
            fetcher,
        );

        return {
            posts,
            isLoading: !error && !posts,
            error,
        };
    },
    useSession: () => {
        const [token, setToken] = useState(null);
        const [data, setData] = useState(null);
        const [load, setLoad] = useState(true);
        const [loading, setLoading] = useState(false);

        try {
            if (window.localStorage.getItem("token") != token)
                setToken(window.localStorage.getItem("token") ?? undefined);
        } catch (e) {
            if (!(e instanceof ReferenceError))
                throw e;
        }

        useEffect(() => {
            if (!load || loading || !token) return;

            setLoad(false);
            setLoading(true);
            fetch(`${API_URL}session?token=${token}`)
                .then(async res => res.ok ? res.json()
                    : Promise.reject())
                .then(data => setData(data))
                .catch(() => {
                    window.localStorage.removeItem("token");
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [load, loading, token]);

        if (token === undefined) return null;
        if (data && token && !load && !loading) return {
            token,
            ...data,
        };
    },
    register: (username, password) => {
        return fetch(`${API_URL}user`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
    },
    login: async (username, password) => {
        return fetch(`${API_URL}login`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(async res => res.ok ? res.json()
                : Promise.reject(await res.text()));
    },
    logout: async (token) => {
        return fetch(`${API_URL}logout?token=${token}`)
            .then(async res => res.ok ? res
                : Promise.reject(await res.text()));
    },
    post: async (post, token) => {
        return fetch(`${API_URL}post`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                post,
                token,
            }),
        })
            .then(async res => res.ok ? res.json()
                : Promise.reject(await res.text()));
    },
    edit: async (id, post, token) => {
        return fetch(`${API_URL}edit`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                post,
                token,
            }),
        })
            .then(async res => res.ok ? res.json()
                : Promise.reject(await res.text()));
    },
    deletePost: async (id, token) => {
        return fetch(`${API_URL}post/${id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then(async res => res.ok ? res
                : Promise.reject(await res.text()));
    }
};

async function fetcher(...args) {
    return fetch(...args)
        .then(async res => res.ok ? res.json() : Promise.reject({
            status: res.status,
            message: await res.text(),
        }));
}
