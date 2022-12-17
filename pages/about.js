export default function About() {
    return <div className="rounded-lg bg-neutral-800 self-center shadow-xl px-5
        py-2">
        <div className="self-center max-w-prose text-neutral-200 font-serif">
            <Section id="about">about</Section>
            <p>
                ephemeris is a free online platform where you can write articles
                on anything you are interested in, and anyone can read those
                articles.
                it is a platform for open exchange of information, knowledge,
                opinions, ideas, and everything else.
            </p>
            <p>
                the source-code of the <a href={"https://github.com/quadcerebru"
                +"mal/ephemeris-web"}>website</a> and the <a href={"https://git"
                +"hub.com/quadcerebrumal/ephemeris"}>server</a> is available on
                GitHub under the terms of the <a href={"https://www.gnu.org/lic"
                +"enses/"}>GNU GPL and AGPL</a>, respectively.
            </p>
            <Section id="content-policy">content policy</Section>
            <p>
                posts on this platform don&apos;t have to pertain to some topic
                or reach some quality standards.
                however, there is no tolerance to excessive spam, e.g. posting
                the same article multiple times, which will get your posts and
                perhaps your account deleted.
            </p>
        </div>
    </div>;
}

function Section({ id, children }) {
    return <h1 className="text-2xl font-sans font-bold mt-2">
        <a id={encodeURIComponent(id)} href={"#" + encodeURIComponent(id)}
            className="mr-2 no-underline text-gray-400">
            #
        </a>
        { children }
    </h1>;
}
