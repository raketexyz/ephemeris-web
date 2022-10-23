export default function About() {
    return <div className="rounded-lg bg-neutral-800 self-center shadow-xl px-5
        py-2">
        <div className="max-w-fit text-neutral-200 text-2xl font-bold">
            about
        </div>
        <div className="self-center max-w-prose text-neutral-200 text-justify
            font-serif">
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
                +"enses/"}>GNU GPL</a>.
            </p>
        </div>
    </div>;
}
