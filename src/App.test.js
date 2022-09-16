import { render, screen } from '@testing-library/react'
import App from './App'

test('renders header', () => {
  render(<App />)
  const headerElement = screen.getByText(/Split The Cost/i)
  expect(headerElement).toBeInTheDocument()
});

test('renders buttons', () => {
    render(<App />)
    const settingsButton = screen.getByText(/Settings/i)
    expect(settingsButton).toBeInTheDocument()

    const addPersonButton = screen.getByText(/Add Person/i)
    expect(addPersonButton).toBeInTheDocument()

    const groupsButton = screen.getByText(/Choose a Group/i)
    expect(groupsButton).toBeInTheDocument()

    const saveGroupButton = screen.getByText(/Save Group/i)
    expect(saveGroupButton).toBeInTheDocument()

    const resetButton = screen.getByText(/Reset Participants/i)
    expect(resetButton).toBeInTheDocument()

    const splitButton = screen.getByText(/SPLIT IT/i)
    expect(splitButton).toBeInTheDocument()
})