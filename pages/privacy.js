export default function Privacy() {
    return <div className="rounded-lg bg-neutral-800 self-center shadow-xl px-5
        py-2 text-neutral-200">
        <div className="max-w-fit text-2xl font-bold">
            privacy
        </div>
        <div className="self-center max-w-prose text-justify
            font-serif">
            <p>
                the following personal data is collected for every request:
            </p>
            <ul className="pl-5 list-disc">
                <li>the remote ip address</li>
                <li>the remote user</li>
                <li>the http referer</li>
                <li>the http user agent</li>
                <li>the http forwarded for header</li>
            </ul>
            <p>
                no data is correlated with server logs for
            </p>
            <ul className="pl-5">
                <li>personal identification or</li>
                <li>analysis of surfing behaviour</li>
            </ul>
            <p>
                no third party has access to this data.
                the legal basis for the storage of this data is
                art.&nbsp;6 par.&nbsp;1f DSGVO.
            </p>
        </div>
    </div>;
}
