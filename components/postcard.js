import Link from 'next/link';
import { Loading, Error } from '/components/form';
import { usePost } from '/components/api';

export default function PostCard({ id }) {
    const { post, isLoading, error } = usePost(id);

    if (error) return <Error error={error.message} />;
    if (isLoading) return <Loading />
    return (
        <div className="mx-auto px-2 py-1 max-w-xl my-5 bg-neutral-800 shadow-xl
                        rounded-lg break-words">
            <div className="px-4 py-2">
                <Link href={`/post/${post.id}`}>
                    <a className="no-underline">
                        <h1 className="font-bold text-2xl text-neutral-100">
                            {post.title}
                        </h1>
                        <p className="text-sm font-serif text-neutral-200
                            px-2 mr-1">
                            {post.subtitle}
                        </p>
                    </a>
                </Link>
                <div className="mt-1 text-sm tracking-tighter">
                    <span className="text-neutral-400">&mdash;</span>
                    <span className="ml-1 text-neutral-100">
                        <Link href={`/user/${post.author}`}>{post.author}</Link>
                    </span>
                    <span className="ml-1 text-neutral-400">&middot;</span>
                    <span className="ml-1 text-neutral-200">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
