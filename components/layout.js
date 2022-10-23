import Link from 'next/link';

import { useSession } from './api';

export default function Layout({ children }) {
    return <div className="min-h-screen bg-neutral-900 flex flex-col">
        <div className="p-5">
            <Header />
            <Heading />
        </div>
        <main className="flex-1 flex flex-col px-5">
            {children}
        </main>
        <Footer />
    </div>;
}

function Footer() {
    return <div className="px-5 max-h-28 flex flex-col">
        <div className="min-w-full mt-5 mb-3 border-t border-neutral-400" />
        <div className="text-neutral-200 min-w-full flex flex-wrap
            justify-center mb-3">
            <Link href="/about"><a className="max-w-fit">about</a></Link>
            <span className="mx-1 text-neutral-300">&middot;</span>
            <Link href="/privacy"><a className="max-w-fit">privacy</a></Link>
        </div>
    </div>;
}

function Heading() {
    return <Link href="/">
        <a className="no-underline">
            <h1 className="max-w-fit mx-auto mb-5 text-neutral-100 font-bold
                text-4xl overflow-clip">
                ephemeris
            </h1>
        </a>
    </Link>;
}

function Header() {
    const session = useSession();
    if (!session) return (
        <div className="text-neutral-200 float-right">
            <Link href="/login">
                <a>login</a>
            </Link>
            <span className="mx-1 text-neutral-300">&middot;</span>
            <Link href="/signup">
                <a>sign&nbsp;up</a>
            </Link>
        </div>
    );
    return <div className="text-neutral-200 float-right">
        hello,&nbsp;
        <Link href={`/user/${session.user.username}`}><a>
            {session.user.username}
        </a></Link>
        <span className="mx-2">&middot;</span>
        <Link href="/write"><a>
            write
        </a></Link>
        <span className="mx-2">&middot;</span>
        <Link href="/logout"><a>
            logout
        </a></Link>
    </div>;
}
