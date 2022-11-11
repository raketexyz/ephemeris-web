import { useState } from 'react';
import Link from 'next/link';

import { Form, Input, TextArea, Button, Loading, Error } from '/components/form';
import { useComments, postComment, deleteComment, editComment } from '/components/api';
import Separator from '/components/separator';

const PAGE_SIZE = 10;

export default function Comments({ post, session }) {
    let { data, isLoading, error, mutate, size, setSize } =
        useComments(post.id, PAGE_SIZE);

    const remove = comment => {
        mutate(() => data.map(comments =>
                comments.filter(x => x.id != comment.id)
            ), {
                populateCache: true,
                revalidate: false,
            });
    };

    const add = comment => {
        mutate(() => [[comment], ...data], {
            populateCache: true,
            revalidate: false,
        })
    };

    return <>
        <div className="mx-auto w-full max-w-xl">
            <Error error={error} />
            <div className="text-2xl font-bold text-neutral-100 mt-5">
                comments
            </div>
            { isLoading && <Loading /> }

            { session && (
                <Prompt session={session} update={add} post={post} />
            ) }
            { data && data.map(comments => comments.map(comment =>
                <Comment key={comment.id} comment={comment} session={session}
                    remove={remove} />
            )) }
            { data && data[0].length > 0 && data[data.length - 1].length >= PAGE_SIZE && (
                <button className="mx-auto text-gray-200 bg-neutral-800 rounded
                    py-1 px-2 block" onClick={() => setSize(size + 1)}>
                    moar!
                </button>
            ) }
        </div>
    </>;
}

function Prompt({ session, update, post }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = e => {
        setMessage(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        postComment({
            post: post.id,
            message
        }, session.token)
            .then(comment => {
                setMessage("");
                update(comment);
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false));
    }

    if (loading) return <Loading />;
    return <>
        <Error error={error} />
        <Form onSubmit={handleSubmit}>
            <Input label="message:">
                <TextArea name="message" onChange={handleInputChange}
                    value={message} minLength={1} maxLength={140} required />
            </Input>
            <Button type="submit">comment!</Button>
        </Form>
    </>;
}

function Comment({ comment, session, remove }) {
    const [del, setDel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState();

    const editButton = e => {
        e.preventDefault();
        if (!message) setMessage(comment.message);
        setEdit(true);
    };
    const save = e => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        editComment({ message, id: comment.id }, session.token)
            .then(comment => {
                setError(null);
                setEdit(false);
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false));
    };

    const handleRemove = async () => {
        setLoading(true);
        deleteComment(comment.id, session.token)
            .then(comment => remove(comment));
    };

    if (loading) return <Loading />;
    return <div className="mx-auto px-5 py-2 max-w-xl my-5 bg-neutral-800
        shadow-xl rounded-lg break-words">
        <div className="font-serif pl-2 text-neutral-100">
            { edit ? <>
                <TextArea value={message} maxLength={140}
                    onChange={e => setMessage(e.target.value)} />
                <span className="underline text-sm cursor-pointer"
                    onClick={save}>
                    save
                </span>
            </> : <>
                { message ?? comment.message }
            </>
            }
        </div>
        <div className="text-sm tracking-tighter mt-1 text-neutral-200">
            <span className="text-neutral-400 mr-1">&mdash;</span>
            <Link href={`/user/${comment.author}`}>{comment.author}</Link>
            <Separator />
            {new Date(comment.createdAt).toLocaleDateString()}
            { comment.updatedAt && <>
                <Separator />
                last edited {new Date(comment.updatedAt)
                        .toLocaleDateString()}
            </> }
            { session && session.user.username === comment.author && <>
                <Separator />
                { edit || <>
                    <a className="cursor-pointer underline" onClick={editButton}>
                        edit
                    </a>
                    <Separator />
                </> }
                { del ? <>
                    really?
                    <Separator />
                    <a className="cursor-pointer underline"
                        onClick={() => setDel(false)}>
                        no
                    </a>
                    <Separator />
                    <a className="cursor-pointer underline"
                        onClick={handleRemove}>
                        yes
                    </a>
                </> : <a className="cursor-pointer underline"
                    onClick={() => setDel(true)}>
                    delete
                </a>}
            </>}
        </div>
    </div>;
}
