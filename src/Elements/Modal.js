import { useEffect } from 'react'
import { $ } from 'Utilities'

export function Modal({ id, className, config, children }) {
    useEffect(() => {
        $ instanceof Function && $('#' + id).modal(config ?? {})
    }, [ id, config ])
    return <div id={id} className={'ui modal ' + className}>{children}</div>
}