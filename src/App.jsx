import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayerCardPage from './pages/LayerCardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayerCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
