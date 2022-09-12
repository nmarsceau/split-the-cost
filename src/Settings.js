import { useContext, useEffect } from 'react'
import { AppContext } from 'AppContext'
import { Header, VibrateButton } from 'Elements'
import { $ } from 'Utilities'

export function Settings() {
    const data = useContext(AppContext)

    useEffect(() => {
        $(document).ready(() => {
            $('.vibrationCheckbox').checkbox({
                onChange: function() {
                    data.settings.vibration.set(this.checked)
                }
            })
        })
        // eslint-disable-next-line
    }, [])

    const deleteGroup = groupName => {
        data.settings.vibration.value && window.navigator.vibrate(50)
        data.setGroups(groups => {
            delete groups[groupName]
            return {...groups}
        })
    }

    return (
        <div className="appLayout">
            <Header showSettings={false} />
            <div className="settings listContainer">
                <h2>Settings</h2>
                <div className="settingsList">
                    <div className="toggle setting">
                        <label htmlFor="vibration">Use vibration?</label>
                        <div className="ui toggle checkbox vibrationCheckbox">
                            <input type="checkbox" id="vibration" name="vibration" checked={data.settings.vibration.value} onChange={() => {}} />
                            <label></label>
                        </div>
                    </div>
                    <div className="setting">
                        <label>Groups</label>
                        <div className="ui segments groupList">
                            {Object.keys(data.groups).map(groupName => (
                                <div className="ui segment group" key={groupName}>
                                    <div>
                                        <div>{groupName}</div>
                                        <div><small>{data.groups[groupName].join(', ')}</small></div>
                                    </div>
                                    <div>
                                        <VibrateButton className="ui red icon button" onClick={() => deleteGroup(groupName)} vibrationPattern="50">
                                            <label className="hiddenVisually">Delete Group</label>
                                            <i className="trash icon"></i>
                                        </VibrateButton>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(data.groups).length === 0 && <div className="ui segment"><i>No Groups Yet</i></div>}
                        </div>
                    </div>
                </div>
                <div>{/* Placeholder */}</div>
            </div>
            <div className="buttonContainer">
                <VibrateButton type="link" to="/" className="ui very rounded massive teal button" vibrationPattern={300}>
                    <i className="arrow left icon"></i>Back
                </VibrateButton>
            </div>
        </div>
    )
}