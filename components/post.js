import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import 'katex/dist/katex.css';
import 'highlight.js/styles/monokai-sublime.css';

import { deletePost } from '/components/api';
import { Loading, Error, ActionText } from '/components/form';
import Separator from '/components/separator';

export default function Post({ session, post }) {
    const router = useRouter();
    const [del, setDel] = useState(false);
    const [error, setError] = useState(null);

    const handleRemove = async () => {
        deletePost(post.id, session.token)
            .then(_ => router.push("/"))
            .catch(e => setError(e));
    }

    return <>
        <Error error={error} />
        <div className="self-center px-5 py-2 mt-5 rounded-lg bg-neutral-800
            shadow-xl max-w-prose w-full">
            <div className="font-serif break-words flex flex-col">
                <div className="font-sans">
                    <div className="mt-1 tracking-tighter text-neutral-200">
                        <Link href={`/user/${post.author}`}>{post.author}</Link>
                        <Separator />
                        {new Date(post.createdAt).toLocaleDateString()}
                        { post.updatedAt && <>
                            <Separator />
                            last edited {new Date(post.updatedAt)
                                    .toLocaleDateString()}
                        </>}
                        {session && session.user.username === post.author && <>
                            <Separator />
                            <Link href={`/edit/${post.id}`}>edit</Link>
                            <Separator />
                            { del ? <>
                                really?
                                <Separator />
                                <ActionText action={() => setDel(false)}>no</ActionText>
                                <Separator />
                                <ActionText action={handleRemove}>yes</ActionText>
                            </> : <ActionText action={() => setDel(true)}>
                                delete
                            </ActionText>}
                        </>}
                    </div>
                    <div className="text-neutral-100 font-bold text-3xl">
                        {post.title}
                    </div>
                </div>
                <p className="text-neutral-300 font-sans font-medium text-xl">
                    {post.subtitle}
                </p>
                <Markdown text={post.body} />
            </div>
        </div>
    </>;
}

function Markdown({ text }) {
    const [contentHtml, setContentHtml] = useState(null);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeSanitize, {
                ...defaultSchema,
                attributes: {
                    ...defaultSchema.attributes,
                    div: [
                        ...(defaultSchema.attributes.div ?? []),
                        ['className', 'math', 'math-display']
                    ],
                    span: [
                        ...(defaultSchema.attributes.span ?? []),
                        ['className', 'math', 'math-inline',
                            'hljs-addition', 'hljs-attr', 'hljs-attribute',
                            'hljs-built_in', 'hljs-bullet', 'hljs-char',
                            'hljs-code', 'hljs-comment', 'hljs-deletion',
                            'hljs-doctag', 'hljs-emphasis', 'hljs-formula',
                            'hljs-keyword', 'hljs-link', 'hljs-literal',
                            'hljs-meta', 'hljs-name', 'hljs-number',
                            'hljs-operator', 'hljs-params', 'hljs-property',
                            'hljs-punctuation', 'hljs-quote', 'hljs-regexp',
                            'hljs-section', 'hljs-selector-attr',
                            'hljs-selector-class', 'hljs-selector-id',
                            'hljs-selector-pseudo', 'hljs-selector-tag',
                            'hljs-string', 'hljs-strong', 'hljs-subst',
                            'hljs-symbol', 'hljs-tag', 'hljs-template-tag',
                            'hljs-template-variable', 'hljs-title',
                            'hljs-type', 'hljs-variable']
                    ],
                }
            })
            .use(rehypeKatex)
            .use(rehypeStringify)
            .process(text)
            .then(contentHtml => setContentHtml(contentHtml))
            .then(() => setRendered(true))
            .catch(e => console.error(e));
    }, [text]);

    return rendered ? (
        <p className="text-justify basis-full flex-none overflow-auto prose
            prose-neutral"
            dangerouslySetInnerHTML={{ __html: contentHtml }} />
    ) : <Loading />;
}
