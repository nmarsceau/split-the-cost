export function Input({ type = 'text', id, placeholder, value, onChange, onEnter }) {
    return (
        <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} onKeyUp={e => {
            if (e.key === 'Enter' && onEnter instanceof Function) {onEnter(e)}
        }} />
    )
}