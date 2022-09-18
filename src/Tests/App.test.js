import { render, screen } from '@testing-library/react'
import App from '../App'


test('renders elements', () => {
    render(<App />)
    const headerElement = screen.getByText(/Split The Cost/i)
    expect(headerElement).toBeInTheDocument()
    const settingsButton = screen.getByText(/Settings/i)
    expect(settingsButton).toBeInTheDocument()
    const addPersonButton = screen.getByText(/Add Person/i)
    expect(addPersonButton).toBeInTheDocument()
    const groupsElements = screen.getAllByText(/Groups/i)
    let foundGroupButton = false
    for (const e of groupsElements) {
        if (e.classList.contains('groupButton')) {foundGroupButton = true; break}
    }
    expect(foundGroupButton).toEqual(true)
    const saveGroupButton = screen.getByText(/Save Group/i)
    expect(saveGroupButton).toBeInTheDocument()
    const resetButton = screen.getByText(/Reset/i)
    expect(resetButton).toBeInTheDocument()
    const splitButton = screen.getByText(/SPLIT IT/i)
    expect(splitButton).toBeInTheDocument()
})