import { createContext, useState } from 'react'
import { randomString, useLocalStorage } from 'Utilities'

export const AppContext = createContext();

export function AppProvider({ children }) {
    const createNewParticipant = (name = '', existingIds) => {
        existingIds ??= Object.keys(participants)
        let id = randomString()
        while (existingIds.includes(id)) {id = randomString()}
        return [id, {name: name, amount: 0}]
    }

    const initializeParticipants = () => {
        const [id, participant] = createNewParticipant('', [])
        return {[id]: participant}
    }

    const [participants, setParticipants] = useState(initializeParticipants())
    const [groups, setGroups] = useLocalStorage('groups', {})
    const [vibration, setVibration] = useLocalStorage('settings.vibration', false)


    const data = {
        participants,
        setParticipants,
        addNewParticipant: (name = '') => {
            const [id, participant] = createNewParticipant(name)
            setParticipants(participants => ({...participants, [id]: participant}))
        },
        resetParticipants: () => {
            setParticipants(initializeParticipants())
        },
        groups,
        setGroups,
        useGroup: groupName => {
            const newParticipants = {}
            for (const name of groups[groupName]) {
                const [id, participant] = createNewParticipant(name, Object.keys(newParticipants))
                newParticipants[id] = participant
            }
            setParticipants(newParticipants)
        },
        settings: {
            vibration: {value: vibration, set: setVibration}
        }
    }
    
    return (
        <AppContext.Provider value={data}>{ children }</AppContext.Provider>
    )
}