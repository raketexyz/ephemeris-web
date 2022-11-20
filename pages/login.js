import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Form, Input, Text, Button, Loading, Error } from '/components/form';
import { login } from '/components/api';

export default function Login({ session }) {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = async event => {
        event.preventDefault();
        setShowForm(false);
        login(username, password)
            .then(data => {
                window.localStorage.setItem("token", data.id);
                if (router.query.return !== undefined) {
                    router.back();
                } else {
                    router.push("/");
                }
            })
            .catch(error => {
                setShowForm(true);
                setError(error);
            });
    }

    if (session) router.push("/");

    if (!showForm) return <Loading />;

    return <>
        <div className="self-center text-neutral-200 text-3xl font-bold">
            login
        </div>
        {showForm && <div className="self-center">
            <Form onSubmit={handleSubmit}>
                <Error error={error} />
                <Input label="username:">
                    <Text name="username" value={username}
                        autoComplete="username"
                        onChange={e => setUsername(e.target.value)} />
                </Input>
                <Input label="password:">
                    <Text name="password" value={password}
                        autoComplete="password" type="password"
                        onChange={e => setPassword(e.target.value)} />
                </Input>
                <Button type="submit">login</Button>
            </Form>
        </div>}
    </>;
}
