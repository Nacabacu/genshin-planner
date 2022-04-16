import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';
import Planning from './Planning';
import Result from './Result';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-300 pt-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
        <Routes>
          <Route path="/" element={<Planning />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
