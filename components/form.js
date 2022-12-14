export function Form({ onSubmit, children }) {
    const classes = "mx-auto max-w-prose text-neutral-300 flex flex-col";
    return <form onSubmit={onSubmit} className={classes}>
        {children}
    </form>;
}
export function Input({ label, children }) {
    return <label className="mt-2 flex flex-col">
        <span className="text-neutral-300">{label}</span>
        {children}
    </label>;
}
export function Text({
    name, value, type, onChange, autoComplete, disabled, placeholder, maxLength,
    minLength, required,
}) {
    const classes = "bg-neutral-800 px-1 outline-none rounded";
    return <input name={name} value={value} type={type ?? "text"}
            onChange={onChange} autoComplete={autoComplete} disabled={disabled}
            placeholder={placeholder} maxLength={maxLength}
            minLength={minLength} required={required} className={classes} />;
}
export function TextArea({
    name, value, onChange, autoComplete, disabled, placeholder, maxLength,
    minLength, required,
}) {
    const classes =
            "bg-neutral-800 py-1 px-2 outline-none rounded w-full font-mono";
    return <textarea name={name} value={value} onChange={onChange}
            autoComplete={autoComplete} disabled={disabled}
            placeholder={placeholder} maxLength={maxLength}
            minLength={minLength} required={required} className={classes} />;
}
export function Button({ type, children }) {
    const classes = "bg-neutral-800 mt-3 grow py-1 rounded";
    return <button type={type} className={classes}>
        {children}
    </button>;
}
export function Loading() {
    return <div className="text-gray-300 max-w-fit mx-auto pt-5">
        Loading...
    </div>;
}
export function Error({ error }) {
    return <>
        {error && (
            <div className="text-gray-300 bg-red-400 my-2 px-5 py-2 rounded
                    max-w-prose mx-auto overflow-hidden font-bold">
                { String(error) }
            </div>
        )}
    </>;
}
export function ActionText({ action, children }) {
    const onKeyDown = e => {
        if (e.key === "Enter") action();
    };
    return <span className="cursor-pointer underline" tabIndex="0"
            onKeyDown={onKeyDown} onClick={action}>
        { children }
    </span>;
}
