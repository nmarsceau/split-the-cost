import { useState } from 'react'
import { ParticipantContext } from 'Participants'
import { randomString, useLocalStorage } from 'Utilities'

export function ParticipantProvider({ children }) {
    const initializeParticipants = () => ({
        [randomString()]: {name: '', amount: 0}
    })

    const [participants, setParticipants] = useState(initializeParticipants())

    const createNewParticipant = (name = '', existingIds) => {
        existingIds ??= Object.keys(participants)
        let id = randomString()
        while (existingIds.includes(id)) {id = randomString()}
        return [id, {name: name, amount: 0}]
    }

    const addNewParticipant = (name = '') => {
        const [id, participant] = createNewParticipant(name)
        setParticipants(participants => ({...participants, [id]: participant}))
    }

    const resetParticipants = () => {
        setParticipants(initializeParticipants())
    }

    const [groups, setGroups] = useLocalStorage('groups', {})

    const useGroup = groupName => {
        const newParticipants = {}
        for (const name of groups[groupName]) {
            const [id, participant] = createNewParticipant(name, Object.keys(newParticipants))
            newParticipants[id] = participant
        }
        setParticipants(newParticipants)
    }

    const [vibration, setVibration] = useLocalStorage('settings.vibration', false)

    const settings = {
        vibration: {value: vibration, set: setVibration}
    }
    
    return (
        <ParticipantContext.Provider value={{
            participants,
            setParticipants,
            addNewParticipant,
            resetParticipants,
            groups,
            setGroups,
            useGroup,
            settings
        }}>{ children }</ParticipantContext.Provider>
    )
}