import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'AppContext'
import { Participant } from 'Participants'
import { Header, VibrateButton, Modal, Input } from 'Elements'
import { $, listsEqual } from 'Utilities'

export function Participants() {
    const data = useContext(AppContext)

    const [groupName, setGroupName] = useState('')
    const [duplicateGroupName, setDuplicateGroupName] = useState(false)

    useEffect(() => {
        if ($ instanceof Function) {
            $(document).ready(() => {
                $('.dropdown').dropdown()
            })
        }
    }, [])

    let matchingGroupName = null
    const currentGroupPeople = Object.values(data.participants).map(p => p.name).filter(n => n !== '')
    for (const groupName in data.groups) {
        if (listsEqual(currentGroupPeople, data.groups[groupName])) {
            matchingGroupName = groupName
            break
        }
    }

    return (
        <div className="appLayout">
            <Header />
            <div className="listContainer">
                <h2 className="groupName">{matchingGroupName}</h2>
                <div className="participantList">
                    {Object.keys(data.participants).map(id => <Participant key={id} id={id} />)}
                </div>
                <div className="participantListButtons">
                    <div className="ui very rounded buttons">
                        <VibrateButton className="ui teal icon button" onClick={data.addNewParticipant} vibrationPattern="100">
                            <i className="plus icon"></i>&nbsp;Add Person
                        </VibrateButton>
                        <VibrateButton className="ui teal icon bottom floating scrolling dropdown button groupButton" vibrationPattern="50">
                            <label className="hiddenVisually">Choose a Group</label>
                            <i className="users icon"></i>
                            <div className="menu">
                                <div className="header">Groups</div>
                                {Object.keys(data.groups).map(groupName => (
                                    <div className="vertical item" key={groupName} onClick={() => data.useGroup(groupName)}>
                                        <div className="description">{data.groups[groupName].join(', ')}</div>
                                        <div className="text">{groupName}</div>
                                    </div>
                                ))}
                                {Object.keys(data.groups).length === 0 && <div className="item disabled"><i>No Groups Yet</i></div>}
                            </div>
                        </VibrateButton>
                    </div>
                    <VibrateButton
                        className="ui very rounded blue icon button"
                        onClick={() => $ instanceof Function && $('#groupNameModal').modal('show')}
                        vibrationPattern="100"
                        disabled={matchingGroupName !== null || currentGroupPeople.length === 0}
                    ><i className="save icon"></i>&nbsp;Save Group</VibrateButton>
                    <VibrateButton
                        className="ui very rounded red icon button"
                        onClick={data.resetParticipants}
                        vibrationPattern={Object.keys(data.participants).reduce(pattern => [...pattern, 50, 30], [])}
                    >
                        <label className="hiddenVisually">Reset Participants</label>
                        <i className="undo alternate icon"></i>
                    </VibrateButton>
                </div>
            </div>
            <div className="buttonContainer">
                <VibrateButton type="link" to="/split" className="ui very rounded massive teal button splitButton" vibrationPattern="300">
                    <img src={process.env.PUBLIC_URL + 'logo/logo-64-outline.png'} alt="" />
                    <span>SPLIT IT</span>
                </VibrateButton>
            </div>
            <Modal id="groupNameModal" className="mini" config={{
                detachable: false,
                onShow: () => {
                    setGroupName('')
                    setDuplicateGroupName(false)
                }
            }}>
                <div className="content">
                    <label htmlFor="groupName" className="hiddenVisually">Group Name</label>
                    <Input id="groupName" placeholder="Group Name" value={groupName}
                        onChange={e => {
                            setGroupName(e.target.value)
                            setDuplicateGroupName(Object.keys(data.groups).includes(e.target.value))
                        }}
                        onEnter={e => e.target.closest('.ui.modal').querySelector('.ui.ok.button').click()}
                    />
                    {duplicateGroupName && <div className="duplicateGroupName"><span className="ui warning text">This will overwrite the existing<br />"{groupName}" group.</span></div>}
                </div>
                <div className="actions">
                    <VibrateButton className="ui red icon cancel button" vibrationPattern="50"><i className="undo alternate icon"></i>&nbsp;Cancel</VibrateButton>
                    <VibrateButton
                        className="ui teal icon ok button"
                        onClick={() => {
                            data.setGroups(groups => ({
                                ...groups,
                                [groupName.trim()]: Object.values(data.participants).map(p => p.name).filter(n => n !== '')
                            }))
                        }}
                        vibrationPattern="100"
                        disabled={groupName.trim() === ''}
                    ><i className="save icon"></i>&nbsp;Save</VibrateButton>
                </div>
            </Modal>
        </div>
    )
}