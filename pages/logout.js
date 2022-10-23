import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Loading, Error } from '/components/form';
import { logout } from '/components/api';

export default function Logout({ session }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (session === null)
        router.push("/");

    useEffect(() => {
        if (!session || loading)
            return;
        setLoading(true);
        logout(session.token)
            .then(() => {
                window.localStorage.removeItem("token");
                router.push("/");
            })
            .catch(e => {
                setLoading(false);
                setError(e);
            })
    }, [session, loading, router]);

    if (!session || loading)
        return <Loading />;

    return <Error error={error} />;
}
