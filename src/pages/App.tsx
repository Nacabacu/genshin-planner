import { Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Planning from './Planning';
import Result from './Result';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Planning />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
