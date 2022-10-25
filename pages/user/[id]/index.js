import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { updatePreferences } from '/components/api';
import { Loading, Error, TextArea } from '/components/form';
import PostList from '/components/postlist';

export default function UserPage({ user, session }) {
    const router = useRouter();
    useEffect(() => { user || router.push("/"); });
    if (!user)
        return <Loading />;
    return <>
        <Head>
            <title>{ user.username } &middot; ephemeris</title>
            { user.about && <meta name="description" value={user.about} /> }
        </Head>
        <Info user={user} session={session} />
        <div>
            <PostList author={user.username} />
        </div>
    </>;
}

function Info({ user, session }) {
    const [edit, setEdit] = useState(false);
    const [about, setAbout] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const editButton = e => {
        e.preventDefault();
        if (!about) setAbout(user.about ?? "");
        setEdit(true);
    };
    const save = e => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        updatePreferences({ about }, session.token)
            .then(res => {
                user = res;
                setError(null);
                setEdit(false);
            })
            .catch(e => setError(e))
            .finally(() => {
                setLoading(false);
            })
    }

    return <>
        <div className="self-center text-neutral-200">
            <div className="text-neutral-100 font-bold text-3xl">
                { user.username }
            </div>
            <div className="tracking-tighter">
                *&nbsp;{new Date(user.createdAt).toLocaleDateString()}
            </div>
        </div>
        <Error error={error} />
        { loading ?
            <Loading />
        : <div className="w-full text-neutral-200">
            { edit ? <div className="flex flex-col items-center">
                <div className="max-w-prose w-full">
                    <TextArea value={about} maxLength={160}
                        onChange={e => setAbout(e.target.value)} />
                </div>
                <span className="underline text-sm cursor-pointer"
                    onClick={save}>
                    save
                </span>
            </div>
            : <p className="mx-auto font-serif break-words max-w-prose">
                {about ?? user.about}
                { session && session.user.username === user.username &&
                    <span className="underline font-sans text-sm ml-1
                        cursor-pointer" onClick={editButton}>
                        { about ?? user.about ? "edit" : "add about" }
                    </span>
                }
            </p> }
        </div> }
    </>;
}

export async function getServerSideProps(context) {
    if (!context.query.id) return;
    const user = await fetch(
        `${process.env.INTERNAL_API_URL}user/${context.query.id}`
    )
        .then(async res => res.ok ? res.json() : Promise.reject())
        .catch(() => {
            return null;
        });
    return {
        props: {
            user,
        },
    };
}
