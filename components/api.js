import useSWR from "swr";
import useSWRInfinite from 'swr/infinite';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useUser(id) {
    const { data: user, error } = useSWR(
        `${API_URL}user/${id}`, fetcher,
    );

    return {
        user,
        isLoading: !error && !user,
        error,
    };
}

export function usePost(id) {
    const { data: post, error, mutate } = useSWR(
        `${API_URL}post/${id}`, fetcher,
    );

    return {
        post,
        isLoading: !error && !post,
        error,
        mutate,
    };
}

export function usePosts(offset, limit, author) {
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
}

export function useComments(post, limit) {
    const {
        data,
        error,
        isValidating,
        mutate,
        size,
        setSize,
    } = useSWRInfinite(
        pageIndex => `${API_URL}comments?post=${post}&offset=${pageIndex *
                limit ?? 10}&limit=${limit ?? 10}`,
        fetcher,
    );

    return {
        data,
        isLoading: !error && !data,
        error,
        isValidating,
        mutate,
        size,
        setSize,
    };
}

export function getToken() {
    try {
        return window.localStorage.getItem("token");
    } catch (e) {
        if (!(e instanceof ReferenceError))
            throw e;
    }
}

export function useSession() {
    const token = getToken();
    const { data, error, mutate } = useSWR(
        token && `${API_URL}session?token=${token}`,
        fetcher,
    );

    if (error) window.localStorage.removeItem("token");
    if (!token) return null;
    if (data) return {
        token,
        ...data,
        mutate,
    };
}

export function register(username, password) {
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
}

export async function login(username, password) {
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
}

export async function logout(token) {
    return fetch(`${API_URL}logout?token=${token}`)
        .then(async res => res.ok ? res
            : Promise.reject(await res.text()));
}

export async function post(post, token) {
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
}

export async function postComment(comment, token) {
    return fetch(`${API_URL}comment`, {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            comment,
            token,
        })
    })
        .then(async res => res.ok ? res.json()
            : Promise.reject(await res.text()));
}

export async function edit(id, post, token) {
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
}

export async function editComment(comment, token) {
    return fetch(`${API_URL}comment`, {
        method: "put",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            comment,
            token,
        }),
    })
        .then(async res => res.ok ? res.json()
            : Promise.reject(await res.text()));
}

export async function deletePost(id, token) {
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

export async function deleteComment(id, token) {
    return fetch(`${API_URL}comment/${id}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    })
        .then(async res => res.ok ? res.json()
            : Promise.reject(await res.text()));
}

export async function updatePreferences(update, token) {
    return fetch(`${API_URL}preferences`, {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            update,
            token,
        }),
    })
        .then(async res => res.ok ? res
            : Promise.reject(await res.text()));
}

async function fetcher(...args) {
    return fetch(...args)
        .then(async res => res.ok ? res.json()
            : Promise.reject({
                status: res.status,
                message: await res.text()
            }));
}
