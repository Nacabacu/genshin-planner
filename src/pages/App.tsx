import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Planning from './Planning';
import Result from './Result';

function App() {
  return (
    <div className="flex h-screen flex-col text-gray-300">
      <Navbar className="flex-initial bg-gray-900 px-2 sm:px-8 md:px-16 lg:px-32 xl:px-48" />
      <div className="flex-grow bg-gray-800 pt-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
        <Routes>
          <Route path={`${import.meta.env.VITE_BASE}/`} element={<Planning />} />
          <Route path={`${import.meta.env.VITE_BASE}/result`} element={<Result />} />
        </Routes>
      </div>
      <Footer className="flex-initial bg-gray-900 px-2 sm:px-8 md:px-16 lg:px-32 xl:px-48" />
    </div>
  );
}

export default App;
