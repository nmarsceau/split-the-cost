import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from 'AppContext';
import { ParticipantList } from 'Participants';
import { SettlementList } from 'Settlements';
import { Settings } from 'Settings';

import './App.css';

function App() {
    return (
        <AppProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/split/" element={<SettlementList />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<ParticipantList />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AppProvider>
    );
}

export default App;
