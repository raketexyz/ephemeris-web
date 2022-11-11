import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Post from '/components/post';
import { Loading } from '/components/form';
import Comments from '/components/comments';

export default function PostPage({ session, post }) {
    const router = useRouter();
    useEffect(() => { post || router.push("/"); });
    if (!post) {
        return <Loading />;
    }
    return <>
        <Head>
            <title>
                {post.title} &middot; {post.author} &middot; ephemeris
            </title>
            <meta name="author" value={post.author} />
            <meta name="description" value={post.subtitle} />
        </Head>
        <Post post={post} session={session} />
        <Comments post={post} session={session} />
    </>;
}

export async function getServerSideProps(context) {
    if (!context.query.id) return;
    const post = await fetch(
        `${process.env.INTERNAL_API_URL}post/${context.query.id}`
    )
        .then(async res => res.ok ? res.json() : Promise.reject())
        .catch(() => {
            return null;
        });
    return {
        props: {
            post,
        },
    };
}
