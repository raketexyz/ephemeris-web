module.exports = {
    Form: function({ onSubmit, children }) {
        const classes = "mx-auto max-w-prose min-w-max text-neutral-300 flex \
            flex-col";
        return <form onSubmit={onSubmit} className={classes}>
            {children}
        </form>;
    },
    Input: function({ label, children }) {
        return <label className="mt-2 flex flex-col">
            <span className="text-neutral-300">{label}</span>
            {children}
        </label>;
    },
    Text: function({
        name, value, type, onChange, autoComplete, disabled, placeholder,
        maxLength, minLength, required,
    }) {
        const classes = "bg-neutral-800 px-1 outline-none rounded";
        return <input name={name} value={value} type={type ?? "text"}
                      onChange={onChange} autoComplete={autoComplete}
                      disabled={disabled} placeholder={placeholder}
                      maxLength={maxLength} minLength={minLength}
                      required={required} className={classes} />;
    },
    TextArea: function({
        name, value, onChange, autoComplete, disabled, placeholder, maxLength,
        minLength, required,
    }) {
        const classes = "bg-neutral-800 px-1 outline-none rounded";
        return <textarea name={name} value={value} onChange={onChange}
                         autoComplete={autoComplete} disabled={disabled}
                         placeholder={placeholder} maxLength={maxLength}
                         minLength={minLength} required={required}
                         className={classes} />;
    },
    Button: function({ type, children }) {
        const classes = "bg-neutral-800 mt-3 grow py-1 rounded";
        return <button type={type} className={classes}>
            {children}
        </button>;
    },
    Loading: function() {
        return <div className="text-gray-300 max-w-fit mx-auto pt-5">
            Loading...
        </div>;
    },
    Error: function({ error }) {
        return <>
            {error && (
                <div className="text-gray-300 bg-red-400 px-2 py-1 rounded
                    max-w-prose mx-auto overflow-hidden">
                    { String(error) }
                </div>
            )}
        </>;
    }
};
