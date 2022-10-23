import Head from 'next/head';
import { StrictMode } from 'react';

import '/styles/globals.css';
import Layout from '/components/layout';
import { useSession } from '/components/api';

function Ephemeris({ Component, pageProps }) {
    const session = useSession();

    return <StrictMode>
        <Head>
            <title>ephemeris</title>
            <meta name="description" content="Ephemeris is an online platform
                  for writing and reading articles." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <Component {...pageProps} session={session} />
        </Layout>
    </StrictMode>;
}

export default Ephemeris;
