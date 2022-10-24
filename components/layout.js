import Link from 'next/link';

import { useSession } from './api';
import Separator from '/components/separator';

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
        <div className="text-neutral-200 flex flex-wrap justify-center mb-3 overflow-clip">
            <Link href="/about">about</Link>
            <Separator />
            <Link href="/privacy">privacy</Link>
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
            <Link href="/login">login</Link>
            <Separator />
            <Link href="/signup">sign&nbsp;up</Link>
        </div>
    );
    return <div className="text-neutral-200 float-right flex flex-wrap">
        hello,&nbsp;
        <Link href={`/user/${session.user.username}`}>
            {session.user.username}
        </Link>
        <Separator />
        <Link href="/write">write</Link>
        <Separator />
        <Link href="/logout">logout</Link>
    </div>;
}
