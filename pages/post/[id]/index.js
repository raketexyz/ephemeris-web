import { useRouter } from 'next/router';

import Post from '/components/post';

export default function PostPage({ session }) {
    const router = useRouter();

    return router.query.id && <Post id={router.query.id} session={session} />;
}
