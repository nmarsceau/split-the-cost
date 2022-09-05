import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParticipantProvider, ParticipantList } from 'Participants';
import { SettlementList } from 'Settlements';
import { Settings } from 'Settings';

import './App.css';

function App() {
    return (
        <ParticipantProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/split/" element={<SettlementList />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<ParticipantList />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ParticipantProvider>
    );
}

export default App;
