import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from 'AppContext';
import { Participants } from 'Participants';
import { Settlements } from 'Settlements';
import { Settings } from 'Settings';

import './App.css';

function App() {
    return (
        <AppProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/split/" element={<Settlements />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Participants />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AppProvider>
    );
}

export default App;
