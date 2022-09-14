import { useEffect } from 'react'
import { $ } from 'Utilities'

export function Checkbox({ id, checked, setter }) {
    useEffect(() => {$(() => {$('#' + id).checkbox()})}, [ id ])

    return (
        <div className="ui toggle checkbox">
            <input type="checkbox" id={id} name={id} defaultChecked={checked} onChange={() => {setter(!checked)}} />
            <label></label>
        </div>
    )
}