import { useRouter } from 'next/router';

import { Loading, Error } from '/components/form';
import { useUser } from '/components/api';
import PostList from '/components/postlist';

export default function UserPage() {
    const router = useRouter();
    return router.query.id ? <div>
        <Info id={router.query.id} />
        <PostList author={router.query.id} />
    </div> : <Loading />;
}

function Info({ id }) {
    const { user, isLoading, error } = useUser(id);

    if (error) {
        if (error.status === 404)
            return <Error error="User not found" />;
        return <Error error={error.message} />;
    }
    if (isLoading) return <Loading />;

    return <div className="max-w-fit mx-auto">
        <div className="text-neutral-100 font-bold text-3xl">
            { user.username }
        </div>
        <div className="text-neutral-200 tracking-tighter">
            *&nbsp;{new Date(user.createdAt).toLocaleDateString()}
        </div>
    </div>;
}
