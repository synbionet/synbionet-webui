async function handleChange(event, setter) {
  setter(event.target.value)
}

export function FormField({ value, type, label, disabled, setter, alternateStyle, placeholder }) {
  const css = alternateStyle
    ? 'grow placeholder:italic placeholder:text-slate-500 text-slate-800 bg-slate-200 shadow-inner py-2 font-semibold rounded-sm focus:outline-none tracking-wide text-center'
    : 'px-2 grow placeholder:italic placeholder:text-slate-200 bg-slate-100 border-2 rounded-sm border-slate-300 drop-shadow-sm py-2 pr-3 focus:outline-none sm:text-sm'

  return (
    <label>
      {label && (
        <h4 className="text-sm tracking-wider text-slate-500 uppercase font-semibold">{label}</h4>
      )}
      <div className="w-full bg-white bg-opacity-10 rounded-md flex items-center">
        {type === 'text' && (
          <input
            placeholder={placeholder}
            className={css}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, setter)}
            disabled={disabled}
          />
        )}
        {type === 'boolean' && (
          <select className={css} value={value} onChange={(e) => handleChange(e, setter)}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        )}
        {type === 'textarea' && (
          <textarea
            placeholder={placeholder}
            className={'h-40 ' + css}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, setter)}
          />
        )}
      </div>
    </label>
  )
}
