import Link from 'next/link';
import { Error } from '/components/form';
import { usePost } from '/components/api';
import Separator from '/components/separator';

export default function PostCard({ id }) {
    const { post, isLoading, error } = usePost(id);

    if (error) return <Error error={error.message} />;
    if (isLoading) return <></>;
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
                <div className="mt-1 text-sm text-neutral-200 tracking-tighter">
                    <span className="text-neutral-400 mr-1">&mdash;</span>
                    <Link href={`/user/${post.author}`}>{post.author}</Link>
                    <Separator />
                    {new Date(post.createdAt).toLocaleDateString()}
                    { post.updatedAt && <>
                        <Separator />
                        last edited {new Date(post.updatedAt)
                                .toLocaleDateString()}
                    </>}
                </div>
            </div>
        </div>
    );
}
