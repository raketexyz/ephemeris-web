import { useState } from 'react';

import PostCard from '/components/postcard';
import { usePosts } from '/components/api';
import { Loading, Error } from '/components/form';

const PAGE_SIZE = 10;

export default function PostList({ author }) {
    const [ pages, setPages ] = useState(1);
    const { posts, isLoading, error } = usePosts(0, pages * PAGE_SIZE + 1, author);

    return <>
        { error && <Error error={error.message} /> }

        {[...Array(pages).keys()].map(i => (
            <Page key={i} author={author} page={i} />
        ))}

        {isLoading && <Loading />}

        <div className="hidden">
            <Page author={author} page={pages} />
        </div>

        {(posts && (posts.length > (pages * PAGE_SIZE)) && (
            <button onClick={() => setPages(pages + 1)} className="mx-auto
                text-gray-200 bg-neutral-800 rounded py-1 px-2 block">
                moar!
            </button>
        ))}
    </>;
};

function Page({ page, author }) {
    const { posts, isLoading, error } =
        usePosts(page * PAGE_SIZE, PAGE_SIZE, author);

    if (isLoading) return <span>Loading</span>;
    if (error) return <Error error={error.message} />;
    return posts.map(post => <PostCard key={post.id} id={post.id}/>);
}
