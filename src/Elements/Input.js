import { randomString } from 'Utilities'

export function Input({ type = 'text', id, placeholder, value, onChange, onEnter }) {
    return (
        <input type={type} id={id} name={id} placeholder={placeholder} value={value} autoComplete={randomString()} onChange={onChange} onKeyUp={e => {
            if (e.key === 'Enter' && onEnter instanceof Function) {onEnter(e)}
        }} />
    )
}