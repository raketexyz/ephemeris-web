import { useState } from 'react';
import { useRouter } from 'next/router';

import { usePost, edit } from '/components/api';
import { Loading, Error } from '/components/form';
import PostForm from '/components/postform';

export default function Edit({ session }) {
    const router = useRouter();

    if (!router.isReady) return <Loading />;
    if (!router.query.id) {
        router.push("/");
        return <Loading />;
    };

    if (session === null) router.push("/login");

    return <Inner id={router.query.id} session={session} />;
}

function Inner({ id, session }) {
    const router = useRouter();
    const { post: original, origLoading, origError } = usePost(id);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        edit(
            original.id,
            post,
            session.token,
        )
            .then(post => router.push(`/post/${post.id}`))
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }

    if (!error && origError) setError(error ?? origError.message);
    if (loading || origLoading) return <Loading />;
    if (!original) {
        router.push("/");
        return <Loading />;
    }

    if (!post) {
        setPost(original);
    }

    if (session && session.user.username !== original.author)
        router.push(`/post/${original.id}`);

    return <div>
        {loading && <Loading />}
        <Error error={error} />
        {!loading && (
            <PostForm setPost={setPost} cta="publish edit"
                handleSubmit={handleSubmit} post={post} />
        )}
    </div>;
}
