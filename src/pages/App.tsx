import { Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Planning from './Planning';
import Result from './Result';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-300">
        <Routes>
          <Route path="/" element={<Planning />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
